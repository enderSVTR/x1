"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Clock,
  Wrench,
  Bike,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Phone,
  MessageCircle,
  ArrowRight,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { getCurrentUser, hasValidSession } from "@/lib/auth";
import { getBookings, BookingData } from "@/lib/bookings";

export default function PesananPage() {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [selectedFilter, setSelectedFilter] = useState("Semua");

  function refresh() {
    const user = getCurrentUser();
    setCurrentUser(user);
    const allBookings = getBookings();

    // Filter bookings belonging to current user or recent bookings
    if (user?.username) {
      const userBookings = allBookings.filter(
        (b) =>
          b.username?.toLowerCase() === user.username.toLowerCase() ||
          b.name.toLowerCase() === user.username.toLowerCase()
      );
      // If user has specific bookings, show them; otherwise show all for demo
      setBookings(userBookings.length > 0 ? userBookings : allBookings);
    } else {
      setBookings(allBookings);
    }
  }

  useEffect(() => {
    refresh();

    function handleUpdate() {
      refresh();
    }

    window.addEventListener("motofix_notification_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("motofix_notification_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const filtered = bookings.filter((b) => {
    if (selectedFilter === "Semua") return true;
    return b.status === selectedFilter;
  });

  function getStepIndex(status: BookingData["status"]): number {
    switch (status) {
      case "Menunggu":
        return 1;
      case "Dikonfirmasi":
      case "Diproses":
        return 2;
      case "Selesai":
        return 3;
      case "Dibatalkan":
        return -1;
      default:
        return 1;
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Status Booking &amp; Servis
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">
              Riwayat Pesanan &amp; Notifikasi
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Lihat status pengerjaan ganti ban atau servis motor Anda secara langsung. Setiap perubahan oleh admin akan otomatis diperbarui di sini.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refresh}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-sm hover:bg-slate-50 transition-all"
            >
              <RefreshCw className="w-4 h-4 text-blue-600" />
              Segarkan Status
            </button>
            <Link
              href="/#kontak"
              className="btn-primary !py-2.5 !text-xs shadow-md shadow-blue-600/20"
            >
              + Buat Booking Baru
            </Link>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {["Semua", "Menunggu", "Diproses", "Dikonfirmasi", "Selesai", "Dibatalkan"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setSelectedFilter(status)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedFilter === status
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>

        {/* Bookings List */}
        {filtered.length === 0 ? (
          <div className="card p-12 text-center bg-white border border-slate-200 shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <CalendarCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Belum Ada Pesanan Booking
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Anda belum memiliki jadwal booking dengan status "{selectedFilter}". Silakan buat pesanan servis atau ganti ban sekarang.
            </p>
            <Link href="/#kontak" className="btn-primary justify-center">
              Pesan Servis Motor Sekarang
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filtered.map((item) => {
              const step = getStepIndex(item.status);
              const isCancelled = item.status === "Dibatalkan";

              return (
                <div
                  key={item.id}
                  className="card p-6 md:p-8 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Top Bar: ID, Status, Timestamp */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold px-3 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
                        {item.id}
                      </span>
                      <span className="text-xs text-slate-400">
                        Dibuat: {item.createdAt}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                          item.status === "Selesai"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : item.status === "Diproses"
                            ? "bg-blue-100 text-blue-800 border-blue-300"
                            : item.status === "Dikonfirmasi"
                            ? "bg-indigo-100 text-indigo-800 border-indigo-300"
                            : item.status === "Dibatalkan"
                            ? "bg-red-100 text-red-800 border-red-300"
                            : "bg-amber-100 text-amber-800 border-amber-300"
                        }`}
                      >
                        {item.status === "Selesai" && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {item.status === "Diproses" && <Wrench className="w-3.5 h-3.5" />}
                        {item.status === "Dikonfirmasi" && <CalendarCheck className="w-3.5 h-3.5" />}
                        {item.status === "Dibatalkan" && <XCircle className="w-3.5 h-3.5" />}
                        {item.status === "Menunggu" && <Clock className="w-3.5 h-3.5" />}
                        {item.status}
                      </span>
                    </div>
                  </div>

                  {/* Visual Progress Steps (if not cancelled) */}
                  {!isCancelled ? (
                    <div className="py-6 border-b border-slate-100">
                      <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute top-4 left-6 right-6 h-1 bg-slate-200 -z-0">
                          <div
                            className="h-full bg-blue-600 transition-all duration-500"
                            style={{
                              width:
                                step === 1 ? "0%" : step === 2 ? "50%" : "100%",
                            }}
                          />
                        </div>

                        {/* Step Dots */}
                        <div className="relative z-10 flex justify-between">
                          {/* Step 1 */}
                          <div className="flex flex-col items-center text-center max-w-[100px]">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-colors ${
                                step >= 1
                                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                                  : "bg-slate-200 text-slate-500"
                              }`}
                            >
                              1
                            </div>
                            <span className="text-xs font-bold text-slate-800">
                              Menunggu
                            </span>
                            <span className="text-[10px] text-slate-500">
                              Review Admin
                            </span>
                          </div>

                          {/* Step 2 */}
                          <div className="flex flex-col items-center text-center max-w-[120px]">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-colors ${
                                step >= 2
                                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                                  : "bg-slate-200 text-slate-500"
                              }`}
                            >
                              2
                            </div>
                            <span className="text-xs font-bold text-slate-800">
                              Diproses
                            </span>
                            <span className="text-[10px] text-slate-500">
                              Jadwal / Pengerjaan
                            </span>
                          </div>

                          {/* Step 3 */}
                          <div className="flex flex-col items-center text-center max-w-[100px]">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-colors ${
                                step >= 3
                                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                                  : "bg-slate-200 text-slate-500"
                              }`}
                            >
                              3
                            </div>
                            <span className="text-xs font-bold text-slate-800">
                              Selesai
                            </span>
                            <span className="text-[10px] text-slate-500">
                              Siap Diambil
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="my-5 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-red-900">
                          Booking Dibatalkan Oleh Admin
                        </h4>
                        <p className="text-xs text-red-700 mt-0.5">
                          Pesanan booking ini telah dibatalkan. Jika ada kesalahan atau ingin menjadwalkan ulang, silakan hubungi kami via WhatsApp.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Booking Details Grid */}
                  <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <p className="text-[11px] text-slate-500 font-semibold mb-1">
                        Kendaraan Motor
                      </p>
                      <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <Bike className="w-4 h-4 text-blue-600 shrink-0" />
                        {item.motorcycle}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <p className="text-[11px] text-slate-500 font-semibold mb-1">
                        Layanan / Pesanan Ban
                      </p>
                      <p className="text-sm font-bold text-blue-700 flex items-center gap-1.5">
                        <Wrench className="w-4 h-4 text-blue-600 shrink-0" />
                        {item.service}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <p className="text-[11px] text-slate-500 font-semibold mb-1">
                        Jadwal Kedatangan
                      </p>
                      <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                        {item.date} • {item.time} WIB
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <p className="text-[11px] text-slate-500 font-semibold mb-1">
                        Nama Pemesan &amp; HP
                      </p>
                      <p className="text-sm font-bold text-slate-900">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.phone}</p>
                    </div>
                  </div>

                  {item.notes && (
                    <div className="mt-4 p-3 rounded-xl bg-slate-50/70 border border-slate-100 text-xs text-slate-600">
                      <strong>Catatan Anda:</strong> "{item.notes}"
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs text-slate-500">
                      {item.status === "Selesai"
                        ? "🎉 Motor Anda sudah selesai dikerjakan!"
                        : item.status === "Diproses"
                        ? "⏳ Sedang dalam penanganan teknisi MotoFix Pro."
                        : item.status === "Dikonfirmasi"
                        ? "✅ Jadwal telah disetujui, silakan hadir tepat waktu."
                        : item.status === "Dibatalkan"
                        ? "❌ Booking dibatalkan."
                        : "🕒 Menunggu konfirmasi dari admin bengkel."}
                    </span>

                    <a
                      href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                        `Halo MotoFix Pro, saya ingin menanyakan booking #${item.id} (${item.motorcycle} - ${item.service}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Tanya Bengkel via WhatsApp
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
