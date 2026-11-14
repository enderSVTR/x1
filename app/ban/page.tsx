import type { Metadata } from "next";
import Ban from "@/components/Ban";

export const metadata: Metadata = {
  title: "Ban Motor & Layanan Pasang - MotoFix Pro",
  description:
    "Katalog ban motor lengkap dan original untuk semua merek motor di MotoFix Pro. Tersedia berbagai ukuran dan merek terbaik.",
};

export default function BanPage() {
  return <Ban />;
}
