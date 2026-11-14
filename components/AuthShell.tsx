"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { hasValidSession, isAdmin } from "@/lib/auth";

const publicPaths = ["/login", "/register"];
const adminAllowedPaths = ["/admin/dashboard", "/admin", "/profil"];

export default function AuthShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const isPublicPath = publicPaths.includes(pathname);
  const userIsAdmin = isAdmin();

  useEffect(() => {
    if (!isPublicPath && !hasValidSession()) {
      setIsChecking(false);
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    // Role check: Admin is strictly restricted to Dashboard Admin and Profil
    if (!isPublicPath && hasValidSession() && isAdmin()) {
      const isAllowedForAdmin = adminAllowedPaths.some((p) =>
        pathname.startsWith(p)
      );
      if (!isAllowedForAdmin) {
        setIsChecking(false);
        router.replace("/admin/dashboard");
        return;
      }
    }

    setIsChecking(false);
  }, [isPublicPath, pathname, router]);

  if (isChecking && !isPublicPath) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm font-medium text-slate-500">Memeriksa hak akses...</p>
      </div>
    );
  }

  if (isPublicPath) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      {userIsAdmin ? (
        <footer className="py-6 bg-slate-900 text-slate-400 text-center text-xs border-t border-slate-800">
          Panel Administrator MotoFix Pro • Terproteksi &amp; Rahasia
        </footer>
      ) : (
        <Footer />
      )}
    </>
  );
}
