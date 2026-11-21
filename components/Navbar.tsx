"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Phone,
  LogOut,
  UserRound,
  ShieldCheck,
  LayoutDashboard,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser, logoutUser, type UserProfile } from "@/lib/auth";
import logoMotoFix from "../logo MotoFixPro/logo MotoFixPro.png";
import NotificationDropdown from "@/components/NotificationDropdown";

const customerNavLinks = [
  { name: "Beranda", href: "/#beranda" },
  { name: "Servis", href: "/#layanan" },
  { name: "Sparepart", href: "/sparepart" },
  { name: "Oli", href: "/oli" },
  { name: "Ban", href: "/ban" },
  { name: "Pesanan Saya", href: "/pesanan" },
  { name: "Testimoni", href: "/#testimoni" },
  { name: "Kontak", href: "/#kontak" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const username = currentUser?.username;
  const userIsAdmin = currentUser?.role === "admin";
  const profileImage = currentUser?.profile_image_url;

  useEffect(() => {
    let isMounted = true;

    async function loadCurrentUser() {
      try {
        const user = await getCurrentUser();
        if (isMounted) setCurrentUser(user);
      } catch (error) {
        console.error("Gagal memuat pengguna navbar:", error);
        if (isMounted) setCurrentUser(null);
      }
    }

    void loadCurrentUser();
    return () => {
      isMounted = false;
    };
  }, [pathname]);

  async function handleLogout() {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      await logoutUser();
      setCurrentUser(null);
      setIsOpen(false);
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Gagal keluar dari akun:", error);
      setIsLoggingOut(false);
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur-md">
      <nav className="container-custom flex items-center justify-between py-4">
        {/* Logo: admin stays on the admin dashboard */}
        <Link
          href={userIsAdmin ? "/admin/dashboard" : "/"}
          className="flex items-center gap-2"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
            <Image
              src={logoMotoFix}
              alt="MotoFixPro Logo"
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div>
            <span className="text-xl font-bold text-slate-900">MotoFix</span>
            <span className="text-xl font-bold text-blue-600">Pro</span>
            {userIsAdmin && (
              <span className="ml-2 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-400">
                ADMIN
              </span>
            )}
          </div>
        </Link>

        {/* Desktop navigation */}
        {userIsAdmin ? (
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-slate-800"
            >
              <LayoutDashboard className="h-4 w-4 text-amber-400" />
              Dashboard Admin
            </Link>

            <Link
              href="/profil"
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-blue-600"
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={`Foto profil ${username ?? "admin"}`}
                  className="h-7 w-7 rounded-full object-cover ring-2 ring-blue-100"
                />
              ) : (
                <UserRound className="h-4 w-4 text-blue-600" />
              )}
              Profil
              <span className="rounded border border-amber-300 bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                ADMIN
              </span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-wait disabled:opacity-60"
            >
              <LogOut className="h-4 w-4" />
              {isLoggingOut ? "Keluar..." : "Keluar"}
            </button>
          </div>
        ) : (
          <div className="hidden items-center gap-5 xl:flex">
            {customerNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-slate-700 transition-colors duration-300 hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}
            <Link href="/#kontak" className="btn-primary">
              <Phone className="h-4 w-4" />
              Booking Sekarang
            </Link>
            <NotificationDropdown />
            <Link
              href="/profil"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors hover:text-blue-600"
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={`Foto profil ${username ?? "pengguna"}`}
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-blue-100"
                />
              ) : (
                <UserRound className="h-5 w-5" />
              )}
              Profil
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-red-600 disabled:cursor-wait disabled:opacity-60"
            >
              <LogOut className="h-4 w-4" />
              {isLoggingOut ? "Keluar..." : "Keluar"}
            </button>
          </div>
        )}

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          {!userIsAdmin && <NotificationDropdown />}
          <button
            type="button"
            className="p-1.5 text-slate-700"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 shadow-xl md:hidden">
          {userIsAdmin ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white">
                <span>Panel Administrator</span>
                <span className="text-amber-400">{username || "Admin"}</span>
              </div>

              <Link
                href="/admin/dashboard"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 p-3 font-bold text-slate-900"
              >
                <LayoutDashboard className="h-5 w-5 text-blue-600" />
                Dashboard Admin
              </Link>

              <Link
                href="/profil"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 rounded-xl p-3 font-medium text-slate-700 hover:bg-slate-50"
              >
                <UserRound className="h-5 w-5 text-slate-500" />
                Profil Admin
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="inline-flex items-center gap-2 rounded-xl p-3 text-left font-bold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
              >
                <LogOut className="h-5 w-5" />
                {isLoggingOut ? "Keluar..." : "Keluar"}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {customerNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-medium text-slate-700 transition-colors duration-300 hover:text-blue-600"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/#kontak"
                onClick={() => setIsOpen(false)}
                className="btn-primary"
              >
                <Phone className="h-4 w-4" />
                Booking Sekarang
              </Link>
              <Link
                href="/profil"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 font-medium text-slate-700 hover:text-blue-600"
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={`Foto profil ${username ?? "pengguna"}`}
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-blue-100"
                  />
                ) : (
                  <UserRound className="h-5 w-5" />
                )}
                Profil
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="inline-flex items-center gap-2 text-left font-medium text-slate-700 transition-colors hover:text-red-600 disabled:opacity-60"
              >
                <LogOut className="h-4 w-4" />
                {isLoggingOut ? "Keluar..." : `Keluar${username ? ` (${username})` : ""}`}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
