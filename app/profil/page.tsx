"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { Camera, UserRound, ShieldCheck, CalendarCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { getCurrentUser, updateUserProfileImage, type UserProfile } from "@/lib/auth";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    async function loadProfile() {
      try {
        const profile = await getCurrentUser();
        if (!active) return;
        if (!profile) {
          router.replace("/login?next=%2Fprofil");
          return;
        }
        setUser(profile);
      } catch {
        if (active) setMessage("Profil gagal dimuat. Coba muat ulang halaman.");
      } finally {
        if (active) setIsLoading(false);
      }
    }
    void loadProfile();
    return () => { active = false; };
  }, [router]);

  async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setMessage("Silakan pilih file PNG, JPG, atau WEBP.");
      event.target.value = "";
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setMessage("Ukuran foto maksimal 2 MB.");
      event.target.value = "";
      return;
    }

    setIsUploading(true);
    setMessage("");
    try {
      const imageUrl = await updateUserProfileImage(file);
      setUser((current) => current ? { ...current, profile_image_url: imageUrl } : current);
      setMessage("Foto profil berhasil diperbarui.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Foto gagal diunggah. Coba lagi.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50"><p className="text-sm font-medium text-slate-500">Memuat profil...</p></div>;
  }
  if (!user) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50"><p className="text-sm font-medium text-slate-500">{message || "Mengarahkan ke halaman login..."}</p></div>;
  }

  const username = user.username?.trim() || "Pengguna";
  const profileImage = user.profile_image_url || "";
  const isUserAdmin = user.role === "admin";

  return (
    <section className="min-h-screen bg-slate-50 px-4 pb-16 pt-32">
      <div className="mx-auto max-w-xl">
        <div className="card p-8 sm:p-10">
          <h1 className="text-3xl font-bold text-slate-900">Profil Saya</h1>
          <p className="mt-2 text-slate-600">Kelola foto profil akun MotoFix Pro kamu.</p>

          <div className="mt-8 flex flex-col items-center">
            <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-blue-50 ring-4 ring-blue-100">
              {profileImage ? <img src={profileImage} alt={`Foto profil ${username}`} className="h-full w-full object-cover" /> : <UserRound className="h-16 w-16 text-blue-500" />}
            </div>
            <label className={`btn-primary mt-6 ${isUploading ? "cursor-wait opacity-60" : "cursor-pointer"}`}>
              <Camera className="h-5 w-5" />
              {isUploading ? "Mengunggah..." : "Ubah Foto Profil"}
              <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImageChange} disabled={isUploading} className="sr-only" />
            </label>
            <p className="mt-3 text-xs text-slate-500">PNG, JPG, atau WEBP, maksimal 2 MB.</p>
          </div>

          <div className="mt-8 rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Username &amp; Hak Akses</p>
            <div className="mt-1 flex items-center justify-between gap-3">
              <p className="font-semibold text-slate-900">{username}</p>
              {isUserAdmin ? <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">🛡️ ADMINISTRATOR</span> : <span className="inline-flex items-center rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-700">Pengguna</span>}
            </div>
          </div>

          {!isUserAdmin && <div className="mt-4 flex items-center justify-between rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
            <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600"><CalendarCheck className="h-5 w-5" /></div><div><p className="text-sm font-bold text-slate-900">Pesanan &amp; Servis Saya</p><p className="text-xs text-slate-500">Lihat status pengerjaan atau booking ban Anda</p></div></div>
            <Link href="/pesanan" className="rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm shadow-blue-600/20 transition-all hover:bg-blue-700">Cek Status</Link>
          </div>}

          {isUserAdmin && <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-900 p-4 text-white shadow-lg">
            <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-amber-400"><ShieldCheck className="h-5 w-5" /></div><div><p className="text-sm font-bold">Dashboard Admin</p><p className="text-xs text-slate-400">Kelola dan pantau seluruh pesanan booking</p></div></div>
            <Link href="/admin/dashboard" className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-blue-700">Buka Dashboard</Link>
          </div>}

          {message && <p role="status" className="mt-5 text-center text-sm font-medium text-blue-600">{message}</p>}
        </div>
      </div>
    </section>
  );
}
