import { cn } from "@/lib/utils";

export function RichText({ html, className }: { html?: string | null; className?: string }) {
  if (!html) return null;

  return (
    <div
        className={cn(
        "prose prose-slate max-w-none whitespace-normal leading-8 [&_a]:text-medical [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-6 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:p-2 [&_th]:border [&_th]:p-2 [&_ul]:list-disc [&_ul]:pl-6",
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
