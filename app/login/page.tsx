"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import {
  LockKeyhole,
  LogIn,
  UserRound,
  ShieldCheck,
  ShieldAlert,
  Eye,
  EyeOff,
  Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getUsers, hasValidSession, setSession } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [error, setError] = useState("");
  const registered =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("registered") === "1";

  useEffect(() => {
    if (!hasValidSession()) {
      return;
    }

    if (isAdmin()) {
      router.replace("/admin/dashboard");
      return;
    }

    const nextPath = new URLSearchParams(window.location.search).get("next");
    const destination = nextPath?.startsWith("/") ? nextPath : "/";
    router.replace(destination);
  }, [router]);

  function handleSwitchToAdmin() {
    setIsAdminMode(true);
    setUsername("");
    setPassword("");
    setError("");
  }

  function handleSwitchToUser() {
    setIsAdminMode(false);
    setUsername("");
    setPassword("");
    setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanUsername = username.trim();

    // Check against registered users and admin
    const user = getUsers().find(
      (savedUser) =>
        savedUser.username.toLowerCase() === cleanUsername.toLowerCase() &&
        savedUser.password === password,
    );

    if (!user) {
      setError(
        isAdminMode
          ? "Username atau kode sandi admin tidak valid."
          : "Username atau password belum sesuai.",
      );
      return;
    }

    // If in admin mode, make sure the user actually has admin credentials
    if (isAdminMode && user.role !== "admin") {
      setError("Akun ini tidak memiliki hak akses administrator.");
      return;
    }

    setSession(user.username);
    const nextPath = new URLSearchParams(window.location.search).get("next");
    if (user.role === "admin" || user.username.toLowerCase() === "nabil1908") {
      const allowedAdminRedirect = ["/admin/dashboard", "/admin", "/profil"];
      const target =
        nextPath && allowedAdminRedirect.some((p) => nextPath.startsWith(p))
          ? nextPath
          : "/admin/dashboard";
      router.replace(target);
      return;
    }
    const destination = nextPath?.startsWith("/") ? nextPath : "/";
    router.replace(destination);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-100 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="mb-8 text-center">
          <p className="text-3xl font-black text-slate-900">
            MotoFix<span className="text-blue-600">Pro</span>
          </p>
          <p className="mt-2 text-slate-600">
            {isAdminMode
              ? "Portal Otorisasi Khusus Administrator"
              : "Masuk untuk mengakses layanan bengkel kami"}
          </p>
        </div>

        <div className="card p-8 sm:p-10 shadow-xl border border-slate-200/80 bg-white">
          {/* Header Title */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                {isAdminMode ? (
                  <>
                    <ShieldCheck className="w-6 h-6 text-blue-600" />
                    Login Khusus Admin
                  </>
                ) : (
                  "Login Pengguna"
                )}
              </h1>
              <p className="mt-1 text-xs text-slate-500">
                {isAdminMode
                  ? "Hanya untuk staf dan admin yang memiliki otoritas resmi."
                  : "Gunakan akun MotoFix Pro yang sudah terdaftar."}
              </p>
            </div>
            {isAdminMode && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 text-white text-[11px] font-bold">
                <Shield className="w-3 h-3 text-amber-400" />
                RESTRICTED
              </span>
            )}
          </div>

          {/* Button Mode Switcher */}
          <div className="mb-6 p-1.5 rounded-2xl bg-slate-100 flex items-center gap-1 border border-slate-200">
            <button
              type="button"
              onClick={handleSwitchToUser}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                !isAdminMode
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Pengguna
            </button>
            <button
              type="button"
              onClick={handleSwitchToAdmin}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                isAdminMode
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                  : "text-blue-700 hover:bg-blue-50"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Khusus Admin
            </button>
          </div>

          {registered && !isAdminMode && (
            <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              Pendaftaran berhasil! Silakan login untuk masuk ke halaman bengkel.
            </div>
          )}

          {/* Form with clean, empty inputs */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-xs font-semibold text-slate-700"
              >
                {isAdminMode ? "Username Admin" : "Username"}
              </label>
              <div className="relative">
                <UserRound className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="username"
                  required
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="input-field pl-11 !text-sm"
                  placeholder={
                    isAdminMode
                      ? "Masukkan username admin"
                      : "Masukkan username"
                  }
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-semibold text-slate-700"
              >
                {isAdminMode ? "Kode Khusus / Password" : "Password"}
              </label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="input-field pl-11 pr-11 !text-sm"
                  placeholder={
                    isAdminMode
                      ? "Masukkan kode sandi khusus admin"
                      : "Masukkan password"
                  }
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  tabIndex={-1}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-600 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                isAdminMode
                  ? "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20"
                  : "btn-primary shadow-blue-600/20"
              }`}
            >
              {isAdminMode ? (
                <>
                  <ShieldCheck className="h-4 w-4 text-amber-400" />
                  Verifikasi &amp; Masuk Admin
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Masuk ke MotoFix Pro
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              {isAdminMode ? "Keamanan Bengkel" : "Belum punya akun?"}
            </span>
            {isAdminMode ? (
              <button
                type="button"
                onClick={handleSwitchToUser}
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Kembali ke Login Biasa
              </button>
            ) : (
              <Link
                href="/register"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Daftar sekarang
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
