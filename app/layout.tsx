import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";


const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "أدرينالين - مجتمع الأطباء",
  description: "موقع أدرينالين لتبسيط العلوم الطبية والأنشطة الطلابية للأطباء.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      // استبدلنا font-sans بـ cairo.className لضمان تطبيق الخط بدون تضارب
      className={`${cairo.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        {children}
      </body>
    </html>
  );

}

