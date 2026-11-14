import Link from "next/link";
import {
  Wrench,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">MotoFix</span>
              <span className="text-xl font-bold text-blue-500">Pro</span>
            </div>
            <p className="text-sm leading-relaxed">
              Bengkel motor modern dengan teknisi profesional dan peralatan
              canggih. Kami berkomitmen memberikan layanan terbaik untuk motor
              Anda.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                aria-label="Facebook MotoFix Pro"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                aria-label="Instagram MotoFix Pro"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                aria-label="Twitter MotoFix Pro"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="text-white font-semibold mb-4">Layanan</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/#layanan" className="hover:text-blue-400 transition-colors">
                  Servis Berkala
                </Link>
              </li>
              <li>
                <Link href="/#layanan" className="hover:text-blue-400 transition-colors">
                  Perbaikan Mesin
                </Link>
              </li>
              <li>
                <Link href="/oli" className="hover:text-blue-400 transition-colors">
                  Ganti Oli
                </Link>
              </li>
              <li>
                <Link href="/ban" className="hover:text-blue-400 transition-colors">
                  Ban Motor
                </Link>
              </li>
              <li>
                <Link href="/sparepart" className="hover:text-blue-400 transition-colors">
                  Sparepart Motor
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kontak</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                <span>Jl. Raya Motor No. 45, Bandung</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <span>info@motofixpro.id</span>
              </li>
            </ul>
          </div>

          {/* Jam Operasional */}
          <div>
            <h3 className="text-white font-semibold mb-4">Jam Operasional</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-500 shrink-0" />
                <span>Senin - Sabtu: 08.00 - 20.00</span>
              </li>
              <li className="ml-8">Minggu: 09.00 - 17.00</li>
              <li className="ml-8">Hari Libur: Tutup</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm">
          <p>
            © {new Date().getFullYear()} MotoFix Pro. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
