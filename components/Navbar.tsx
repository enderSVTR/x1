"use client";

import Image from "next/image";
import { useState } from "react";
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
import { useRouter } from "next/navigation";
import { clearSession, getCurrentUser, isAdmin } from "@/lib/auth";
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
  const router = useRouter();
  const currentUser = getCurrentUser();
  const username = currentUser?.username;
  const userIsAdmin = isAdmin();

  function handleLogout() {
    clearSession();
    router.replace("/login");
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
      <nav className="container-custom flex items-center justify-between py-4">
        {/* Logo: admin stays on /admin/dashboard */}
        <Link
          href={userIsAdmin ? "/admin/dashboard" : "/"}
          className="flex items-center gap-2"
        >
          <div className="relative w-12 h-12 overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
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
              <span className="ml-2 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900 text-amber-400">
                ADMIN
              </span>
            )}
          </div>
        </Link>

        {/* =========================================
            ADMIN NAVIGATION (ONLY Dashboard, Profil, Keluar)
           ========================================= */}
        {userIsAdmin ? (
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-sm"
            >
              <LayoutDashboard className="w-4 h-4 text-amber-400" />
              Dashboard Admin
            </Link>

            <Link
              href="/profil"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-xl hover:bg-slate-50"
            >
              {currentUser?.profileImage ? (
                <img
                  src={currentUser.profileImage}
                  alt=""
                  className="h-7 w-7 rounded-full object-cover ring-2 ring-blue-100"
                />
              ) : (
                <UserRound className="h-4 w-4 text-blue-600" />
              )}
              Profil
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                ADMIN
              </span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors px-3 py-2 rounded-xl hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              Keluar
            </button>
          </div>
        ) : (
          /* =========================================
             CUSTOMER NAVIGATION (Full catalog & features)
             ========================================= */
          <div className="hidden xl:flex items-center gap-5">
            {customerNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-700 hover:text-blue-600 font-medium transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
            <Link href="/#kontak" className="btn-primary">
              <Phone className="w-4 h-4" />
              Booking Sekarang
            </Link>
            <NotificationDropdown />
            <Link
              href="/profil"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
            >
              {currentUser?.profileImage ? (
                <img
                  src={currentUser.profileImage}
                  alt=""
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
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Keluar
            </button>
          </div>
        )}

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          {!userIsAdmin && <NotificationDropdown />}
          <button
            className="text-slate-700 p-1.5"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-4 px-4 shadow-xl">
          {userIsAdmin ? (
            /* Admin Mobile Menu (Only Dashboard, Profil, Keluar) */
            <div className="flex flex-col gap-3">
              <div className="px-3 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center justify-between">
                <span>Panel Administrator</span>
                <span className="text-amber-400">Nabil1908</span>
              </div>

              <Link
                href="/admin/dashboard"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 text-slate-900 font-bold p-3 rounded-xl bg-blue-50 border border-blue-200"
              >
                <LayoutDashboard className="w-5 h-5 text-blue-600" />
                Dashboard Admin
              </Link>

              <Link
                href="/profil"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 text-slate-700 font-medium p-3 rounded-xl hover:bg-slate-50"
              >
                <UserRound className="w-5 h-5 text-slate-500" />
                Profil Admin
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 text-left text-red-600 font-bold p-3 rounded-xl hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Keluar
              </button>
            </div>
          ) : (
            /* Customer Mobile Menu */
            <div className="flex flex-col gap-4">
              {customerNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-slate-700 hover:text-blue-600 font-medium transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/#kontak"
                onClick={() => setIsOpen(false)}
                className="btn-primary"
              >
                <Phone className="w-4 h-4" />
                Booking Sekarang
              </Link>
              <Link
                href="/profil"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 text-left text-slate-700 hover:text-blue-600 font-medium"
              >
                <UserRound className="w-5 h-5" />
                Profil
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 text-left text-slate-700 hover:text-red-600 font-medium transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Keluar{username ? ` (${username})` : ""}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
