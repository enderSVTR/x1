import { StaticImageData } from "next/image";
import cairanAntiBocor from "../foto Sparepart/JOSSZ CAIRAN ANTI BOCOR (Rp.32.000).png";
import airFilter from "../foto Sparepart/X-GRADE AIR FILTER HONDA BEAT - SCOOPY KARBU(Rp.58.000).png";
import kampasRemPcx from "../foto Sparepart/X-GRADE KAMPAS REM PCX (Rp.65.000).png";
import rollerStandard from "../foto Sparepart/X-GRADE ROLLER STANDARD(Rp.60.000).png";
import sealMaster from "../foto Sparepart/X-GRADE Seal Master(Rp.22.000).png";
import sliderCvt from "../foto Sparepart/X-GRADE Slider CVT(Rp.30.000).png";
import vBeltMatic from "../foto Sparepart/X-GRADE V-BELT MATIC 110-150CC(Rp.90.000).png";
import accuNtz6v from "../foto Sparepart/X-SMART ACCU NTZ6V - 5AH(Rp.280.000).png";
import minyakShock from "../foto Sparepart/X-TEN MINYAK SHOCK (FORK)(Rp.48.000).png";
import throttleBodyCleaner from "../foto Sparepart/X-TEN THROTTLE BODY INTAKE CLEANER (Rp.35.000).png";
import busiDenso from "../foto Sparepart/DENSO BUSI MOTOR STANDARD(Rp.27.000).png";
import rantaiChainKit from "../foto Sparepart/X-GRADE Rantai Sepeda Motor Chain Kit(Rp.155.000).png";

export interface SparepartItem {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: "Mesin" | "CVT & Transmisi" | "Rem & Kaki-kaki" | "Kelistrikan" | "Perawatan";
  price: string;
  numericPrice: number;
  image: StaticImageData;
  description: string;
  fullDescription: string;
  specification: Record<string, string>;
  features: string[];
  compatibility: string[];
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  warranty: string;
}

export const sparepartsData: SparepartItem[] = [
  {
    id: "sp-1",
    slug: "jossz-cairan-anti-bocor",
    name: "JOSSZ Cairan Anti Bocor Ban Tubeless",
    brand: "JOSSZ",
    category: "Perawatan",
    price: "Rp 32.000",
    numericPrice: 32000,
    image: cairanAntiBocor,
    description: "Cairan anti bocor untuk ban motor tubeless, otomatis menutup kebocoran paku dan menambah rasa aman berkendara.",
    fullDescription:
      "JOSSZ Cairan Anti Bocor merupakan formula polimer elastis berteknologi tinggi yang dimasukkan ke dalam rongga ban tubeless motor. Begitu ban tertusuk paku atau benda tajam hingga diameter 6mm, cairan ini langsung terdorong oleh tekanan udara untuk membekukan dan menambal lubang secara instan dan permanen tanpa perlu membuka ban.",
    specification: {
      "Isi Bersih": "350 ml",
      "Kesesuaian Ban": "Ban Tubeless Ring 12 - 18",
      "Masa Aktif Formula": "12 - 18 Bulan",
      "Toleransi Lubang": "Hingga diameter 6 mm",
      "Keamanan Velg": "Anti Karat & Korosi pada Velg",
    },
    features: [
      "Menutup lubang paku secara instan saat ban berputar",
      "Formula ramah lingkungan dan tidak merusak kompon ban",
      "Mencegah ban kempes mendadak di tengah perjalanan",
      "Aman untuk velg aluminium dan velg alloy",
      "Gratis injeksi ke dalam ban di bengkel MotoFix Pro",
    ],
    compatibility: [
      "Semua Ban Tubeless Motor Matic (BeAT, Vario, NMAX, Aerox, Scoopy)",
      "Semua Ban Tubeless Motor Sport (R15, CBR, Ninja, Vixion)",
      "Semua Ban Tubeless Motor Bebek",
    ],
    inStock: true,
    rating: 4.8,
    reviewsCount: 142,
    warranty: "Garansi Toko 1 Bulan",
  },
  {
    id: "sp-2",
    slug: "x-grade-air-filter-beat-scoopy",
    name: "X-GRADE Air Filter Honda BeAT & Scoopy Karbu",
    brand: "X-GRADE",
    category: "Mesin",
    price: "Rp 58.000",
    numericPrice: 58000,
    image: airFilter,
    description: "Filter udara X-Grade dengan serat rapat presisi untuk Honda Beat & Scoopy Karbu, menjaga pembakaran tetap optimal.",
    fullDescription:
      "Filter Udara X-GRADE dirancang menggunakan media kertas serat mikro sintetis berdaya saring tinggi. Mampu menyaring debu mikron dan kotoran jalanan secara efisien tanpa menghambat debit pasokan udara segar ke dalam karburator. Hasilnya, tarikan mesin tetap responsif, bensin lebih hemat, dan ruang bakar terhindar dari kerak kotoran.",
    specification: {
      "Material Filter": "Kertas Serat Sintetis Berpelumas Khusus",
      "Rangka": "Plastik ABS Tebal Tahan Panas",
      "Tipe Motor": "Karburator 110cc",
      "Interval Ganti": "8.000 - 10.000 Km",
    },
    features: [
      "Daya saring hingga 99% partikel debu berbahaya",
      "Aliran udara lancar membuat akselerasi motor lebih enteng",
      "Mengurangi konsumsi bahan bakar akibat campuran udara miskin",
      "Presisi OEM plug-and-play tanpa ubahan",
      "Pemasangan cepat hanya 5 menit oleh teknisi",
    ],
    compatibility: [
      "Honda BeAT Karburator (2008 - 2012)",
      "Honda Scoopy Karburator (2010 - 2013)",
      "Honda Spacy Karburator",
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 88,
    warranty: "Garansi Presisi Pasang",
  },
  {
    id: "sp-3",
    slug: "x-grade-kampas-rem-pcx",
    name: "X-GRADE Kampas Rem Depan / Belakang Honda PCX",
    brand: "X-GRADE",
    category: "Rem & Kaki-kaki",
    price: "Rp 65.000",
    numericPrice: 65000,
    image: kampasRemPcx,
    description: "Kampas rem non-asbestos X-Grade untuk Honda PCX, daya cengkeram pakem, tidak berisik, dan ramah piringan cakram.",
    fullDescription:
      "Kampas Rem X-GRADE PCX diproduksi dari formula komposit semi-metalik bebas asbes (Non-Asbestos) yang memiliki koefisien gesek stabil pada suhu tinggi. Memberikan sensasi pengereman yang empuk namun sangat menggigit, tidak menimbulkan bunyi berdecit saat basah, dan menjaga umur piringan cakram rem tetap rata dan awet.",
    specification: {
      "Material Gesek": "Semi-Metallic Non-Asbestos Premium",
      "Plat Dudukan": "Baja Karbon Tahan Tekanan Tinggi",
      "Tahan Panas": "Hingga 400°C",
      "Posisi": "Cakram Depan / Belakang PCX",
    },
    features: [
      "Daya pengereman responsif dan stabil di kecepatan tinggi",
      "Bebas asbes, tidak berdebu pekat dan tidak berdecit",
      "Aman untuk piringan disc brake, tidak mengikis piringan",
      "Tahan air dan tidak licin saat hujan deras",
      "Uji standar keselamatan berkendara internasional",
    ],
    compatibility: [
      "Honda PCX 150 (Lokal)",
      "Honda PCX 160 (CBS & ABS)",
      "Honda ADV 150 & ADV 160",
      "Honda Vario 160 (Tipe Rem Belakang Cakram)",
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 165,
    warranty: "Garansi Toko 3 Bulan",
  },
  {
    id: "sp-4",
    slug: "x-grade-roller-standard",
    name: "X-GRADE Roller Standard Motor Matic",
    brand: "X-GRADE",
    category: "CVT & Transmisi",
    price: "Rp 60.000",
    numericPrice: 60000,
    image: rollerStandard,
    description: "Roller transmisi CVT standar dengan bobot presisi, putaran halus, dan lapisan teflon tahan panas gesekan.",
    fullDescription:
      "Roller X-GRADE Standard dibuat dengan bobot gramasi yang sangat akurat dan seimbang di setiap butirnya. Dilapisi material Teflon self-lubricating kualitas tinggi yang meminimalkan keausan dan mencegah roller peyang lebih awal. Memastikan pergerakan puli depan CVT bekerja sempurna untuk tarikan awal yang bertenaga dan napas panjang di kecepatan tinggi.",
    specification: {
      "Bahan Inti": "Kuningan / Tembaga Padat",
      "Lapisan Luar": "Teflon Composite Anti Pecah & Tahan Panas",
      "Isi per Set": "6 Butir Roller",
      "Bobot": "Presisi standar pabrik (Gramasi OEM)",
    },
    features: [
      "Gramasi presisi 100% membuat bukaan puli CVT merata",
      "Lapisan teflon licin mencegah aus dan roller peyang",
      "Mengurangi getaran gredek pada tarikan awal",
      "Akselerasi motor matic kembali responsif seperti baru",
      "Gratis pengecekan rumah roller dan grease CVT",
    ],
    compatibility: [
      "Honda BeAT ESP, Street, Pop",
      "Honda Vario 110, 125, 150",
      "Honda Scoopy ESP & Prestige",
      "Yamaha Mio M3, Soul GT 125, Fino",
      "Yamaha NMAX 155 & Aerox 155",
    ],
    inStock: true,
    rating: 4.8,
    reviewsCount: 110,
    warranty: "Garansi Toko 3 Bulan",
  },
  {
    id: "sp-5",
    slug: "x-grade-seal-master",
    name: "X-GRADE Seal Master Rem Cakram Motor",
    brand: "X-GRADE",
    category: "Rem & Kaki-kaki",
    price: "Rp 22.000",
    numericPrice: 22000,
    image: sealMaster,
    description: "Seal master kit silinder rem hidrolik, mencegah kebocoran minyak rem dan mengembalikan tekanan rem yang ngempos.",
    fullDescription:
      "X-GRADE Seal Master Kit menggunakan karet sintetis NBR tahan minyak rem DOT 3 & DOT 4. Memiliki elastisitas tinggi dan pegas pendorong baja tahan karat yang mengembalikan piston master rem ke posisi awal dengan cepat. Sangat efektif mengatasi tuas rem yang terasa amblas, rem macet, atau rem blong akibat seal lama yang mengeras.",
    specification: {
      "Material Karet": "Nitrile Butadiene Rubber (NBR) Tahan Kimia",
      "Material Pegas": "Stainless Steel Spring",
      "Kompatibilitas Minyak Rem": "DOT 3, DOT 4, DOT 5.1",
      "Kelengkapan": "Piston, Seal, Spring, Circlip, Dust Boot",
    },
    features: [
      "Mencegah kebocoran minyak rem keluar master silinder",
      "Mengembalikan tuas rem yang ngempos atau terasa dalam",
      "Karet elastis dan tahan terhadap gesekan hidrolik berulang",
      "Pengereman kembali presisi dan aman seketika",
      "Pemasangan rapi dan bleeding minyak rem oleh mekanik ahli",
    ],
    compatibility: [
      "Honda BeAT, Vario, Scoopy, Supra X 125",
      "Yamaha Mio, Jupiter Z, Vixion, MX King",
      "Suzuki Satria FU, Smash, Shogun",
      "Kawasaki KLX 150, Ninja 150",
    ],
    inStock: true,
    rating: 4.7,
    reviewsCount: 74,
    warranty: "Garansi Pasang Bebas Bocor",
  },
  {
    id: "sp-6",
    slug: "x-grade-slider-cvt",
    name: "X-GRADE Slider Piece CVT Matic",
    brand: "X-GRADE",
    category: "CVT & Transmisi",
    price: "Rp 30.000",
    numericPrice: 30000,
    image: sliderCvt,
    description: "Slider piece peredam getaran rumah roller CVT, menghilangkan bunyi klotok-klotok dan getaran kasar.",
    fullDescription:
      "Slider CVT X-GRADE dibuat dari polimer komposit nilon berkekuatan tinggi yang elastis namun tahan terhadap gesekan konstan di dalam ruang transmisi CVT. Berfungsi sebagai bantalan penahan antara plat penutup roller dengan rumah puli bergerak. Penggantian slider yang sudah oblak akan langsung menghilangkan suara klotok-klotok di area CVT saat putaran idle.",
    specification: {
      "Bahan": "Engineering Nylon Polyamide 66",
      "Isi per Set": "3 Pcs Slider Piece",
      "Ketahanan Panas": "Hingga 220°C",
      "Warna": "Hitam Solid",
    },
    features: [
      "Menghilangkan suara klotok-klotok pada transmisi CVT",
      "Mencegah rumah roller oblak dan rusak prematur",
      "Material elastis tahan aus ribuan kilometer",
      "Pemasangan presisi tanpa oblak atau terlalu seret",
      "Komponen kecil penentu kenyamanan motor matic Anda",
    ],
    compatibility: [
      "Honda BeAT FI / ESP / Deluxe",
      "Honda Vario 125 / 150 / 160",
      "Honda PCX 150 / 160 & ADV 150 / 160",
      "Yamaha NMAX, Aerox, Lexi, Mio M3",
    ],
    inStock: true,
    rating: 4.8,
    reviewsCount: 95,
    warranty: "Garansi Toko 1 Bulan",
  },
  {
    id: "sp-7",
    slug: "x-grade-v-belt-matic",
    name: "X-GRADE V-Belt Drive Matic 110 - 150cc",
    brand: "X-GRADE",
    category: "CVT & Transmisi",
    price: "Rp 90.000",
    numericPrice: 90000,
    image: vBeltMatic,
    description: "V-Belt motor matic dengan serat aramid kevlar berkekuatan tinggi, transfer daya maksimal tanpa selip.",
    fullDescription:
      "V-Belt X-GRADE dirancang khusus untuk memenuhi torsi putaran tinggi motor matic modern. Diperkuat dengan anyaman benang aramid dan karet sintetis EPDM tahan suhu tinggi yang tidak mudah retak atau melar. Mengalirkan seluruh tenaga mesin ke roda belakang secara efisien, bebas selip saat akselerasi spontan maupun saat menanjak curam.",
    specification: {
      "Struktur Penguat": "Aramid Fiber Core Cord",
      "Senyawa Karet": "EPDM Compound Tahan Panas & Ozon",
      "Sudut Gigi": "Double Cog Precision Design",
      "Masa Pakai": "20.000 - 25.000 Km",
    },
    features: [
      "Daya tahan tarik luar biasa tahan beban berat dan tanjakan",
      "Karet EPDM tidak getas meskipun CVT dalam kondisi panas",
      "Gigi presisi meminimalkan gesekan dan selip pada puli",
      "Akselerasi motor lebih padat dan bertenaga",
      "Garansi penggantian jika putus dalam masa pakai wajar",
    ],
    compatibility: [
      "Honda BeAT, Scoopy, Spacy, Vario 110 (Karbu & FI)",
      "Honda Vario 125 & Vario 150 (All Generation)",
      "Honda PCX 150 & ADV 150",
      "Yamaha Mio J, Soul GT, Mio M3, Fino 125",
      "Yamaha NMAX 155 & Aerox 155",
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 153,
    warranty: "Garansi Toko 6 Bulan",
  },
  {
    id: "sp-8",
    slug: "x-smart-accu-ntz6v-5ah",
    name: "X-SMART Accu Aki Kering Bebas Perawatan NTZ6V - 5AH",
    brand: "X-SMART",
    category: "Kelistrikan",
    price: "Rp 280.000",
    numericPrice: 280000,
    image: accuNtz6v,
    description: "Aki kering Maintenance Free (MF) 12V 5Ah dengan Cold Cranking Amps tinggi, starter motor instan sekali pencet.",
    fullDescription:
      "Aki X-SMART NTZ6V 5AH merupakan aki motor kering berbasis teknologi AGM (Absorbent Glass Mat) bebas perawatan. Mengalirkan arus listrik stabil dengan CCA tinggi untuk menghidupkan motor injeksi dan fitur Idling Stop System (ISS). Dirancang kedap udara anti bocor, sehingga aman dipasang dalam berbagai posisi kemiringan tanpa resiko karat pada rangka motor.",
    specification: {
      "Voltase": "12 Volt",
      "Kapasitas Arus": "5 Ampere Hour (Ah) / 10HR",
      "CCA (Cold Cranking Amps)": "95 A",
      "Teknologi": "Valve Regulated Lead Acid (VRLA) AGM",
      "Dimensi": "113 x 70 x 105 mm",
    },
    features: [
      "Siap pakai langsung pasang, 100% bebas isi ulang air aki",
      "Arus starter kuat, motor langsung hidup sekali tekan",
      "Tahan terhadap getaran ekstrem jalan berlubang",
      "Cocok untuk motor dengan sistem ISS / SSS dan alarm",
      "Gratis cek voltase alternator pengisian di bengkel",
    ],
    compatibility: [
      "Honda Vario 125 / 150 / 160 (ISS)",
      "Honda PCX 150 / 160 & ADV 150 / 160",
      "Honda CBR150R & CB150R Streetfire",
      "Yamaha NMAX 155, Aerox 155, Lexi",
      "Yamaha R15, MT-15, XSR 155",
      "Suzuki Satria FU 150 & GSX-R150",
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 220,
    warranty: "Garansi Resmi 6 Bulan",
  },
  {
    id: "sp-9",
    slug: "x-ten-minyak-shock-fork",
    name: "X-TEN Minyak Shock Depan (Front Fork Oil)",
    brand: "X-TEN",
    category: "Rem & Kaki-kaki",
    price: "Rp 48.000",
    numericPrice: 48000,
    image: minyakShock,
    description: "Oli shockbreaker depan formula ester sintetis, redaman empuk, stabil di jalan rusak, dan tidak mudah berbusa.",
    fullDescription:
      "X-TEN Minyak Shock Fork diformulasikan dengan pelumas base oil sintetis dan aditif anti-foaming mutakhir. Mampu mempertahankan viskositas stabil meskipun bekerja keras meredam guncangan di medan berbatu atau bergelombang. Mencegah timbulnya gelembung udara dalam tabung suspensi sehingga rebound shock tetap konsisten dan tidak amblas.",
    specification: {
      "Isi Bersih": "2 x 100 ml (Sepasang Tabung Shock)",
      "Viskositas": "SAE 10W Fork Oil High Index",
      "Base Oil": "Synthetic Ester Blended",
      "Aditif": "Anti-Foam & Anti-Wear Seal Conditioner",
    },
    features: [
      "Redaman suspensi depan empuk dan tidak mental-mental",
      "Melindungi seal shock dari kekeringan dan kebocoran",
      "Stabil bermanuver di tikungan dan jalan bergelombang",
      "Formula anti-busa mencegah shock kehilangan daya redam",
      "Kemasan praktis pas untuk sepasang shock motor matic/bebek",
    ],
    compatibility: [
      "Semua Suspensi Depan Teleskopik Motor Matic",
      "Semua Suspensi Depan Motor Bebek",
      "Suspensi Depan Motor Sport 150cc",
    ],
    inStock: true,
    rating: 4.8,
    reviewsCount: 86,
    warranty: "Garansi Kualitas 100% Original",
  },
  {
    id: "sp-10",
    slug: "x-ten-throttle-body-cleaner",
    name: "X-TEN Throttle Body & Intake Cleaner Spray",
    brand: "X-TEN",
    category: "Perawatan",
    price: "Rp 35.000",
    numericPrice: 35000,
    image: throttleBodyCleaner,
    description: "Cairan pembersih karburator dan throttle body injeksi, merontokkan kerak karbon membandel dalam sekejap.",
    fullDescription:
      "X-TEN Throttle Body Cleaner merupakan aerosol solvent kuat yang melarutkan deposit kerak karbon, getah bensin (varnish), dan debu oli yang menempel pada katup throttle body, sensor intake, dan lubang injektor. Mengembalikan aliran udara murni ke ruang bakar agar langsam mesin stabil dan tarikan motor kembali enteng.",
    specification: {
      "Isi Bersih": "300 ml",
      "Tipe Aplikasi": "Aerosol Semprot dengan Selang Pipa Presisi",
      "Keamanan Sensor": "Aman untuk O2 Sensor & Catalytic Converter",
      "Daya Bersih": "Cepat Menguap Tanpa Residu Berminyak",
    },
    features: [
      "Merontokkan kerak karbon intake hanya dalam beberapa detik",
      "Mengatasi rpm motor yang ngedrop, hunting, atau brebet",
      "Menjaga efisiensi bahan bakar kembali optimal",
      "Aman untuk komponen karet dan sensor elektronik injeksi",
      "Dapat digunakan untuk servis rutin bulanan",
    ],
    compatibility: [
      "Semua Motor Injeksi (PGM-FI, YMJET-FI, Bluecore, FI Suzuki)",
      "Semua Motor Karburator",
    ],
    inStock: true,
    rating: 4.8,
    reviewsCount: 130,
    warranty: "Garansi Toko 1 Bulan",
  },
  {
    id: "sp-11",
    slug: "denso-busi-motor-standard",
    name: "DENSO Busi Motor Standard U22FSR-U",
    brand: "DENSO",
    category: "Mesin",
    price: "Rp 27.000",
    numericPrice: 27000,
    image: busiDenso,
    description: "Busi standar pabrik Denso dengan elektroda U-Groove, percikan api fokus, pengapian sempurna, dan mesin gampang distarter.",
    fullDescription:
      "Busi DENSO U22FSR-U adalah busi bawaan pabrik OEM terpercaya untuk jutaan motor di Indonesia. Dilengkapi teknologi alur 'U' (U-Groove) pada elektroda ground yang memungkinkan bola api berkembang lebih cepat dan sempurna saat bahan bakar dikompresi. Memberikan pembakaran yang bersih, tarikan bertenaga, dan emisi gas buang lebih ramah lingkungan.",
    specification: {
      "Tipe": "U22FSR-U Resistor Type",
      "Diameter Ulir": "10 mm",
      "Panjang Ulir": "19 mm",
      "Ukuran Kunci": "16 mm",
      "Elektroda": "Copper Core dengan Nickel Alloy Tip",
    },
    features: [
      "Teknologi U-Groove membuat percikan api lebih fokus",
      "Mesin gampang dihidupkan saat kondisi dingin pagi hari",
      "Pengapian sempurna mencegah busi cepat berkerak hitam",
      "Tipe resistor mencegah gangguan frekuensi pada ECU motor injeksi",
      "Produk 100% original Denso Japan Standard",
    ],
    compatibility: [
      "Honda BeAT Karbu & FI / eSP",
      "Honda Scoopy Karbu & FI / eSP",
      "Honda Vario 110 Karbu & FI",
      "Honda Spacy, Blade 110, Revo 110 FI",
      "Suzuki Address, Nex, Smash Titan",
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 310,
    warranty: "Garansi 100% Original",
  },
  {
    id: "sp-12",
    slug: "x-grade-rantai-motor-chain-kit",
    name: "X-GRADE Rantai Sepeda Motor Drive Chain Kit",
    brand: "X-GRADE",
    category: "CVT & Transmisi",
    price: "Rp 155.000",
    numericPrice: 155000,
    image: rantaiChainKit,
    description: "Paket gir set rantai motor bebek dan sport, plat rantai tebal anti mulur, presisi tinggi, dan tahan beban berat.",
    fullDescription:
      "Drive Chain Kit X-GRADE merupakan satu paket lengkap yang terdiri dari gir depan, gir belakang, dan rantai penggerak bertulang baja karbon tinggi. Gigi gir telah melalui proses heat treatment induksi sehingga sangat keras dan tahan gesekan ratusan ribu putaran roda. Rantai tidak mudah melar, minim kebisingan, dan menyalurkan tenaga mesin ke roda secara solid.",
    specification: {
      "Tipe Rantai": "Heavy Duty 428H Reinforced",
      "Material Gir": "High Carbon Steel S45C Induction Hardened",
      "Isi Paket": "Gir Depan + Gir Belakang + Rantai 428H",
      "Finishing": "Zinc Coated Anti Karat",
    },
    features: [
      "Plat rantai tebal 428H tidak mudah melar atau kendur",
      "Gigi gir mengeras tahan gesekan hingga 30.000 km",
      "Pemasangan presisi tanpa resiko rantai lompat dari gir",
      "Transfer tenaga ke roda belakang sangat padat dan responsif",
      "Gratis pemotongan dan pelumasan rantai saat pemasangan",
    ],
    compatibility: [
      "Honda Supra X 125, Revo Absolute, Karisma",
      "Yamaha Jupiter Z, Jupiter MX 135, Vega R",
      "Suzuki Smash, Shogun 125, Satria 2T",
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 178,
    warranty: "Garansi Toko 6 Bulan",
  },
];

export function getSparepartBySlug(slug: string): SparepartItem | undefined {
  return sparepartsData.find((s) => s.slug === slug);
}
