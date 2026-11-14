import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthShell from "@/components/AuthShell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "MotoFix Pro - Bengkel Motor Modern",
  description:
    "Bengkel motor terpercaya dengan teknisi profesional, peralatan modern, dan layanan lengkap untuk semua jenis motor.",
  keywords:
    "bengkel motor, servis motor, perbaikan motor, MotoFix Pro, bengkel modern",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="font-sans antialiased">
        <AuthShell>{children}</AuthShell>
      </body>
    </html>
  );
}
