"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Disc,
  Circle,
  MapPin,
  ShieldCheck,
  ArrowLeft,
  Star,
  Bike,
  CheckCircle2,
} from "lucide-react";

const categories = [
  {
    id: "matic",
    name: "Motor Matic",
    icon: Bike,
    description:
      "Ban untuk matic 110cc - 125cc seperti Honda BeAT, Vario, Scoopy, Yamaha Mio, Lexi, dll.",
    sizes: [
      { size: "Depan 80/90-14", price: "Rp 185K" },
      { size: "Belakang 90/90-14", price: "Rp 210K" },
      { size: "Front 80/90-14", price: "Rp 185K" },
      { size: "Rear 90/90-14", price: "Rp 210K" },
    ],
  },
  {
    id: "bebek",
    name: "Motor Bebek",
    icon: Bike,
    description:
      "Ban untuk motor bebek 100cc - 125cc seperti Honda Supra, Revo, Yamaha Jupiter, Vega, dll.",
    sizes: [
      { size: "Depan 70/90-17", price: "Rp 150K" },
      { size: "Belakang 80/90-17", price: "Rp 175K" },
      { size: "Front 70/90-17", price: "Rp 150K" },
      { size: "Rear 80/90-17", price: "Rp 175K" },
    ],
  },
  {
    id: "sport",
    name: "Motor Sport",
    icon: Bike,
    description:
      "Ban untuk motor sport 150cc - 250cc seperti Honda CBR, Yamaha R15, Vixion, Kawasaki Ninja, dll.",
    sizes: [
      { size: "Depan 90/80-17", price: "Rp 320K" },
      { size: "Belakang 120/70-17", price: "Rp 375K" },
      { size: "Front 90/80-17", price: "Rp 320K" },
      { size: "Rear 120/70-17", price: "Rp 375K" },
    ],
  },
  {
    id: "bigmatic",
    name: "Motor Sport Big Matic",
    icon: Bike,
    description:
      "Ban untuk big matic 150cc - 300cc seperti Honda PCX, ADV, Yamaha NMAX, Aerox, Lexi, dll.",
    sizes: [
      { size: "Depan 110/70-14", price: "Rp 285K" },
      { size: "Belakang 130/70-13", price: "Rp 330K" },
      { size: "Front 110/70-14", price: "Rp 285K" },
      { size: "Rear 130/70-13", price: "Rp 330K" },
    ],
  },
];

const tireBrands = [
  "Michelin",
  "Bridgestone",
  "Pirelli",
  "Dunlop",
  "IRC",
  "FDR",
  "Swallow",
  "Corsa",
  "Mizzle",
  "Gajah Tunggal",
];

const services = [
  {
    icon: Disc,
    name: "Ban Tubeless",
    description:
      "Ban tubeless berbagai ukuran untuk motor bebek, matic, dan sport.",
    price: "Mulai Rp 250K",
  },
  {
    icon: Circle,
    name: "Ban Dalam",
    description:
      "Ban dalam berkualitas untuk motor yang menggunakan ban ber-velg jari-jari.",
    price: "Mulai Rp 45K",
  },
  {
    icon: MapPin,
    name: "Pasang & Balancing",
    description:
      "Layanan pemasangan ban dan balancing roda untuk keamanan berkendara.",
    price: "Mulai Rp 25K",
  },
  {
    icon: ShieldCheck,
    name: "Tambal Ban & Vulkanisir",
    description:
      "Tambal ban tubeless dan vulkanisir ban dalam secara profesional.",
    price: "Mulai Rp 15K",
  },
];

export default function BanPage() {
  const [active, setActive] = useState(categories[0].id);
  const selected = categories.find((c) => c.id === active)!;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-100 -z-10" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl -z-10" />

        <div className="container-custom">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Beranda
          </Link>

          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              Katalog Ban Semua Merek Motor
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Pilih Tipe Motor, Lihat{" "}
              <span className="text-blue-600">Harga Ban</span>
            </h1>
            <p className="section-subtitle">
              Pilih tipe motor Anda untuk melihat daftar ukuran ban dan
              harganya. Tersedia untuk semua merek motor di Indonesia.
            </p>
          </div>
        </div>
      </section>

      {/* Kategori Interaktif */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
              Pilih Tipe Motor
            </span>
            <h2 className="section-title">Kategori Motor</h2>
            <p className="section-subtitle">
              Klik salah satu tipe motor untuk melihat harga ban.
            </p>
          </div>

          {/* Category Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`card p-6 text-center transition-all duration-300 hover:-translate-y-1 ${
                  active === cat.id
                    ? "ring-2 ring-blue-600 bg-blue-600 text-white"
                    : "hover:bg-blue-50"
                }`}
              >
                <div
                  className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300 ${
                    active === cat.id ? "bg-white/20" : "bg-blue-100"
                  }`}
                >
                  <cat.icon
                    className={`w-7 h-7 ${
                      active === cat.id ? "text-white" : "text-blue-600"
                    }`}
                  />
                </div>
                <h3
                  className={`font-bold ${
                    active === cat.id ? "text-white" : "text-slate-900"
                  }`}
                >
                  {cat.name}
                </h3>
              </button>
            ))}
          </div>

          {/* Selected Category Detail */}
          <div className="card p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0">
                <selected.icon className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {selected.name}
                </h3>
                <p className="text-slate-600">{selected.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selected.sizes.map((item) => (
                <div
                  key={item.size}
                  className="flex items-center justify-between p-5 rounded-xl bg-slate-50 border-2 border-slate-100 hover:border-blue-600 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <span className="font-semibold text-slate-800">
                      {item.size}
                    </span>
                  </div>
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-bold">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Merek Ban */}
      <section className="py-16 lg:py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
              Merek Ban
            </span>
            <h2 className="section-title">Merek Ban Terkenal</h2>
            <p className="section-subtitle">
              Kami menyediakan berbagai merek ban terkenal dan berkualitas.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {tireBrands.map((brand) => (
              <span
                key={brand}
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-white border-2 border-slate-200 text-slate-700 font-semibold text-sm hover:border-blue-600 hover:text-blue-600 transition-colors cursor-pointer"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Layanan Ban */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
              Layanan Ban
            </span>
            <h2 className="section-title">Layanan Ban & Pemasangan</h2>
            <p className="section-subtitle">
              Ganti ban motor dengan berbagai merek terkenal, ditambah layanan
              pasang, balancing, dan tambal ban untuk semua merek motor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((tire) => (
              <div
                key={tire.name}
                className="card p-8 text-center hover:-translate-y-2 group"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <tire.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {tire.name}
                </h3>
                <p className="text-slate-600 mb-4 text-sm">
                  {tire.description}
                </p>
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold">
                  {tire.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="container-custom">
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 p-10 lg:p-16 text-center shadow-2xl shadow-blue-600/30">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Butuh Ban untuk Motor Anda?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Hubungi kami untuk konsultasi dan pemesanan ban yang sesuai dengan
              merek dan ukuran motor Anda. Gratis ongkir untuk area tertentu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#kontak"
                className="btn-primary !bg-white !text-blue-700 hover:!bg-blue-50"
              >
                Booking Sekarang
              </Link>
              <Link
                href="/"
                className="btn-secondary !bg-transparent !text-white !border-white hover:!bg-white/10"
              >
                Lihat Layanan Lain
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
