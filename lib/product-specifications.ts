export type ProductSpecificationRow = {
  label: string;
  value: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function splitSpecificationLine(line: string, index: number): ProductSpecificationRow | null {
  const trimmed = line.trim();
  if (!trimmed) return null;

  const separators = ["|", ":", "="];
  for (const separator of separators) {
    const position = trimmed.indexOf(separator);
    if (position > 0) {
      const label = trimmed.slice(0, position).trim();
      const value = trimmed.slice(position + separator.length).trim();
      if (label && value) {
        return { label, value };
      }
    }
  }

  return { label: `Үзүүлэлт ${index + 1}`, value: trimmed };
}

export function parseProductSpecificationsInput(value: unknown): ProductSpecificationRow[] | Record<string, unknown> | null {
  if (value === undefined || value === null) return null;

  if (Array.isArray(value)) {
    return value
      .map((item, index) => {
        if (isRecord(item)) {
          const label = String(item.label ?? item.name ?? item.key ?? item.title ?? "").trim();
          const rowValue = String(item.value ?? item.body ?? item.description ?? "").trim();
          return label && rowValue ? { label, value: rowValue } : null;
        }

        if (typeof item === "string") {
          return splitSpecificationLine(item, index);
        }

        return null;
      })
      .filter((item): item is ProductSpecificationRow => Boolean(item));
  }

  if (isRecord(value)) {
    return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined && item !== null));
  }

  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      return parseProductSpecificationsInput(JSON.parse(trimmed));
    } catch {
      return null;
    }
  }

  const rows = trimmed
    .split(/\r?\n/)
    .map((line, index) => splitSpecificationLine(line, index))
    .filter((item): item is ProductSpecificationRow => Boolean(item));

  return rows.length > 0 ? rows : null;
}

export function productSpecificationRows(value: unknown): ProductSpecificationRow[] {
  const parsed = parseProductSpecificationsInput(value);
  if (!parsed) return [];

  if (Array.isArray(parsed)) {
    return parsed;
  }

  return Object.entries(parsed)
    .map(([label, rowValue]) => ({ label, value: String(rowValue ?? "").trim() }))
    .filter((item) => item.label && item.value);
}

export function productSpecificationsForEditor(value: unknown): string {
  const rows = productSpecificationRows(value);

  if (rows.length > 0) {
    return rows.map((row) => `${row.label} | ${row.value}`).join("\n");
  }

  if (typeof value === "string") {
    return value;
  }

  if (value) {
    return JSON.stringify(value, null, 2);
  }

  return "";
}
