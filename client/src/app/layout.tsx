import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digital Ekub Pro",
  description: "Institutional Infrastructure for Community Capital Assets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* 1. Added className="dark" to the html tag */
    <html lang="en" className="dark">
      {/* 2. Added bg-slate-950 text-slate-100 to the body class list */}
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}