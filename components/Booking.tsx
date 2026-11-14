"use client";

import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  Bike,
} from "lucide-react";
import { saveBooking, BookingData } from "@/lib/bookings";
import { getCurrentUser } from "@/lib/auth";

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

export default function Booking() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [motorcycle, setMotorcycle] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [submittedBooking, setSubmittedBooking] = useState<BookingData | null>(null);

  // Read URL params in case user arrived from product detail page (e.g. /#kontak?service=ban&item=MICHELIN...)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const paramService = params.get("service");
      const paramItem = params.get("item");

      if (paramService === "ban") {
        setService("Ganti Ban (Pemasangan & Balancing)");
      } else if (paramService === "oli") {
        setService("Ganti Oli & Filter Mesin");
      } else if (paramService === "sparepart") {
        setService("Pemasangan Sparepart Motor");
      }

      if (paramItem) {
        setNotes((prev) =>
          prev ? prev : `Saya ingin memesan / memasang: ${paramItem}`
        );
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !motorcycle || !service || !date || !time) {
      return;
    }

    const currentUser = getCurrentUser();
    const saved = saveBooking({
      name: name.trim(),
      phone: phone.trim(),
      motorcycle: motorcycle.trim(),
      service,
      date,
      time,
      notes: notes.trim(),
      username: currentUser?.username,
    });

    setSubmittedBooking(saved);
  };

  const handleReset = () => {
    setSubmittedBooking(null);
    setName("");
    setPhone("");
    setMotorcycle("");
    setService("");
    setDate("");
    setTime("");
    setNotes("");
  };

  return (
    <section id="kontak" className="py-20 lg:py-28 bg-slate-50/50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Info */}
          <div>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Booking Layanan &amp; Ban
            </span>
            <h2 className="section-title text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Pesan Servis Motor Anda Sekarang
            </h2>
            <p className="section-subtitle mb-8 text-slate-600">
              Isi formulir booking di bawah. Data pemesanan ban dan servis Anda
              akan langsung tercatat di sistem kami dan teknisi akan segera
              mengonfirmasi jadwal Anda.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Telepon &amp; WhatsApp</h3>
                  <p className="text-slate-600 text-sm">+62 812-3456-7890</p>
                  <p className="text-xs text-blue-600 font-medium mt-0.5">Respon Cepat via WhatsApp</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Lokasi Bengkel</h3>
                  <p className="text-slate-600 text-sm">
                    Jl. Raya Motor No. 45, Bandung
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Dekat Pusat Kota &amp; Parkir Luas</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    Jam Operasional
                  </h3>
                  <p className="text-slate-600 text-sm">Senin - Sabtu: 08.00 - 20.00 WIB</p>
                  <p className="text-slate-600 text-sm">Minggu: 09.00 - 17.00 WIB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="card p-8 lg:p-10 bg-white border border-slate-200 shadow-xl">
            {submittedBooking ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center shadow-lg shadow-emerald-600/20">
                  <CalendarCheck className="w-10 h-10 text-emerald-600" />
                </div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-2">
                  No. Booking: {submittedBooking.id}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Booking Berhasil Dikirim!
                </h3>
                <p className="text-slate-600 mb-6 text-sm max-w-md mx-auto">
                  Terima kasih, <strong>{submittedBooking.name}</strong>! Pemesanan
                  servis <strong>{submittedBooking.service}</strong> untuk motor{" "}
                  <strong>{submittedBooking.motorcycle}</strong> sudah kami catat
                  pada tanggal <strong>{submittedBooking.date}</strong> jam{" "}
                  <strong>{submittedBooking.time}</strong>.
                </p>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left mb-6 text-xs text-slate-600 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Layanan:</span>
                    <span className="font-semibold text-slate-800">{submittedBooking.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status:</span>
                    <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                      {submittedBooking.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Waktu Booking:</span>
                    <span className="text-slate-700">{submittedBooking.createdAt}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-primary w-full justify-center"
                >
                  Buat Booking Baru
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nama Anda"
                      className="input-field !text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      No. WhatsApp / Telepon *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="08123456789"
                      className="input-field !text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Merk &amp; Tipe Motor *
                  </label>
                  <div className="relative">
                    <Bike className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={motorcycle}
                      onChange={(e) => setMotorcycle(e.target.value)}
                      placeholder="Contoh: Honda Vario 125 / Yamaha NMAX"
                      className="input-field pl-10 !text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Pilih Layanan / Pesanan *
                  </label>
                  <select
                    required
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="input-field !text-sm"
                  >
                    <option value="" disabled>
                      Pilih layanan yang Anda butuhkan...
                    </option>
                    {services.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Tanggal Kedatangan *
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="input-field !text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Jam Kedatangan *
                    </label>
                    <select
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="input-field !text-sm"
                    >
                      <option value="" disabled>
                        Pilih jam...
                      </option>
                      <option value="08:00">08:00 - 09:00 WIB</option>
                      <option value="09:00">09:00 - 10:00 WIB</option>
                      <option value="10:00">10:00 - 11:00 WIB</option>
                      <option value="11:00">11:00 - 12:00 WIB</option>
                      <option value="13:00">13:00 - 14:00 WIB</option>
                      <option value="14:00">14:00 - 15:00 WIB</option>
                      <option value="15:00">15:00 - 16:00 WIB</option>
                      <option value="16:00">16:00 - 17:00 WIB</option>
                      <option value="17:00">17:00 - 18:00 WIB</option>
                      <option value="19:00">19:00 - 20:00 WIB</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Catatan / Detail Ban atau Keluhan (Opsional)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tuliskan nama ban yang diinginkan atau keluhan khusus motor Anda..."
                    className="input-field resize-none !text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center !py-3.5 shadow-lg shadow-blue-600/30 font-bold"
                >
                  <Send className="w-4 h-4" />
                  Kirim Booking
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
