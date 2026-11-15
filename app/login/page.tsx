"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { LockKeyhole, LogIn, UserRound, ShieldCheck, ShieldAlert, Eye, EyeOff, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { getCurrentUser, loginUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const registered = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("registered") === "1";

  useEffect(() => {
    let active = true;
    void getCurrentUser().then((profile) => {
      if (!active || !profile) return;
      router.replace(profile.role === "admin" ? "/admin/dashboard" : "/");
    }).catch(() => undefined);
    return () => { active = false; };
  }, [router]);

  function switchMode(admin: boolean) {
    setIsAdminMode(admin); setEmail(""); setPassword(""); setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setIsSubmitting(true);
    try {
      const { user } = await loginUser(email, password);
      if (!user) throw new Error("Email atau password belum sesuai.");
      const profile = await getCurrentUser();
      if (isAdminMode && profile?.role !== "admin") {
        await (await import("@/lib/auth")).logoutUser();
        throw new Error("Akun ini tidak memiliki hak akses administrator.");
      }
      if (!isAdminMode && profile?.role === "admin") {
        await (await import("@/lib/auth")).logoutUser();
        throw new Error("Akun administrator harus masuk melalui mode khusus admin.");
      }
      const nextPath = new URLSearchParams(window.location.search).get("next");
      if (profile?.role === "admin") {
        const allowed = ["/admin/dashboard", "/admin", "/profil"];
        router.replace(nextPath && allowed.some((path) => nextPath.startsWith(path)) ? nextPath : "/admin/dashboard");
      } else {
        router.replace(nextPath?.startsWith("/") ? nextPath : "/");
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Login gagal. Periksa kembali data Anda.");
    } finally { setIsSubmitting(false); }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-100 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center"><p className="text-3xl font-black text-slate-900">MotoFix<span className="text-blue-600">Pro</span></p><p className="mt-2 text-slate-600">{isAdminMode ? "Portal Otorisasi Khusus Administrator" : "Masuk untuk mengakses layanan bengkel kami"}</p></div>
        <div className="card border border-slate-200/80 bg-white p-8 shadow-xl sm:p-10">
          <div className="mb-5 flex items-center justify-between"><div><h1 className="flex items-center gap-2 text-2xl font-extrabold text-slate-900">{isAdminMode ? <><ShieldCheck className="h-6 w-6 text-blue-600" />Login Khusus Admin</> : "Login Pengguna"}</h1><p className="mt-1 text-xs text-slate-500">{isAdminMode ? "Hanya untuk staf dan admin yang memiliki otoritas resmi." : "Gunakan email akun MotoFix Pro yang sudah terdaftar."}</p></div>{isAdminMode && <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-bold text-white"><Shield className="h-3 w-3 text-amber-400" />RESTRICTED</span>}</div>
          <div className="mb-6 flex items-center gap-1 rounded-2xl border border-slate-200 bg-slate-100 p-1.5"><button type="button" onClick={() => switchMode(false)} className={`flex-1 rounded-xl py-2 text-xs font-bold ${!isAdminMode ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`}>Pengguna</button><button type="button" onClick={() => switchMode(true)} className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold ${isAdminMode ? "bg-blue-600 text-white shadow-md" : "text-blue-700"}`}><ShieldCheck className="h-3.5 w-3.5" />Khusus Admin</button></div>
          {registered && !isAdminMode && <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">Pendaftaran berhasil! Silakan login untuk masuk.</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label htmlFor="login-email" className="mb-1.5 block text-xs font-semibold text-slate-700">Email</label><div className="relative"><UserRound className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input id="login-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="input-field pl-11 !text-sm" placeholder="nama@email.com" autoComplete="email" /></div></div>
            <div><label htmlFor="login-password" className="mb-1.5 block text-xs font-semibold text-slate-700">{isAdminMode ? "Password Admin" : "Password"}</label><div className="relative"><LockKeyhole className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input id="login-password" required type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} className="input-field pl-11 pr-11 !text-sm" placeholder="Masukkan password" autoComplete="current-password" /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" aria-label="Tampilkan atau sembunyikan password">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></div>
            {error && <div role="alert" className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-600"><ShieldAlert className="h-4 w-4 shrink-0" /><span>{error}</span></div>}
            <button type="submit" disabled={isSubmitting} className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold shadow-lg disabled:opacity-60 ${isAdminMode ? "bg-slate-900 text-white" : "btn-primary"}`}>{isAdminMode ? <><ShieldCheck className="h-4 w-4 text-amber-400" />{isSubmitting ? "Memverifikasi..." : "Verifikasi & Masuk Admin"}</> : <><LogIn className="h-4 w-4" />{isSubmitting ? "Memproses..." : "Masuk ke MotoFix Pro"}</>}</button>
          </form>
          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 text-xs text-slate-500"><span>{isAdminMode ? "Keamanan Bengkel" : "Belum punya akun?"}</span>{isAdminMode ? <button type="button" onClick={() => switchMode(false)} className="font-semibold text-blue-600">Kembali ke Login Biasa</button> : <Link href="/register" className="font-semibold text-blue-600">Daftar sekarang</Link>}</div>
        </div>
      </div>
    </div>
  );
}
