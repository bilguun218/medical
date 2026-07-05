import Link from "next/link";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin/content/home", label: "Нүүр" },
  { href: "/admin/content/about", label: "Бидний тухай" },
  { href: "/admin/content/contact", label: "Холбоо барих" },
  { href: "/admin/content/header", label: "Толгой хэсэг" },
  { href: "/admin/content/footer", label: "Хөл хэсэг" },
  { href: "/admin/content/seo", label: "SEO" }
];

export function ContentNav({ activePath }: { activePath: string }) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "rounded-lg border bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100",
            activePath === item.href && "border-slate-950 bg-slate-950 text-white hover:bg-slate-950"
          )}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
