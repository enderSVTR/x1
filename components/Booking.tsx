"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  Bike,
  CalendarCheck,
  Clock,
  MapPin,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { saveBooking, type BookingData } from "@/lib/bookings";

const services = [
  "Ganti Ban (Pemasangan & Balancing)",
  "Ganti Oli & Filter Mesin",
  "Pemasangan Sparepart Motor",
  "Servis Berkala / Tune Up",
  "Perbaikan Mesin & Injeksi",
  "Perbaikan CVT Matic",
  "Servis Rem & Kopling",
  "Kelistrikan & Aki",
  "Cuci & Detailing",
  "Lainnya",
];

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "19:00",
];

export default function Booking() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [motorcycle, setMotorcycle] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [submittedBooking, setSubmittedBooking] = useState<BookingData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    setMinDate(new Date().toISOString().slice(0, 10));
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");
    const itemParam = params.get("item");
    if (serviceParam === "ban") setService("Ganti Ban (Pemasangan & Balancing)");
    else if (serviceParam === "oli") setService("Ganti Oli & Filter Mesin");
    else if (serviceParam === "sparepart") setService("Pemasangan Sparepart Motor");
    if (itemParam) setNotes(`Saya ingin memesan / memasang: ${itemParam}`);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      // saveBooking writes the row to Supabase and associates the authenticated
      // account from its current session (when present).
      const booking = await saveBooking({
        name: name.trim(),
        phone: phone.trim(),
        motorcycle: motorcycle.trim(),
        service,
        date,
        time,
        notes: notes.trim(),
      });
      setSubmittedBooking(booking);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Booking gagal disimpan. Coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setSubmittedBooking(null);
    setName("");
    setPhone("");
    setMotorcycle("");
    setService("");
    setDate("");
    setTime("");
    setNotes("");
    setError("");
  }

  return (
    <section id="kontak" className="bg-slate-50/70 py-20 lg:py-28">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700"><Sparkles className="h-4 w-4" />Booking Servis &amp; Ban</span>
          <h2 className="section-title">Jadwalkan Servis Motor Anda</h2>
          <p className="section-subtitle">Isi formulir berikut. Data booking tersimpan di sistem agar tim kami dapat segera menindaklanjuti.</p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600"><Phone className="h-5 w-5" /></span><div><h3 className="font-semibold text-slate-900">Telepon &amp; WhatsApp</h3><p className="mt-1 text-sm text-slate-600">+62 812-3456-7890</p><p className="mt-1 text-xs text-blue-600">Respon cepat dari tim bengkel</p></div></div></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600"><MapPin className="h-5 w-5" /></span><div><h3 className="font-semibold text-slate-900">Lokasi Bengkel</h3><p className="mt-1 text-sm text-slate-600">Jl. Raya Motor No. 45, Bandung</p><p className="mt-1 text-xs text-slate-500">Dekat pusat kota &amp; parkir luas</p></div></div></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600"><Clock className="h-5 w-5" /></span><div><h3 className="font-semibold text-slate-900">Jam Operasional</h3><p className="mt-1 text-sm text-slate-600">Senin–Sabtu: 08.00–20.00 WIB</p><p className="text-sm text-slate-600">Minggu: 09.00–17.00 WIB</p></div></div></div>
          </aside>

          <div className="card border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
            {submittedBooking ? (
              <div className="py-5 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><CalendarCheck className="h-8 w-8" /></div>
                <span className="mb-3 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">No. Booking: {submittedBooking.id}</span>
                <h3 className="text-2xl font-bold text-slate-900">Booking berhasil dikirim!</h3>
                <p className="mx-auto mt-2 max-w-lg text-sm text-slate-600">Terima kasih, <strong>{submittedBooking.name}</strong>. Permintaan layanan <strong>{submittedBooking.service}</strong> untuk <strong>{submittedBooking.motorcycle}</strong> sudah tersimpan.</p>
                <div className="my-6 grid gap-3 rounded-xl bg-slate-50 p-4 text-left text-sm sm:grid-cols-2"><p><span className="text-slate-500">Tanggal:</span> <strong>{submittedBooking.date}</strong></p><p><span className="text-slate-500">Jam:</span> <strong>{submittedBooking.time} WIB</strong></p><p><span className="text-slate-500">Status:</span> <strong className="text-amber-600">{submittedBooking.status}</strong></p><p><span className="text-slate-500">Dibuat:</span> <strong>{submittedBooking.createdAt}</strong></p></div>
                <button type="button" onClick={handleReset} className="btn-primary w-full justify-center">Buat Booking Baru</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-semibold text-slate-700">Nama Lengkap *<input required maxLength={100} value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Anda" className="input-field mt-2 !text-sm" /></label>
                  <label className="block text-sm font-semibold text-slate-700">No. WhatsApp / Telepon *<input required type="tel" maxLength={30} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08123456789" className="input-field mt-2 !text-sm" /></label>
                </div>
                <label className="block text-sm font-semibold text-slate-700">Merk &amp; Tipe Motor *<span className="relative mt-2 block"><Bike className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input required maxLength={120} value={motorcycle} onChange={(e) => setMotorcycle(e.target.value)} placeholder="Contoh: Honda Vario 125 / Yamaha NMAX" className="input-field pl-10 !text-sm" /></span></label>
                <label className="block text-sm font-semibold text-slate-700">Pilih Layanan / Pesanan *<select required value={service} onChange={(e) => setService(e.target.value)} className="input-field mt-2 !text-sm"><option value="" disabled>Pilih layanan yang dibutuhkan...</option>{services.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-semibold text-slate-700">Tanggal Kedatangan *<input required type="date" min={minDate} value={date} onChange={(e) => setDate(e.target.value)} className="input-field mt-2 !text-sm" /></label>
                  <label className="block text-sm font-semibold text-slate-700">Jam Kedatangan *<select required value={time} onChange={(e) => setTime(e.target.value)} className="input-field mt-2 !text-sm"><option value="" disabled>Pilih jam...</option>{timeSlots.map((slot) => <option key={slot} value={slot}>{slot}–{String(Number(slot.slice(0, 2)) + 1).padStart(2, "0")}:00 WIB</option>)}</select></label>
                </div>
                <label className="block text-sm font-semibold text-slate-700">Catatan / Detail Keluhan (Opsional)<textarea rows={4} maxLength={1000} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Tuliskan detail ban atau keluhan motor Anda..." className="input-field mt-2 resize-y !text-sm" /></label>
                {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">Booking belum tersimpan: {error}</p>}
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center !py-3.5 font-bold shadow-lg shadow-blue-600/20 disabled:cursor-wait disabled:opacity-60"><Send className="h-4 w-4" />{isSubmitting ? "Menyimpan booking..." : "Kirim Booking"}</button>
                <p className="text-center text-xs text-slate-500">Booking baru akan berstatus “Menunggu” sampai dikonfirmasi admin.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
