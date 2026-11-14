import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Star,
  Wrench,
  Bike,
  Sparkles,
  Phone,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { getSparepartBySlug, sparepartsData } from "@/data/spareparts";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return sparepartsData.map((item) => ({
    slug: item.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const item = getSparepartBySlug(params.slug);
  if (!item) {
    return {
      title: "Sparepart Tidak Ditemukan - MotoFix Pro",
    };
  }

  return {
    title: `${item.name} - Harga & Spesifikasi | MotoFix Pro`,
    description: item.description,
  };
}

export default function SparepartDetailPage({ params }: PageProps) {
  const item = getSparepartBySlug(params.slug);

  if (!item) {
    notFound();
  }

  const relatedItems = sparepartsData
    .filter((s) => s.slug !== item.slug)
    .slice(0, 3);

  const whatsappMessage = encodeURIComponent(
    `Halo MotoFix Pro, saya tertarik dengan sparepart *${item.name}* (${item.price}). Apakah stoknya tersedia dan bisa booking jadwal pasang?`
  );

  return (
    <div className="pt-28 pb-20 lg:pt-36 lg:pb-28 bg-slate-50 min-h-screen">
      <div className="container-custom">
        {/* Navigation & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            href="/sparepart"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 transition-all hover:-translate-x-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Katalog Sparepart
          </Link>

          <nav className="text-sm text-slate-500 flex items-center gap-2">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <Link href="/sparepart" className="hover:text-blue-600 transition-colors">
              Sparepart
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium truncate max-w-[200px] sm:max-w-none">
              {item.name}
            </span>
          </nav>
        </div>

        {/* Main Product Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden p-6 md:p-10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left: Product Image */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full aspect-square max-w-md rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-200/80 p-8 flex items-center justify-center overflow-hidden group">
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-600/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    {item.category}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20">
                    ✓ Stok Tersedia
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-bold border border-slate-200">
                    {item.brand}
                  </span>
                </div>

                <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 450px"
                  />
                </div>
              </div>

              {/* Service inclusions badge */}
              <div className="w-full max-w-md mt-6 grid grid-cols-3 gap-2 text-center">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <Wrench className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                  <p className="text-xs font-semibold text-slate-800">Bisa Pasang</p>
                  <p className="text-[10px] text-slate-500">Mekanik Ahli</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <Sparkles className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                  <p className="text-xs font-semibold text-slate-800">Presisi OEM</p>
                  <p className="text-[10px] text-slate-500">Plug & Play</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <ShieldCheck className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                  <p className="text-xs font-semibold text-slate-800">100% Original</p>
                  <p className="text-[10px] text-slate-500">{item.warranty}</p>
                </div>
              </div>
            </div>

            {/* Right: Product Info & Actions */}
            <div className="lg:col-span-7 flex flex-col">
              {/* Category & Rating */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
                  {item.brand}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  Kategori {item.category}
                </span>
                <div className="flex items-center gap-1 text-amber-500 text-sm font-semibold ml-auto">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{item.rating}</span>
                  <span className="text-slate-400 font-normal">
                    ({item.reviewsCount} ulasan)
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
                {item.name}
              </h1>

              {/* Price Block */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 mb-6 flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                    Harga Produk di Bengkel
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-blue-600">
                    {item.price}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    {item.warranty}
                  </span>
                  <p className="text-xs text-slate-500 mt-1">Ready stock di MotoFix Pro</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed mb-6 text-base">
                {item.fullDescription}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 mb-8">
                <Link
                  href={`/#kontak?service=sparepart&item=${encodeURIComponent(item.name)}`}
                  className="btn-primary justify-center !py-3.5 !text-base shadow-lg shadow-blue-600/30 flex-1"
                >
                  <Phone className="w-5 h-5" />
                  Booking Pasang Sparepart
                </Link>

                <a
                  href={`https://wa.me/6281234567890?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 shadow-lg shadow-emerald-600/20"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat WhatsApp
                </a>
              </div>

              {/* Specifications Table */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-blue-600" />
                  Spesifikasi Teknis
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(item.specification).map(([key, val]) => (
                    <div
                      key={key}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70"
                    >
                      <span className="text-xs text-slate-500 block">{key}</span>
                      <span className="font-bold text-slate-800 text-sm">{val}</span>
                    </div>
                  ))}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <span className="text-xs text-slate-500 block">Garansi Produk</span>
                    <span className="font-bold text-slate-800 text-sm">{item.warranty}</span>
                  </div>
                </div>
              </div>

              {/* Features and Benefits */}
              <div className="border-t border-slate-200 pt-6 mt-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Keunggulan &amp; Manfaat Produk
                </h3>
                <ul className="space-y-2.5">
                  {item.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Compatibility */}
              <div className="border-t border-slate-200 pt-6 mt-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Bike className="w-5 h-5 text-blue-600" />
                  Kesesuaian Tipe Motor
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.compatibility.map((bike, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200"
                    >
                      {bike}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Spareparts Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                Katalog Lainnya
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                Pilihan Sparepart Lainnya
              </h2>
            </div>
            <Link
              href="/sparepart"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Lihat Semua Sparepart
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedItems.map((rel) => (
              <div
                key={rel.slug}
                className="card group overflow-hidden flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 border border-slate-200/80 bg-white"
              >
                <div>
                  <div className="relative h-56 w-full bg-slate-50 flex items-center justify-center p-6 border-b border-slate-100">
                    <span className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-bold">
                      {rel.category}
                    </span>
                    <div className="relative w-full h-full">
                      <Image
                        src={rel.image}
                        alt={rel.name}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-blue-600 uppercase">
                        {rel.brand}
                      </span>
                      <span className="text-xs font-semibold text-emerald-600">
                        Ready
                      </span>
                    </div>

                    <h3 className="mb-2 text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {rel.name}
                    </h3>

                    <p className="mb-4 text-xs text-slate-600 line-clamp-2">
                      {rel.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                  <span className="text-base font-extrabold text-blue-600">
                    {rel.price}
                  </span>
                  <Link
                    href={`/sparepart/${rel.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    Lihat Detail
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
