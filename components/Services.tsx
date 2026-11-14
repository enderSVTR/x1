import {
  Wrench,
  Settings,
  Gauge,
  Droplets,
  BatteryCharging,
  Cog,
  Sparkles,
  Flame,
  Disc3,
} from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Servis Berkala",
    description:
      "Perawatan rutin sesuai jadwal pabrikan untuk menjaga performa dan keawetan mesin motor Anda.",
    price: "Mulai Rp 75K",
  },
  {
    icon: Settings,
    title: "Service Mesin",
    description:
      "Tune up, penyetelan karburator/Injeksi, dan perbaikan mesin menggunakan alat modern.",
    price: "Mulai Rp 150K",
  },
  {
    icon: Gauge,
    title: "Perbaikan CVT & Kaki-kaki",
    description:
      "Servis CVT matic, perbaikan suspensi, dan pengecekan sistem kaki-kaki motor.",
    price: "Mulai Rp 100K",
  },
  {
    icon: BatteryCharging,
    title: "Kelistrikan & Aki",
    description:
      "Perbaikan sistem kelistrikan, penggantian aki, dan pengecekan pengisian motor.",
    price: "Mulai Rp 50K",
  },
  {
    icon: Cog,
    title: "Servis Rem & Kopling",
    description:
      "Pengecekan, penggantian kampas rem, dan penyetelan kopling untuk keselamatan.",
    price: "Mulai Rp 40K",
  },
  {
    icon: Sparkles,
    title: "Cuci & Detailing",
    description:
      "Cuci motor, detailing, dan poles bodi agar motor Anda tampak seperti baru.",
    price: "Mulai Rp 35K",
  },
  {
    icon: Flame,
    title: "Karburator & Injeksi",
    description:
      "Service karburator dan sistem injeksi bahan bakar untuk konsumsi BBM yang efisien.",
    price: "Mulai Rp 120K",
  },
  {
    icon: Disc3,
    title: "Ganti Oli & Filter",
    description:
      "Penggantian oli mesin dan filter dengan produk berkualitas semua merek motor.",
    price: "Mulai Rp 60K",
  },
  {
    icon: Droplets,
    title: "Servis Radiator",
    description:
      "Perawatan radiator dan sistem pendingin untuk motor, termasuk motor sport yang overheat.",
    price: "Mulai Rp 90K",
  },
];

export default function Services() {
  return (
    <section id="layanan" className="py-20 lg:py-28 bg-slate-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
            Layanan Kami
          </span>
          <h2 className="section-title">
            Layanan Lengkap untuk Semua Kebutuhan
          </h2>
          <p className="section-subtitle">
            Dari perawatan rutin hingga perbaikan besar, kami menyediakan semua
            layanan yang dibutuhkan motor Anda di satu tempat.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="card group p-8 hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <service.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {service.title}
              </h3>
              <p className="text-slate-600 mb-4">{service.description}</p>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold">
                {service.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
