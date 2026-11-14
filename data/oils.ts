import { StaticImageData } from "next/image";
import genuineOil from "../foto_oli/GENUINE OIL SEMI SYNTHETIC 10W40 1L API SEMUA motor ninja (Rp.190.000).jpg";
import motulScooter from "../foto_oli/MOTUL Motorcycle Oil Scooter Expert LE(Rp.150.000).jpg";
import ahmSpx2 from "../foto_oli/Honda AHM Oil SPX2 10W30 – SLMB 0.8 L REP(Rp.128.000).jpg";
import top1Formula from "../foto_oli/OLI MOTOR TOP 1 FORMULA MC SAE 20W-50 MA2 MOTOR KOPLING 4 TAK 800ML (Rp.78.000).jpg";
import shellAdvance from "../foto_oli/Oli Motor High Technology Shell Advance AX7 10w-40 (Rp.90.000).jpg";
import motulLeScooter from "../foto_oli/Oli Motul LE Scooter 10w-30 0.8L JASO MB Oli Motor Matic Motul 4T 800 Ml(Rp.71.000).jpg";

export interface OilItem {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: "Matic" | "Bebek & Kopling" | "Sport";
  sae: string;
  volume: string;
  oilType: string;
  jasoApi: string;
  price: string;
  numericPrice: number;
  image: StaticImageData;
  description: string;
  fullDescription: string;
  specifications: Record<string, string>;
  features: string[];
  recommendedBikes: string[];
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  warranty: string;
}

export const oilsData: OilItem[] = [
  {
    id: "oil-1",
    slug: "genuine-oil-semi-synthetic-10w40-1l",
    name: "GENUINE OIL Semi Synthetic 10W-40 1L (Ninja Series)",
    brand: "Kawasaki Genuine Oil",
    category: "Sport",
    sae: "10W-40",
    volume: "1.0 Liter",
    oilType: "Semi Synthetic High Performance",
    jasoApi: "API SL / JASO MA2",
    price: "Rp 190.000",
    numericPrice: 190000,
    image: genuineOil,
    description: "Oli semi synthetic 10W-40 khusus motor sport berpendingin radiator, menjaga suhu mesin tetap dingin pada rpm tinggi.",
    fullDescription:
      "Kawasaki Genuine Oil 10W-40 dirancang khusus untuk memenuhi standar ketat mesin sport performa tinggi. Formula aditif anti-shear dan thermal stabilizer mencegah penurunan viskositas oli meskipun mesin dipacu pada putaran mesin (RPM) ekstrem. Menjaga perpindahan gigi transmisi manual tetap empuk dan kampas kopling tidak selip.",
    specifications: {
      "Tingkat Kekentalan": "SAE 10W-40",
      "Kapasitas Isi": "1.000 ml (1 Liter)",
      "Standarisasi API": "API SL / SJ",
      "Standarisasi JASO": "JASO MA2 (Kopling Basah)",
      "Base Oil": "Semi Synthetic Blend",
      "Interval Penggantian": "3.000 - 4.000 Km",
    },
    features: [
      "Stabilitas termal luar biasa, mesin tidak cepat overheat",
      "Perpindahan gigi transmisi halus dan presisi",
      "Perlindungan maksimal terhadap gesekan camshaft & piston",
      "Mencegah timbulnya endapan lumpur (sludge) pada bak mesin",
      "Gratis ganti oli + cek filter oli di MotoFix Pro",
    ],
    recommendedBikes: [
      "Kawasaki Ninja 150 RR / 250 FI / ZX-25R",
      "Kawasaki KLX 150 / D-Tracker",
      "Yamaha R15 / R25 / MT-15 / MT-25",
      "Honda CBR150R / CBR250RR / CB150R",
      "Suzuki GSX-R150 / Satria FU 150",
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 168,
    warranty: "100% Original Segel Pabrik",
  },
  {
    id: "oil-2",
    slug: "motul-scooter-expert-le",
    name: "MOTUL Motorcycle Oil Scooter Expert LE 10W-30 / 10W-40",
    brand: "Motul",
    category: "Matic",
    sae: "10W-30 / 10W-40",
    volume: "1.0 Liter",
    oilType: "Technosynthese Synthetic",
    jasoApi: "API SM / JASO MB",
    price: "Rp 150.000",
    numericPrice: 150000,
    image: motulScooter,
    description: "Oli Motul Technosynthese khusus motor matic premium, akselerasi super enteng dan perlindungan mesin jangka panjang.",
    fullDescription:
      "Motul Scooter Expert LE menggunakan teknologi Technosynthese yang diperkuat aditif anti-oksidasi tingkat tinggi. Dirancang khusus untuk skuter matic modern yang beroperasi dalam kondisi stop-and-go di kemacetan perkotaan. Mengurangi friksi internal mesin matic secara drastis sehingga motor terasa sangat enteng saat berakselerasi dan konsumsi BBM lebih efisien.",
    specifications: {
      "Tingkat Kekentalan": "SAE 10W-30 / 10W-40 High Temp",
      "Kapasitas Isi": "1.000 ml (1 Liter)",
      "Standarisasi API": "API SM / SL",
      "Standarisasi JASO": "JASO MB (Khusus Matic Kopling Kering)",
      "Base Oil": "Technosynthese Synthetic Formula",
      "Interval Penggantian": "3.500 - 4.500 Km",
    },
    features: [
      "Tarikan mesin matic spontan dan sangat halus",
      "Standar JASO MB memastikan efisiensi bahan bakar maksimal",
      "Kandungan deterjen aktif membersihkan ruang mesin dari jelaga",
      "Ketahanan oli tidak gampang menguap meskipun perjalanan jauh",
      "Cocok untuk Big Matic 150cc - 250cc",
    ],
    recommendedBikes: [
      "Yamaha NMAX 155 / Aerox 155 / Lexi 125/155",
      "Yamaha XMAX 250",
      "Honda PCX 150 / 160",
      "Honda ADV 150 / 160",
      "Honda Vario 160 / Forza 250",
    ],
    inStock: true,
    rating: 5.0,
    reviewsCount: 230,
    warranty: "100% Original Motul France Tech",
  },
  {
    id: "oil-3",
    slug: "honda-ahm-oil-spx2-08l",
    name: "Honda AHM Oil SPX2 10W-30 SL MB 0.8 L",
    brand: "AHM Oil",
    category: "Matic",
    sae: "10W-30",
    volume: "0.8 Liter",
    oilType: "Fully Synthetic Superior Protection",
    jasoApi: "API SL / JASO MB",
    price: "Rp 128.000",
    numericPrice: 128000,
    image: ahmSpx2,
    description: "Oli fully synthetic resmi Honda AHM SPX2, dibuat dari base oil sintetis murni untuk performa maksimal matic Honda.",
    fullDescription:
      "AHM Oil SPX2 (Superior Protection Expert) diformulasikan oleh Honda R&D Japan dengan base oil Fully Synthetic murni. Memberikan perlindungan superior pada komponen mesin presisi motor matic Honda berteknologi eSP dan eSP+. Mengurangi gaya gesek antar partikel mesin hingga tingkat terendah untuk menghasilkan efisiensi bahan bakar maksimal dan suara mesin yang lebih hening.",
    specifications: {
      "Tingkat Kekentalan": "SAE 10W-30",
      "Kapasitas Isi": "800 ml (0.8 Liter)",
      "Standarisasi API": "API SL",
      "Standarisasi JASO": "JASO MB (Low Friction Automatic)",
      "Base Oil": "100% Fully Synthetic",
      "Interval Penggantian": "3.000 - 4.000 Km",
    },
    features: [
      "Formula resmi pabrikan Honda untuk mesin eSP dan eSP+",
      "100% Fully Synthetic murni, daya tahan degradasi oli tinggi",
      "Akselerasi motor Honda matic jauh lebih responsif",
      "Konsumsi BBM lebih irit karena friksi mesin sangat rendah",
      "Disertai barcode QR otentifikasi keaslian AHM",
    ],
    recommendedBikes: [
      "Honda BeAT FI / eSP / Deluxe / Street",
      "Honda Scoopy FI / eSP / Prestige",
      "Honda Vario 110 / 125 / 150",
      "Honda Genio 110",
      "Honda Spacy FI",
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 380,
    warranty: "Garansi Resmi AHM 100% Asli",
  },
  {
    id: "oil-4",
    slug: "top1-formula-mc-20w50-800ml",
    name: "TOP 1 Formula MC SAE 20W-50 JASO MA2 800ML",
    brand: "TOP 1",
    category: "Bebek & Kopling",
    sae: "20W-50",
    volume: "0.8 Liter",
    oilType: "Synthetic Blend High Viscosity",
    jasoApi: "API SJ / JASO MA2",
    price: "Rp 78.000",
    numericPrice: 78000,
    image: top1Formula,
    description: "Oli motor kopling 4 tak dengan viskositas kental 20W-50, meredam getaran mesin berumur dan mencegah selip kopling.",
    fullDescription:
      "TOP 1 Formula MC 20W-50 dirancang khusus untuk motor bebek dan motor kopling manual harian yang membutuhkan lapisan pelumas lebih tebal. Molekul pelumas Synthetic Blend melindungi dinding silinder dari keausan berat saat mengangkut beban berat atau menempuh rute jarak jauh tanpa henti. Memastikan kopling basah bekerja mantap tanpa selip.",
    specifications: {
      "Tingkat Kekentalan": "SAE 20W-50 Heavy Duty",
      "Kapasitas Isi": "800 ml (0.8 Liter)",
      "Standarisasi API": "API SJ",
      "Standarisasi JASO": "JASO MA2 (Kopling Basah Manual)",
      "Base Oil": "Synthetic Blend Extra Film Protection",
      "Interval Penggantian": "2.500 - 3.000 Km",
    },
    features: [
      "Lapisan oli tebal meredam suara kasar pada mesin berjarak tempuh tinggi",
      "Mencegah kopling selip saat membawa muatan berat dan menanjak",
      "Ketahanan oksidasi andal pada iklim tropis yang panas",
      "Harga sangat bersahabat dengan performa teruji",
      "Pilihan favorit ojek online dan pekerja harian",
    ],
    recommendedBikes: [
      "Honda Supra X 125 / Revo Absolute / Blade",
      "Honda Karisma 125 / Grand / Legenda",
      "Yamaha Jupiter Z / Vega R / Vega Force",
      "Suzuki Smash Titan / Shogun 125",
      "Honda MegaPro / GL Pro / Tiger",
    ],
    inStock: true,
    rating: 4.8,
    reviewsCount: 195,
    warranty: "Garansi 100% Produk Original",
  },
  {
    id: "oil-5",
    slug: "shell-advance-ax7-10w40",
    name: "SHELL Advance AX7 10W-40 Synthetic Technology",
    brand: "Shell",
    category: "Bebek & Kopling",
    sae: "10W-40",
    volume: "0.8 Liter",
    oilType: "Synthetic Technology Active Cleansing",
    jasoApi: "API SM / JASO MA2",
    price: "Rp 90.000",
    numericPrice: 90000,
    image: shellAdvance,
    description: "Oli Shell Advance dengan teknologi pembersih aktif, getaran mesin lebih halus dan tenaga tetap padat.",
    fullDescription:
      "Shell Advance AX7 10W-40 mengadopsi teknologi Synthetic Based yang dipadukan dengan Shell Active Cleansing Technology. Formula ini membantu menjaga kebersihan mesin motor secara konsisten, mencegah partikel kotoran saling melekat untuk membentuk endapan, serta menghasilkan kontrol perpindahan gigi yang sangat halus dan menyenangkan.",
    specifications: {
      "Tingkat Kekentalan": "SAE 10W-40",
      "Kapasitas Isi": "800 ml (0.8 Liter)",
      "Standarisasi API": "API SM",
      "Standarisasi JASO": "JASO MA2",
      "Base Oil": "Synthetic Technology Shell PurePlus",
      "Interval Penggantian": "3.000 - 4.000 Km",
    },
    features: [
      "Teknologi Active Cleansing membersihkan kerak mesin otomatis",
      "Meredam getaran dan kebisingan mesin motor",
      "Perpindahan gigi kopling manual terasa halus dan enteng",
      "Menjaga tenaga mesin tetap stabil di kecepatan tinggi",
      "Dilengkapi segel Shell Jam Jar autentik anti-pemalsuan",
    ],
    recommendedBikes: [
      "Yamaha Jupiter MX 135 / MX King 150",
      "Yamaha Vixion / Byson",
      "Honda CB150R / Verza 150 / Supra GTR 150",
      "Suzuki Satria FU 150 / GSX-S150",
      "Kawasaki W175 / Athlete 125",
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 260,
    warranty: "Garansi Asli Shell Indonesia",
  },
  {
    id: "oil-6",
    slug: "motul-scooter-le-10w30-08l",
    name: "MOTUL Scooter LE 10W-30 0.8L JASO MB",
    brand: "Motul",
    category: "Matic",
    sae: "10W-30",
    volume: "0.8 Liter",
    oilType: "HC-Tech Synthetic Matic",
    jasoApi: "API SJ / JASO MB",
    price: "Rp 71.000",
    numericPrice: 71000,
    image: motulLeScooter,
    description: "Oli Motul Scooter LE kemasan 0.8L dengan aditif anti-wear untuk perlindungan mesin matic 110cc - 125cc.",
    fullDescription:
      "Motul Scooter LE 10W-30 0.8L dibuat khusus bagi jutaan pengguna motor matic di Indonesia yang membutuhkan takaran pas 800ml tanpa sisa. Dibuat dengan formula HC-Tech yang menghadirkan daya pelumasan unggul, mencegah overheat di kemacetan, serta menjaga ruang bakar tetap bersih dan bebas kerak.",
    specifications: {
      "Tingkat Kekentalan": "SAE 10W-30 Low Viscosity",
      "Kapasitas Isi": "800 ml (0.8 Liter)",
      "Standarisasi API": "API SJ",
      "Standarisasi JASO": "JASO MB (Khusus Skuter Matic)",
      "Base Oil": "HC-Tech Hydrocracked Synthetic",
      "Interval Penggantian": "3.000 Km",
    },
    features: [
      "Takaran pas 0.8L untuk Honda BeAT, Scoopy, dan Vario 125",
      "Tarikan gas lebih enteng dan responsif sejak starter pertama",
      "Suhu mesin tetap stabil saat macet panjang",
      "Harga sangat ekonomis untuk kualitas merek Motul",
      "Gratis biaya jasa penggantian oli di MotoFix Pro",
    ],
    recommendedBikes: [
      "Honda BeAT All Series (Karbu & Injeksi)",
      "Honda Scoopy All Series",
      "Honda Vario 110 & 125",
      "Honda Genio 110",
      "Yamaha Mio M3 / Fino 125 / Gear 125",
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 340,
    warranty: "Garansi Toko & Motul Resmi",
  },
];

export function getOilBySlug(slug: string): OilItem | undefined {
  return oilsData.find((o) => o.slug === slug);
}
