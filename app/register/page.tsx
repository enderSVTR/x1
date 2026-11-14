"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { LockKeyhole, UserPlus, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { getUsers, saveUser } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedUsername = username.trim();

    if (normalizedUsername.length < 3) {
      setError("Username minimal 3 karakter.");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    if (password !== confirmation) {
      setError("Konfirmasi password belum sama.");
      return;
    }

    if (
      getUsers().some(
        (user) => user.username.toLowerCase() === normalizedUsername.toLowerCase(),
      )
    ) {
      setError("Username tersebut sudah digunakan.");
      return;
    }

    saveUser({ username: normalizedUsername, password });
    router.replace("/login?registered=1");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-100 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-3xl font-black text-slate-900">
            MotoFix<span className="text-blue-600">Pro</span>
          </p>
          <p className="mt-2 text-slate-600">Buat akun khusus untuk web MotoFix Pro</p>
        </div>

        <div className="card p-8 sm:p-10">
          <h1 className="text-2xl font-bold text-slate-900">Buat Akun Baru</h1>
          <p className="mt-2 text-sm text-slate-500">
            Daftar sekali untuk booking servis dan melihat katalog produk.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label htmlFor="register-username" className="mb-2 block text-sm font-medium text-slate-700">
                Username
              </label>
              <div className="relative">
                <UserRound className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="register-username"
                  required
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="input-field pl-11"
                  placeholder="Minimal 3 karakter"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="register-password" className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="register-password"
                  required
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="input-field pl-11"
                  placeholder="Minimal 6 karakter"
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div>
              <label htmlFor="register-confirmation" className="mb-2 block text-sm font-medium text-slate-700">
                Konfirmasi Password
              </label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="register-confirmation"
                  required
                  type="password"
                  value={confirmation}
                  onChange={(event) => setConfirmation(event.target.value)}
                  className="input-field pl-11"
                  placeholder="Ulangi password"
                  autoComplete="new-password"
                />
              </div>
            </div>

            {error && <p className="text-sm font-medium text-red-600">{error}</p>}

            <button type="submit" className="btn-primary w-full">
              <UserPlus className="h-5 w-5" />
              Daftar dan Masuk
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-600">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
              Login di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
