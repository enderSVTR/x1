import { StaticImageData } from "next/image";
import ecoStreet from "../foto ban/ECOSTREET 217 TUBETYPE (Rp.170.000).jpg";
import michelinPilotStreet from "../foto ban/MICHELIN TL PILOT STREET 110(Rp.600.000).jpg";
import michelinRadial from "../foto ban/MICHELIN TL PILOT STREET RADIAL(Rp.1.750.000).jpg";
import michelinPilotStreet2 from "../foto ban/MICHELIN TUBELESS PILOT STREET 2 R (RP.740.000).jpg";
import planetoGold from "../foto ban/PLANETO GOLD TL MT5 120(Rp.440.000).jpg";
import presaPlaneto from "../foto ban/PRESA PLANETO TUBELESS (Rp.280.000).jpg";

export interface TireItem {
  id: string;
  slug: string;
  name: string;
  brand: string;
  type: string;
  price: string;
  numericPrice: number;
  image: StaticImageData;
  description: string;
  fullDescription: string;
  size: string;
  ringSize: string;
  position: string;
  category: "Matic" | "Bebek" | "Sport" | "Semua Motor";
  features: string[];
  recommendedBikes: string[];
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  warranty: string;
}

export const tiresData: TireItem[] = [
  {
    id: "1",
    slug: "ecostreet-217-tubetype",
    name: "ECOSTREET 217 TUBETYPE",
    brand: "EcoStreet",
    type: "Tube Type",
    price: "Rp 170.000",
    numericPrice: 170000,
    image: ecoStreet,
    description: "Ban tubetype untuk penggunaan harian yang nyaman, hemat, dan stabil di berbagai kondisi jalan.",
    fullDescription:
      "EcoStreet 217 Tube Type dirancang khusus untuk memenuhi kebutuhan berkendara sehari-hari dengan efisiensi maksimal. Menggunakan kompon karet berkualitas tinggi yang tahan aus, ban ini memberikan kenyamanan berkendara, kestabilan handling, serta efisiensi konsumsi bahan bakar yang optimal. Sangat cocok untuk motor bebek dan matic dengan velg jari-jari maupun cast wheel yang menggunakan ban dalam.",
    size: "80/90-14",
    ringSize: "Ring 14",
    position: "Depan / Belakang",
    category: "Matic",
    features: [
      "Kompon karet awet dan tahan gesekan tinggi",
      "Pola alur tapak optimal membuang air saat hujan",
      "Handling lincah dan stabil di jalan perkotaan",
      "Harga sangat ekonomis dengan standar keselamatan teruji",
      "Gratis biaya pasang & cek tekanan di MotoFix Pro",
    ],
    recommendedBikes: [
      "Honda BeAT",
      "Honda Vario 110 / 125",
      "Honda Scoopy (Ring 14)",
      "Yamaha Mio M3 / Z",
      "Yamaha Soul GT",
      "Suzuki Address",
    ],
    inStock: true,
    rating: 4.8,
    reviewsCount: 94,
    warranty: "Garansi Toko 3 Bulan",
  },
  {
    id: "2",
    slug: "michelin-tl-pilot-street-110",
    name: "MICHELIN TL PILOT STREET 110",
    brand: "Michelin",
    type: "Tubeless",
    price: "Rp 600.000",
    numericPrice: 600000,
    image: michelinPilotStreet,
    description: "Ban Michelin Pilot Street untuk performa maksimal, kestabilan bermanuver, dan daya cengkeram prima.",
    fullDescription:
      "Michelin Pilot Street ukuran 110 hadir dengan teknologi kompon silica mutakhir yang memberikan cengkeraman superior baik di aspal kering maupun basah. Alur ban terinspirasi dari ban balap Michelin memberikan kestabilan tinggi pada kecepatan menengah hingga tinggi serta saat menikung tajam. Pilihan tepat bagi pengendara yang mendambakan rasa aman dan performa sporty.",
    size: "110/70-17",
    ringSize: "Ring 17",
    position: "Depan",
    category: "Sport",
    features: [
      "Teknologi Silica Compound untuk cengkeraman maksimal di jalan basah",
      "Desain alur tapak sporty khas balap dunia Michelin",
      "Stabilitas pengereman superior dan minim resiko selip",
      "Ketahanan jarak tempuh (mileage) hingga 30% lebih lama",
      "Gratis pengisian Nitrogen & pentil tubeless baru",
    ],
    recommendedBikes: [
      "Yamaha R15 / MT-15",
      "Yamaha Vixion / XSR 155",
      "Honda CBR150R / CB150R",
      "Suzuki GSX-R150 / GSX-S150",
      "Kawasaki Ninja 150 / 250 SL",
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 182,
    warranty: "Garansi Resmi Michelin 1 Tahun",
  },
  {
    id: "3",
    slug: "michelin-tl-pilot-street-radial",
    name: "MICHELIN TL PILOT STREET RADIAL",
    brand: "Michelin",
    type: "Radial Tubeless",
    price: "Rp 1.750.000",
    numericPrice: 1750000,
    image: michelinRadial,
    description: "Ban radial Michelin premium dengan handling mantap, kelenturan karkas superior, dan kenyamanan kelas atas.",
    fullDescription:
      "Michelin Pilot Street Radial adalah puncak performa ban untuk motor sport 250cc ke atas. Konstruksi radial revolusioner memberikan fleksibilitas dinding samping yang menyerap benturan jalanan dengan sempurna sembari menjaga tapak ban tetap menempel erat di permukaan jalan. Memberikan kenikmatan berkendara tiada tanding, stabilitas pada kecepatan tinggi, dan umur pakai yang luar biasa.",
    size: "140/70-R17",
    ringSize: "Ring 17",
    position: "Belakang",
    category: "Sport",
    features: [
      "Konstruksi Radial 100% untuk kenyamanan dan kestabilan mutlak",
      "100% Silica compound formula memberikan grip instan",
      "Umur pakai ban sangat panjang dengan keausan merata",
      "Didesain khusus untuk motor sport 250cc hingga 400cc",
      "Pemasangan menggunakan mesin tyre changer profesional & balancing presisi",
    ],
    recommendedBikes: [
      "Yamaha R25 / MT-25",
      "Honda CBR250RR",
      "Kawasaki Ninja 250 FI / ZX-25R",
      "KTM RC 250 / Duke 250 / 390",
      "Honda CBR500R",
    ],
    inStock: true,
    rating: 5.0,
    reviewsCount: 76,
    warranty: "Garansi Resmi Michelin 1 Tahun",
  },
  {
    id: "4",
    slug: "michelin-tubeless-pilot-street-2-r",
    name: "MICHELIN TUBELESS PILOT STREET 2 R",
    brand: "Michelin",
    type: "Tubeless",
    price: "Rp 740.000",
    numericPrice: 740000,
    image: michelinPilotStreet2,
    description: "Generasi terbaru Pilot Street 2 dengan grip basah ekstra kuat, pembuangan air kilat, dan umur pemakaian panjang.",
    fullDescription:
      "Michelin Pilot Street 2 Rear adalah evolusi dari seri Pilot Street terlaris. Dilengkapi dengan alur tapak tengah progresif yang membelah genangan air secara instan dan mencegah gejala aquaplaning. Kompon karet generasi baru menjaga kelenturan ban sepanjang masa pakai, memberikan rasa percaya diri ekstra saat bermanuver di tengah guyuran hujan lebat.",
    size: "130/70-17",
    ringSize: "Ring 17",
    position: "Belakang",
    category: "Sport",
    features: [
      "Central groove progresif untuk evakuasi air super cepat",
      "Compound karet generasi terbaru yang tidak mudah mengeras",
      "Pengereman lebih pendek di jalanan licin atau basah",
      "Desain tapak modern menambah estetika kegagahan motor",
      "Gratis nitrogen seumur hidup di MotoFix Pro",
    ],
    recommendedBikes: [
      "Yamaha R15 V3 / V4",
      "Yamaha MT-15 / XSR 155",
      "Honda CBR150R All New",
      "Honda CB150X",
      "Suzuki Bandit 150",
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 145,
    warranty: "Garansi Resmi Michelin 1 Tahun",
  },
  {
    id: "5",
    slug: "planeto-gold-tl-mt5-120",
    name: "PLANETO GOLD TL MT5 120",
    brand: "Planeto",
    type: "Tubeless",
    price: "Rp 440.000",
    numericPrice: 440000,
    image: planetoGold,
    description: "Ban tubeless premium Planeto Gold dengan konstruksi tangguh untuk big matic yang stabil dan nyaman.",
    fullDescription:
      "Planeto Gold TL MT5 ukuran 120 dirancang khusus untuk motor matic bongsor (Big Matic) seperti NMAX, Aerox, dan PCX. Dengan tapak lebar dan profil melengkung yang presisi, ban ini menawarkan kenyamanan redaman luar biasa di kontur jalan yang tidak rata serta handling lincah di kemacetan perkotaan. Sangat tahan terhadap tusukan benda tajam berkat lapisan ply berkekuatan tinggi.",
    size: "120/70-13",
    ringSize: "Ring 13",
    position: "Belakang",
    category: "Matic",
    features: [
      "Lebar tapak ideal untuk stabilitas motor matic premium",
      "Struktur karkas diperkuat kawat baja tahan benturan lubang",
      "Profil tapak bulat merata untuk akselerasi dan cornering mulus",
      "Tahan panas pada perjalanan turing jarak jauh",
      "Gratis pasang ban dengan mesin hidrolik anti baret velg",
    ],
    recommendedBikes: [
      "Yamaha NMAX 155 (Generasi 1 & Connected)",
      "Yamaha Aerox 155 (Depan)",
      "Honda PCX 150 / 160",
      "Honda ADV 150 / 160",
    ],
    inStock: true,
    rating: 4.8,
    reviewsCount: 112,
    warranty: "Garansi Toko 6 Bulan",
  },
  {
    id: "6",
    slug: "presa-planeto-tubeless",
    name: "PRESA PLANETO TUBELESS",
    brand: "Presa",
    type: "Tubeless",
    price: "Rp 280.000",
    numericPrice: 280000,
    image: presaPlaneto,
    description: "Ban tubeless berkualitas untuk motor matic harian dengan grip mantap dan ketahanan luar biasa.",
    fullDescription:
      "Presa Planeto Tubeless merupakan pilihan paling populer bagi pengguna motor matic komuter harian. Ban ini menggabungkan harga yang sangat terjangkau dengan kualitas tubeless standar internasional. Dinding ban yang kokoh melindungi velg dari benturan keras, sementara kompon karet medium-soft memberikan akselerasi sigap dan pengereman responsif.",
    size: "90/90-14",
    ringSize: "Ring 14",
    position: "Belakang",
    category: "Matic",
    features: [
      "Cocok sebagai ban belakang motor matic 110-125cc",
      "Tubeless sejati, tidak mudah bocor jika terkena paku",
      "Alur tapak dalam untuk usia pemakaian hingga 20.000 km",
      "Grip responsif untuk stop-and-go di kemacetan kota",
      "Pemasangan cepat dan presisi oleh mekanik berpengalaman",
    ],
    recommendedBikes: [
      "Honda BeAT All Series",
      "Honda Vario 125 / 150",
      "Honda Scoopy (Ring 14)",
      "Yamaha Mio S / Mio M3",
      "Yamaha Fino 125",
      "Suzuki Nex II",
    ],
    inStock: true,
    rating: 4.8,
    reviewsCount: 204,
    warranty: "Garansi Toko 6 Bulan",
  },
];

export function getTireBySlug(slug: string): TireItem | undefined {
  return tiresData.find((t) => t.slug === slug);
}
