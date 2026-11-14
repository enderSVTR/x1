import type { Metadata } from "next";
import Sparepart from "@/components/Sparepart";

export const metadata: Metadata = {
  title: "Sparepart Motor - MotoFix Pro",
  description: "Katalog sparepart motor lengkap dan original di MotoFix Pro.",
};

export default function SparepartPage() {
  return <Sparepart />;
}
