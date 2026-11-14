import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Budi Santoso",
    role: "Pemilik Honda Vario",
    quote:
      "Pelayanan sangat memuaskan! Motor saya yang tadinya bermasalah langsung diperbaiki dengan cepat. Teknisinya profesional dan harga transparan.",
    rating: 5,
  },
  {
    name: "bagus ganteng tampan mirip jefri nichol 123",
    role: "Pemilik BMW M4",
    quote: "Bengkelnya jelekk",
    rating: 1,
  },
  {
    name: "Andi Wijaya",
    role: "Pemilik Suzuki Satria",
    quote:
      "Servis berkala jadi lebih praktis. Staff ramah, tempat bersih, dan ada ruang tunggu yang nyaman dengan WiFi. Garansi 6 bulan juga menenangkan.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimoni" className="py-20 lg:py-28 bg-slate-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
            Testimoni
          </span>
          <h2 className="section-title">Apa Kata Pelanggan Kami</h2>
          <p className="section-subtitle">
            Ribuan pelanggan telah mempercayakan kendaraan mereka kepada kami.
            Berikut pengalaman mereka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="card p-8 relative hover:-translate-y-2"
            >
              <Quote className="w-10 h-10 text-blue-100 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-slate-600 italic mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
