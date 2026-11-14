"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  CalendarCheck,
  Clock,
  Phone,
  Bike,
  Wrench,
  Search,
  CheckCircle2,
  XCircle,
  Trash2,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { getCurrentUser, hasValidSession, isAdmin } from "@/lib/auth";
import {
  getBookings,
  updateBookingStatus,
  deleteBooking,
  BookingData,
} from "@/lib/bookings";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("Semua");
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    if (!hasValidSession()) {
      router.replace("/login?next=/admin/dashboard");
      return;
    }

    const user = getCurrentUser();
    const adminCheck = isAdmin();

    if (!adminCheck) {
      setIsAuthorized(false);
      return;
    }

    setIsAuthorized(true);
    setAdminName(user?.username || "Admin");
    loadBookings();
  }, [router]);

  function loadBookings() {
    setBookings(getBookings());
  }

  function handleStatusChange(id: string, newStatus: BookingData["status"]) {
    updateBookingStatus(id, newStatus);
    loadBookings();
  }

  function handleDelete(id: string) {
    if (confirm(`Yakin ingin menghapus booking #${id}?`)) {
      deleteBooking(id);
      loadBookings();
    }
  }

  // Filtered bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchStatus =
        selectedStatus === "Semua" ? true : b.status === selectedStatus;
      const query = searchQuery.toLowerCase();
      const matchQuery =
        b.name.toLowerCase().includes(query) ||
        b.phone.includes(query) ||
        b.motorcycle.toLowerCase().includes(query) ||
        b.service.toLowerCase().includes(query) ||
        b.id.toLowerCase().includes(query);
      return matchStatus && matchQuery;
    });
  }, [bookings, selectedStatus, searchQuery]);

  // Stats
  const totalCount = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === "Menunggu").length;
  const inProgressCount = bookings.filter(
    (b) => b.status === "Diproses" || b.status === "Dikonfirmasi"
  ).length;
  const completedCount = bookings.filter((b) => b.status === "Selesai").length;

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-sm font-semibold text-slate-500">Memeriksa hak akses admin...</p>
      </div>
    );
  }

  if (isAuthorized === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 pt-28">
        <div className="card max-w-md p-8 text-center bg-white shadow-xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <XCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Akses Ditolak</h2>
          <p className="text-sm text-slate-600 mb-6">
            Halaman ini khusus untuk administrator MotoFix Pro. Silakan login menggunakan akun khusus admin.
          </p>
          <Link href="/login" className="btn-primary w-full justify-center">
            Login sebagai Admin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/70 pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="container-custom">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                PORTAL ADMINISTRATOR
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Logged in as <strong>{adminName}</strong>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">
              Dashboard Booking &amp; Pelanggan
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Pantau seluruh pesanan ban, servis, dan jadwal kedatangan pelanggan MotoFix Pro secara real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadBookings}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-sm hover:bg-slate-50 transition-all"
            >
              <RefreshCw className="w-4 h-4 text-blue-600" />
              Segarkan Data
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card p-5 bg-white border border-slate-200/90 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0 text-blue-600">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Booking
              </p>
              <p className="text-2xl font-black text-slate-900">{totalCount}</p>
            </div>
          </div>

          <div className="card p-5 bg-white border border-slate-200/90 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0 text-amber-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Menunggu
              </p>
              <p className="text-2xl font-black text-amber-600">{pendingCount}</p>
            </div>
          </div>

          <div className="card p-5 bg-white border border-slate-200/90 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center shrink-0 text-indigo-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Diproses / ACC
              </p>
              <p className="text-2xl font-black text-indigo-600">{inProgressCount}</p>
            </div>
          </div>

          <div className="card p-5 bg-white border border-slate-200/90 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Selesai
              </p>
              <p className="text-2xl font-black text-emerald-600">{completedCount}</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="card bg-white border border-slate-200 shadow-sm overflow-hidden">
          {/* Filters Bar */}
          <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama, no. HP, motor, atau no. booking..."
                className="input-field pl-10 !py-2 !text-xs bg-white"
              />
            </div>

            {/* Status Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {["Semua", "Menunggu", "Diproses", "Dikonfirmasi", "Selesai", "Dibatalkan"].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedStatus === status
                        ? "bg-slate-900 text-white shadow-sm"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {status}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <CalendarCheck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">
                Tidak Ada Booking Ditemukan
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                Belum ada data pesanan booking dengan kriteria pencarian ini.
              </p>
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedStatus("Semua");
                  }}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Reset Pencarian
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredBookings.map((item) => (
                <div
                  key={item.id}
                  className="p-5 md:p-6 hover:bg-slate-50/80 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  {/* Left & Middle: Booking Details */}
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg border border-blue-200">
                        {item.id}
                      </span>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          item.status === "Menunggu"
                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                            : item.status === "Diproses"
                            ? "bg-sky-100 text-sky-800 border border-sky-300"
                            : item.status === "Dikonfirmasi"
                            ? "bg-indigo-100 text-indigo-800 border border-indigo-300"
                            : item.status === "Selesai"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-red-100 text-red-800 border border-red-300"
                        }`}
                      >
                        ● {item.status}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Masuk: {item.createdAt}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
                      <div>
                        <p className="text-[11px] text-slate-500 font-medium">Pelanggan</p>
                        <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                        <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          {item.phone}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] text-slate-500 font-medium">Motor &amp; Jadwal</p>
                        <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                          <Bike className="w-4 h-4 text-blue-600 shrink-0" />
                          {item.motorcycle}
                        </p>
                        <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {item.date} • {item.time} WIB
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] text-slate-500 font-medium">Layanan / Pesanan Ban</p>
                        <p className="font-bold text-blue-700 text-sm flex items-center gap-1.5">
                          <Wrench className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          {item.service}
                        </p>
                        {item.notes && (
                          <p className="text-xs text-slate-500 italic mt-0.5 line-clamp-2">
                            &ldquo;{item.notes}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    {/* Status Dropdown and Delete */}
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(
                          item.id,
                          e.target.value as BookingData["status"]
                        )
                      }
                      className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:border-blue-600 cursor-pointer focus:outline-none shadow-sm"
                    >
                      <option value="Menunggu">Ubah: Menunggu</option>
                      <option value="Diproses">Ubah: Diproses</option>
                      <option value="Dikonfirmasi">Ubah: Dikonfirmasi</option>
                      <option value="Selesai">Ubah: Selesai</option>
                      <option value="Dibatalkan">Ubah: Dibatalkan</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Hapus data booking"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
