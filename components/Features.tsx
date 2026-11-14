import { Users, Timer, BadgeCheck, DollarSign, Bike, Send } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Teknisi Profesional",
    description:
      "Tim teknisi bersertifikat dan berpengalaman di berbagai merek dan model motor.",
  },
  {
    icon: Timer,
    title: "Pengerjaan Cepat",
    description:
      "Servis berkala selesai dalam 1-2 jam dengan estimasi waktu yang jelas dan tepat.",
  },
  {
    icon: BadgeCheck,
    title: "Garansi Kualitas",
    description:
      "Setiap perbaikan dilindungi garansi hingga 6 bulan untuk ketenangan Anda.",
  },
  {
    icon: DollarSign,
    title: "Harga Transparan",
    description:
      "Estimasi biaya jelas sebelum pengerjaan tanpa biaya tersembunyi.",
  },
  {
    icon: Bike,
    title: "Semua Jenis Motor",
    description:
      "Melayani semua tipe motor dari bebek, matic, sport, hingga motor listrik.",
  },
  {
    icon: Send,
    title: "Update Real-time",
    description:
      "Pantau progres perbaikan motor Anda melalui notifikasi WhatsApp dan telepon.",
  },
];

export default function Features() {
  return (
    <section id="keunggulan" className="py-20 lg:py-28">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
            Keunggulan Kami
          </span>
          <h2 className="section-title">Mengapa Memilih MotoFix Pro?</h2>
          <p className="section-subtitle">
            Kami menggabungkan teknologi modern dengan pelayanan terbaik untuk
            memberikan pengalaman servis motor yang berbeda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative bg-white rounded-2xl p-8 border-2 border-slate-100 hover:border-blue-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-amber-400 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
