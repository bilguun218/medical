import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  applicationName: "NOVYTAS",
  generator: "Next.js"
};

const themeScript = `
(() => {
  try {
    const stored = localStorage.getItem("novitas-theme") || localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored ? stored === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  } catch {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen font-sans antialiased`}>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
