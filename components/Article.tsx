import { Calendar, ArrowRight } from "lucide-react";

const articles = [
  {
    title: "5 Tanda Motor Anda Perlu Servis Berkala",
    excerpt:
      "Kenali tanda-tanda motor yang membutuhkan perawatan rutin agar terhindar dari kerusakan yang lebih parah.",
    date: "12 Jan 2025",
    readTime: "5 menit",
  },
  {
    title: "Cara Merawat Aki Motor Agar Awet",
    excerpt:
      "Tips praktis merawat aki motor agar lebih tahan lama dan terhindar dari masalah di tengah perjalanan.",
    date: "5 Jan 2025",
    readTime: "4 menit",
  },
  {
    title: "Pentingnya Merawat Ban Motor Rutin",
    excerpt:
      "Kenapa perawatan ban motor penting untuk keamanan berkendara dan menjaga keausan ban tetap merata.",
    date: "28 Des 2024",
    readTime: "6 menit",
  },
];

export default function Article() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
            Artikel & Tips
          </span>
          <h2 className="section-title">Tips Perawatan Motor</h2>
          <p className="section-subtitle">
            Informasi dan tips berguna untuk menjaga motor Anda tetap prima dan
            awet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.title}
              className="card group hover:-translate-y-2"
            >
              <div className="h-48 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-4xl">
                  🏍️
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {article.date}
                  </span>
                  <span>{article.readTime} baca</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-slate-600 mb-6">{article.excerpt}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all duration-300"
                >
                  Baca Selengkapnya
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
