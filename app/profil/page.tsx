"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { Camera, UserRound, ShieldCheck, CalendarCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { getCurrentUser, hasValidSession, updateUserProfileImage } from "@/lib/auth";

export default function ProfilePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!hasValidSession()) {
      router.replace("/login?next=%2Fprofil");
      return;
    }

    const user = getCurrentUser();
    if (user) {
      setUsername(user.username);
      setProfileImage(user.profileImage || "");
      setIsUserAdmin(user.username.toLowerCase() === "nabil1908" || user.role === "admin");
    }
  }, [router]);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Silakan pilih file gambar.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessage("Ukuran foto maksimal 2 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const image = typeof reader.result === "string" ? reader.result : "";
      if (!image) return;

      updateUserProfileImage(username, image);
      setProfileImage(image);
      setMessage("Foto profil berhasil diperbarui.");
    };
    reader.readAsDataURL(file);
  }

  if (!username) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm font-medium text-slate-500">Memuat profil...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 px-4 pb-16 pt-32">
      <div className="mx-auto max-w-xl">
        <div className="card p-8 sm:p-10">
          <h1 className="text-3xl font-bold text-slate-900">Profil Saya</h1>
          <p className="mt-2 text-slate-600">Kelola foto profil akun MotoFix Pro kamu.</p>

          <div className="mt-8 flex flex-col items-center">
            <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-blue-50 ring-4 ring-blue-100">
              {profileImage ? (
                <img src={profileImage} alt={`Foto profil ${username}`} className="h-full w-full object-cover" />
              ) : (
                <UserRound className="h-16 w-16 text-blue-500" />
              )}
            </div>

            <label className="btn-primary mt-6 cursor-pointer">
              <Camera className="h-5 w-5" />
              Ubah Foto Profil
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageChange}
                className="sr-only"
              />
            </label>
            <p className="mt-3 text-xs text-slate-500">PNG, JPG, atau WEBP, maksimal 2 MB.</p>
          </div>

          <div className="mt-8 rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Username &amp; Hak Akses</p>
            <div className="mt-1 flex items-center justify-between">
              <p className="font-semibold text-slate-900">{username}</p>
              {isUserAdmin ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                  🛡️ ADMINISTRATOR
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                  Pengguna
                </span>
              )}
            </div>
          </div>

          {/* User Booking Status Link (Only for regular customers) */}
          {!isUserAdmin && (
            <div className="mt-4 p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">Pesanan &amp; Servis Saya</p>
                  <p className="text-xs text-slate-500">Lihat status pengerjaan atau booking ban Anda</p>
                </div>
              </div>
              <Link
                href="/pesanan"
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm shadow-blue-600/20"
              >
                Cek Status
              </Link>
            </div>
          )}

          {isUserAdmin && (
            <div className="mt-6 p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">Dashboard Admin</p>
                  <p className="text-xs text-slate-400">Kelola dan pantau seluruh pesanan booking</p>
                </div>
              </div>
              <Link
                href="/admin/dashboard"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
              >
                Buka Dashboard
              </Link>
            </div>
          )}

          {message && <p className="mt-5 text-center text-sm font-medium text-blue-600">{message}</p>}
        </div>
      </div>
    </section>
  );
}
