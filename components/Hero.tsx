import Image from "next/image";
import Link from "next/link";
import {
  Bike,
  ShieldCheck,
  Clock,
  ArrowRight,
  Phone,
  Star,
} from "lucide-react";
import logoMotoFix from "../logo MotoFixPro/logo MotoFixPro.png";

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-100 -z-10" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl -z-10" />

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              Rating 4.9/5 dari 2.000+ pelanggan
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Bengkel Motor <span className="text-blue-600">Modern</span> &amp;
              Terpercaya untuk Kendaraan Anda
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-xl">
              Kami menyediakan layanan perawatan dan perbaikan motor terlengkap
              dengan teknisi profesional, peralatan canggih, dan harga
              transparan. Kepuasan Anda adalah prioritas kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/#kontak" className="btn-primary">
                <Phone className="w-5 h-5" />
                Booking Servis
              </Link>
              <Link href="/#layanan" className="btn-secondary">
                Lihat Layanan
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 max-w-lg">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium text-slate-700">
                  Garansi 6 Bulan
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Bike className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium text-slate-700">
                  Semua Merk
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium text-slate-700">
                  24/7 Layanan
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 shadow-2xl shadow-blue-600/30">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-400 rounded-2xl rotate-12 animate-float" />
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white rounded-2xl shadow-lg -rotate-6" />
              <div className="relative">
                <div className="relative flex items-center justify-center w-36 h-36 mx-auto mb-6 rounded-full bg-[#020817] shadow-[0_0_0_6px_rgba(255,255,255,0.12)] border-4 border-white/20 animate-float overflow-hidden">
                  <div className="absolute inset-2 rounded-full bg-[#020817]" />
                  <div className="relative h-full w-full p-3">
                    <Image
                      src={logoMotoFix}
                      alt="MotoFixPro Logo"
                      fill
                      className="object-contain"
                      sizes="144px"
                    />
                  </div>
                </div>
                <h3 className="text-white text-2xl font-bold text-center mb-4">
                  Servis Berkualitas
                </h3>
                <p className="text-blue-100 text-center mb-8">
                  Teknisi bersertifikat dengan pengalaman 10+ tahun
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-white">10+</p>
                    <p className="text-blue-100 text-sm">Tahun Pengalaman</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-white">5.000+</p>
                    <p className="text-blue-100 text-sm">Motor Diperbaiki</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
