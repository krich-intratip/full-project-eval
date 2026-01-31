import type { Metadata } from "next";
import { AppProvider } from "@/context/AppContext";
import { RubricProvider } from "@/context/RubricContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "ระบบประเมินโครงการวิจัย(ขั้นปิดโครงการ) สวพ.ทบ.",
  description: "ระบบประเมินผลการดำเนินโครงการวิจัยขั้นปิดโครงการ โดยผู้ทรงคุณวุฒิ AI 3 ท่าน - Military Research Closeout Evaluation System",
  keywords: ["research evaluation", "closeout evaluation", "military research", "AI evaluation", "ประเมินโครงการวิจัย", "สวพ.ทบ.", "ปิดโครงการ"],
  authors: [{ name: "พล.ท.ดร.กริช อินทราทิพย์" }],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased">
        <RubricProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </RubricProvider>
      </body>
    </html>
  );
}
