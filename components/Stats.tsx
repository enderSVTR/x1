import { Bike, Users, Award, Clock } from "lucide-react";

const stats = [
  { icon: Bike, value: "5.000+", label: "Motor Diperbaiki" },
  { icon: Users, value: "4.500+", label: "Pelanggan Puas" },
  { icon: Award, value: "10+", label: "Tahun Pengalaman" },
  { icon: Clock, value: "24/7", label: "Layanan Darurat" },
];

export default function Stats() {
  return (
    <section className="relative py-16 lg:py-20 bg-gradient-to-r from-blue-700 to-blue-900 overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="container-custom relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                <stat.icon className="w-8 h-8 text-amber-400" />
              </div>
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </p>
              <p className="text-blue-200">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
