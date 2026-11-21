"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bike, CalendarCheck, CheckCircle2, Clock, Phone, RefreshCw, Search,
  ShieldCheck, Trash2, TrendingUp, Wrench, XCircle,
} from "lucide-react";
import { getCurrentUser, type UserProfile } from "@/lib/auth";
import {
  deleteBooking, loadBookings, updateBookingStatus,
  type BookingData, type BookingStatus,
} from "@/lib/bookings";

const statuses: Array<BookingStatus | "Semua"> = ["Semua", "Menunggu", "Diproses", "Dikonfirmasi", "Selesai", "Dibatalkan"];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<UserProfile | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | "Semua">("Semua");
  const [busyBooking, setBusyBooking] = useState<string | null>(null);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      setBookings(await loadBookings());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Booking gagal dimuat dari Supabase.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    async function authorize() {
      try {
        const profile = await getCurrentUser();
        if (!active) return;
        if (!profile) {
          router.replace("/login?next=/admin/dashboard");
          return;
        }
        if (profile.role !== "admin") {
          setAdmin(profile);
          setIsChecking(false);
          return;
        }
        setAdmin(profile);
        await refresh();
      } catch (cause) {
        if (active) setError(cause instanceof Error ? cause.message : "Gagal memeriksa hak akses.");
      } finally {
        if (active) setIsChecking(false);
      }
    }
    void authorize();
    const handleUpdate = () => { void refresh(); };
    window.addEventListener("motofix_notification_updated", handleUpdate);
    return () => {
      active = false;
      window.removeEventListener("motofix_notification_updated", handleUpdate);
    };
  }, [refresh, router]);

  async function handleStatusChange(id: string, status: BookingStatus) {
    setBusyBooking(id);
    setError("");
    try {
      await updateBookingStatus(id, status);
      await refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Status booking gagal diperbarui.");
    } finally {
      setBusyBooking(null);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm(`Yakin ingin menghapus booking #${id}?`)) return;
    setBusyBooking(id);
    setError("");
    try {
      await deleteBooking(id);
      await refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Booking gagal dihapus.");
    } finally {
      setBusyBooking(null);
    }
  }

  const filteredBookings = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return bookings.filter((booking) => {
      const matchesStatus = selectedStatus === "Semua" || booking.status === selectedStatus;
      const matchesQuery = !query || [booking.name, booking.phone, booking.motorcycle, booking.service, booking.id]
        .some((value) => value.toLowerCase().includes(query));
      return matchesStatus && matchesQuery;
    });
  }, [bookings, searchQuery, selectedStatus]);

  const pending = bookings.filter((booking) => booking.status === "Menunggu").length;
  const inProgress = bookings.filter((booking) => booking.status === "Diproses" || booking.status === "Dikonfirmasi").length;
  const completed = bookings.filter((booking) => booking.status === "Selesai").length;

  if (isChecking) return <div className="flex min-h-screen items-center justify-center bg-slate-50"><p className="text-sm font-semibold text-slate-500">Memeriksa akses dan memuat dashboard...</p></div>;

  if (admin?.role !== "admin") {
    return <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4"><div className="card max-w-md p-8 text-center"><XCircle className="mx-auto mb-4 h-12 w-12 text-red-500" /><h1 className="text-xl font-bold text-slate-900">Akses Ditolak</h1><p className="my-3 text-sm text-slate-600">Dashboard ini hanya tersedia untuk administrator MotoFix Pro.</p><Link href="/login" className="btn-primary justify-center">Login sebagai Admin</Link></div></div>;
  }

  const stats = [
    { label: "Total Booking", value: bookings.length, icon: CalendarCheck, tone: "blue" },
    { label: "Menunggu", value: pending, icon: Clock, tone: "amber" },
    { label: "Diproses / ACC", value: inProgress, icon: CheckCircle2, tone: "indigo" },
    { label: "Selesai", value: completed, icon: TrendingUp, tone: "emerald" },
  ];

  return (
    <main className="min-h-screen bg-slate-100/70 px-4 pb-16 pt-28 lg:pt-36">
      <div className="container-custom">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div><span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white"><ShieldCheck className="h-4 w-4 text-amber-400" />PORTAL ADMINISTRATOR</span><p className="mt-3 text-xs text-slate-500">Login sebagai <strong>{admin.username}</strong></p><h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">Dashboard Booking</h1><p className="mt-2 text-sm text-slate-600">Kelola permintaan servis dan pantau status seluruh pelanggan.</p></div>
          <button type="button" onClick={() => void refresh()} disabled={isLoading} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-60"><RefreshCw className={`h-4 w-4 text-blue-600 ${isLoading ? "animate-spin" : ""}`} />{isLoading ? "Memuat..." : "Segarkan Data"}</button>
        </div>

        {error && <p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon, tone }) => <div key={label} className="card flex items-center gap-4 border border-slate-200 bg-white p-5"><span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-${tone}-100 text-${tone}-600`}><Icon className="h-6 w-6" /></span><div><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p><p className={`text-2xl font-black text-${tone}-600`}>{value}</p></div></div>)}
        </div>

        <section className="card overflow-hidden border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 bg-slate-50/70 p-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full max-w-md"><Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Cari nama, telepon, motor, atau kode booking..." className="input-field bg-white pl-10 !py-2.5 !text-sm" /></div>
            <div className="flex flex-wrap gap-2">{statuses.map((status) => <button key={status} type="button" onClick={() => setSelectedStatus(status)} className={`rounded-xl px-3 py-2 text-xs font-bold ${selectedStatus === status ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"}`}>{status}</button>)}</div>
          </div>

          {isLoading && bookings.length === 0 ? <p className="p-12 text-center text-sm text-slate-500">Memuat booking dari Supabase...</p> : filteredBookings.length === 0 ? <div className="p-12 text-center"><CalendarCheck className="mx-auto mb-3 h-12 w-12 text-slate-300" /><h2 className="font-bold text-slate-800">Tidak ada booking ditemukan</h2><p className="mt-1 text-sm text-slate-500">Belum ada data yang cocok dengan pencarian atau filter ini.</p>{(searchQuery || selectedStatus !== "Semua") && <button type="button" onClick={() => { setSearchQuery(""); setSelectedStatus("Semua"); }} className="mt-3 text-sm font-semibold text-blue-600">Reset filter</button>}</div> : <div className="divide-y divide-slate-100">{filteredBookings.map((item) => <article key={item.id} className="flex flex-col gap-5 p-5 hover:bg-slate-50/70 lg:flex-row lg:items-center lg:justify-between"><div className="min-w-0 flex-1"><div className="mb-4 flex flex-wrap items-center gap-2"><span className="rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 font-mono text-xs font-bold text-blue-700">{item.id}</span><span className={`rounded-full border px-3 py-1 text-xs font-bold ${item.status === "Selesai" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : item.status === "Dibatalkan" ? "border-red-200 bg-red-50 text-red-700" : item.status === "Menunggu" ? "border-amber-200 bg-amber-50 text-amber-700" : "border-indigo-200 bg-indigo-50 text-indigo-700"}`}>{item.status}</span><span className="text-xs text-slate-400">Dibuat {item.createdAt}</span></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"><div><p className="text-xs font-semibold text-slate-500">Pelanggan</p><p className="mt-1 font-bold text-slate-900">{item.name}</p><p className="mt-1 flex items-center gap-1 text-sm text-slate-600"><Phone className="h-3.5 w-3.5" />{item.phone}</p></div><div><p className="text-xs font-semibold text-slate-500">Motor &amp; jadwal</p><p className="mt-1 flex items-center gap-1.5 font-semibold text-slate-900"><Bike className="h-4 w-4 text-blue-600" />{item.motorcycle}</p><p className="mt-1 flex items-center gap-1 text-sm text-slate-600"><Clock className="h-3.5 w-3.5" />{item.date} • {item.time} WIB</p></div><div><p className="text-xs font-semibold text-slate-500">Layanan</p><p className="mt-1 flex items-start gap-1.5 font-semibold text-blue-700"><Wrench className="mt-0.5 h-4 w-4 shrink-0" />{item.service}</p>{item.notes && <p className="mt-1 text-xs italic text-slate-500">“{item.notes}”</p>}</div></div></div><div className="flex shrink-0 items-center gap-2 border-t border-slate-100 pt-4 lg:border-0 lg:pt-0"><select aria-label={`Ubah status booking ${item.id}`} disabled={busyBooking === item.id} value={item.status} onChange={(event) => void handleStatusChange(item.id, event.target.value as BookingStatus)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700"><option value="Menunggu">Menunggu</option><option value="Diproses">Diproses</option><option value="Dikonfirmasi">Dikonfirmasi</option><option value="Selesai">Selesai</option><option value="Dibatalkan">Dibatalkan</option></select><button type="button" aria-label={`Hapus booking ${item.id}`} disabled={busyBooking === item.id} onClick={() => void handleDelete(item.id)} className="rounded-xl p-2.5 text-slate-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"><Trash2 className="h-4 w-4" /></button></div></article>)}</div>}
        </section>
      </div>
    </main>
  );
}
