"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Wrench, Settings } from "lucide-react";
import { sparepartsData, SparepartItem } from "@/data/spareparts";

const categories = [
  "Semua",
  "Mesin",
  "CVT & Transmisi",
  "Rem & Kaki-kaki",
  "Kelistrikan",
  "Perawatan",
];

export default function Sparepart() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredSpareparts =
    selectedCategory === "Semua"
      ? sparepartsData
      : sparepartsData.filter((item) => item.category === selectedCategory);

  return (
    <section id="sparepart" className="pt-28 pb-20 lg:pt-36 lg:pb-28 bg-slate-50 min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Katalog Sparepart Asli &amp; Berkualitas
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Sparepart Motor &amp; <span className="text-blue-600">Layanan Pemasangan</span>
          </h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            Pilih sparepart original dari berbagai kategori motor. Klik salah satu sparepart untuk melihat detail spesifikasi, kompatibilitas motor, dan booking jadwal pasang.
          </p>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-105"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Spareparts Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSpareparts.map((item: SparepartItem) => (
            <div
              key={item.slug}
              className="card group overflow-hidden flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 bg-white border border-slate-200/80 hover:shadow-xl hover:border-blue-300"
            >
              <div>
                {/* Image Container with Badges */}
                <div className="relative h-64 w-full bg-gradient-to-b from-slate-50 to-slate-100/60 p-6 flex items-center justify-center overflow-hidden border-b border-slate-100">
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold shadow-sm">
                      {item.category}
                    </span>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow-sm">
                      Stok Tersedia
                    </span>
                  </div>

                  <span className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-white text-slate-700 text-xs font-bold border border-slate-200 shadow-sm">
                    {item.brand}
                  </span>

                  <div className="relative w-full h-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
                    <span className="text-blue-600 font-bold uppercase tracking-wider">
                      {item.brand}
                    </span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                      Garansi: {item.warranty}
                    </span>
                  </div>

                  <h2 className="mb-2 text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {item.name}
                  </h2>

                  <p className="mb-4 text-sm text-slate-600 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="line-clamp-1">{item.features[0]}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>100% Produk Original Berkualitas</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Price & Direct Button */}
              <div className="px-6 pb-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] text-slate-500 block">Harga</span>
                  <span className="text-lg font-black text-blue-600">
                    {item.price}
                  </span>
                </div>

                <Link
                  href={`/sparepart/${item.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/20 transition-all duration-200 group-hover:bg-blue-700"
                >
                  Lihat Detail Sparepart
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Badges Footer */}
        <div className="mt-16 rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0 text-blue-600">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Mekanik Bersertifikat</h3>
                <p className="text-xs text-slate-600">
                  Pemasangan sparepart dikerjakan oleh teknisi ahli dengan SOP presisi tinggi.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0 text-blue-600">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Jaminan Presisi Plug &amp; Play</h3>
                <p className="text-xs text-slate-600">
                  Sparepart teruji kesesuaian dudukannya untuk berbagai tipe motor Anda tanpa ubahan paksa.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0 text-blue-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Jaminan Keaslian Barang</h3>
                <p className="text-xs text-slate-600">
                  Semua suku cadang dan cairan kimia motor 100% original bersumber dari distributor resmi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
