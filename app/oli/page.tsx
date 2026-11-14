import type { Metadata } from "next";
import Oli from "@/components/Oli";

export const metadata: Metadata = {
  title: "Ganti Oli Motor Berkualitas - MotoFix Pro",
  description:
    "Pilihan oli motor matic, bebek, dan sport 100% original di MotoFix Pro. Dapatkan gratis jasa ganti oli dan cek kondisi mesin.",
};

export default function OliPage() {
  return <Oli />;
}
