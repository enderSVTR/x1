"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight, Bike, CalendarCheck, CheckCircle2, Clock, MessageCircle,
  RefreshCw, Sparkles, Wrench, XCircle,
} from "lucide-react";
import { getCurrentUser, type UserProfile } from "@/lib/auth";
import { loadBookings, type BookingData, type BookingStatus } from "@/lib/bookings";

const filters: Array<BookingStatus | "Semua"> = ["Semua", "Menunggu", "Diproses", "Dikonfirmasi", "Selesai", "Dibatalkan"];

export default function PesananPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<BookingStatus | "Semua">("Semua");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const profile = await getCurrentUser();
      if (!profile) {
        router.replace("/login?next=%2Fpesanan");
        return;
      }
      setCurrentUser(profile);
      // Supabase RLS scopes this query to the signed-in customer. Never fall
      // back to showing every customer's bookings when the current user has none.
      setBookings(await loadBookings());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Riwayat booking gagal dimuat.");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void refresh();
    const handleUpdate = () => { void refresh(); };
    window.addEventListener("motofix_notification_updated", handleUpdate);
    return () => window.removeEventListener("motofix_notification_updated", handleUpdate);
  }, [refresh]);

  const visibleBookings = useMemo(() => bookings.filter((booking) => selectedFilter === "Semua" || booking.status === selectedFilter), [bookings, selectedFilter]);

  function progressStep(status: BookingStatus) {
    if (status === "Dibatalkan") return -1;
    if (status === "Selesai") return 3;
    if (status === "Diproses" || status === "Dikonfirmasi") return 2;
    return 1;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 lg:pt-36">
      <div className="container-custom">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700"><Sparkles className="h-4 w-4" />AREA PELANGGAN</span><h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">Booking &amp; Servis Saya</h1><p className="mt-2 text-sm text-slate-600">{currentUser ? `Halo, ${currentUser.username}. Pantau semua pesanan yang terhubung ke akun Anda.` : "Pantau status booking servis motor Anda."}</p></div><div className="flex flex-wrap gap-2"><button type="button" onClick={() => void refresh()} disabled={isLoading} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm disabled:opacity-60"><RefreshCw className={`h-4 w-4 text-blue-600 ${isLoading ? "animate-spin" : ""}`} />Segarkan</button><Link href="/#kontak" className="btn-primary justify-center !py-2.5 !text-sm">Booking Baru</Link></div></div>

        {error && <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">{filters.map((filter) => <button key={filter} type="button" onClick={() => setSelectedFilter(filter)} className={`shrink-0 rounded-xl px-4 py-2 text-xs font-bold ${selectedFilter === filter ? "bg-blue-600 text-white shadow-md" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"}`}>{filter}</button>)}</div>

        {isLoading && bookings.length === 0 ? <div className="card p-12 text-center text-sm text-slate-500">Memuat booking Anda dari Supabase...</div> : visibleBookings.length === 0 ? <div className="card mx-auto max-w-xl p-10 text-center"><CalendarCheck className="mx-auto mb-4 h-12 w-12 text-blue-300" /><h2 className="text-xl font-bold text-slate-900">{bookings.length ? "Tidak ada booking pada filter ini" : "Belum ada booking"}</h2><p className="mt-2 text-sm text-slate-600">{bookings.length ? "Pilih status lain untuk melihat pesanan Anda." : "Booking yang Anda buat akan muncul di halaman ini setelah berhasil disimpan."}</p><Link href="/#kontak" className="btn-primary mt-5 inline-flex justify-center">Buat Booking <ArrowRight className="h-4 w-4" /></Link></div> : <div className="space-y-5">{visibleBookings.map((booking) => {
          const step = progressStep(booking.status);
          return <article key={booking.id} className="card border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4"><div><p className="font-mono text-xs font-bold text-blue-700">{booking.id}</p><p className="mt-1 text-xs text-slate-500">Dibuat: {booking.createdAt}</p></div><span className={`rounded-full border px-3 py-1 text-xs font-bold ${booking.status === "Selesai" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : booking.status === "Dibatalkan" ? "border-red-200 bg-red-50 text-red-700" : booking.status === "Menunggu" ? "border-amber-200 bg-amber-50 text-amber-700" : "border-indigo-200 bg-indigo-50 text-indigo-700"}`}>{booking.status}</span></div>
            {step > 0 ? <div className="relative my-6"><div className="absolute left-[12%] right-[12%] top-4 h-1 bg-slate-100"><div className="h-full bg-blue-600 transition-all" style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }} /></div><div className="relative flex justify-between">{["Menunggu", "Diproses", "Selesai"].map((label, index) => <div key={label} className="z-10 flex w-24 flex-col items-center text-center"><span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${step >= index + 1 ? index === 2 && step === 3 ? "bg-emerald-600 text-white" : "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"}`}>{step >= index + 1 ? <CheckCircle2 className="h-4 w-4" /> : index + 1}</span><span className="mt-2 text-[11px] font-semibold text-slate-700">{label}</span></div>)}</div></div> : <div className="my-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"><XCircle className="h-5 w-5 shrink-0" />Booking ini dibatalkan. Hubungi bengkel jika ingin menjadwalkan ulang.</div>}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Kendaraan</p><p className="mt-1 flex items-center gap-2 text-sm font-bold text-slate-900"><Bike className="h-4 w-4 text-blue-600" />{booking.motorcycle}</p></div><div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Layanan</p><p className="mt-1 flex items-start gap-2 text-sm font-bold text-slate-900"><Wrench className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />{booking.service}</p></div><div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Jadwal</p><p className="mt-1 flex items-center gap-2 text-sm font-bold text-slate-900"><Clock className="h-4 w-4 text-blue-600" />{booking.date} • {booking.time} WIB</p></div><div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Pemesan</p><p className="mt-1 text-sm font-bold text-slate-900">{booking.name}</p><p className="text-xs text-slate-500">{booking.phone}</p></div></div>
            {booking.notes && <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-600"><strong>Catatan:</strong> {booking.notes}</p>}
            {booking.adminNote && <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"><strong>Catatan admin:</strong> {booking.adminNote}</p>}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4"><p className="text-xs text-slate-500">{booking.status === "Selesai" ? "Servis Anda sudah selesai." : booking.status === "Dibatalkan" ? "Booking dibatalkan." : booking.status === "Menunggu" ? "Menunggu konfirmasi admin." : "Booking sedang ditangani tim MotoFix Pro."}</p><a href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo MotoFix Pro, saya ingin menanyakan booking #${booking.id} (${booking.motorcycle} - ${booking.service}).`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"><MessageCircle className="h-4 w-4" />Hubungi Bengkel</a></div>
          </article>;
        })}</div>}
      </div>
    </main>
  );
}
