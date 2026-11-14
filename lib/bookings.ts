export interface BookingData {
  id: string;
  name: string;
  phone: string;
  motorcycle: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
  username?: string;
  adminNote?: string;
  status: "Menunggu" | "Diproses" | "Dikonfirmasi" | "Selesai" | "Dibatalkan";
  createdAt: string;
  updatedAt?: string;
}

export interface BookingNotification {
  id: string;
  bookingId: string;
  username?: string;
  customerName: string;
  title: string;
  message: string;
  status: "Menunggu" | "Diproses" | "Dikonfirmasi" | "Selesai" | "Dibatalkan";
  timestamp: string;
  read: boolean;
}

const BOOKINGS_KEY = "motofix_bookings";
const NOTIFICATIONS_KEY = "motofix_notifications";

const INITIAL_BOOKINGS: BookingData[] = [
  {
    id: "BK-1001",
    name: "Ahmad Pratama",
    phone: "081298765432",
    motorcycle: "Honda Vario 150",
    service: "Ganti Ban - MICHELIN TL PILOT STREET 110",
    date: "2026-10-07",
    time: "09:00",
    notes: "Tolong sekalian cek tekanan angin dan balancing ban depan.",
    status: "Diproses",
    createdAt: "2026-10-06 14:20",
    updatedAt: "2026-10-06 14:35",
  },
  {
    id: "BK-1002",
    name: "Rian Hidayat",
    phone: "085712348899",
    motorcycle: "Yamaha NMAX 155",
    service: "Ganti Ban - PLANETO GOLD TL MT5 120",
    date: "2026-10-07",
    time: "10:00",
    notes: "Ban belakang sudah gundul, mau ganti dan isi nitrogen.",
    status: "Dikonfirmasi",
    createdAt: "2026-10-06 15:05",
    updatedAt: "2026-10-06 15:10",
  },
  {
    id: "BK-1003",
    name: "Budi Santoso",
    phone: "081377889900",
    motorcycle: "Honda BeAT FI",
    service: "Ganti Oli - Honda AHM Oil SPX2",
    date: "2026-10-08",
    time: "13:00",
    notes: "Servis berkala + ganti oli mesin rutin bulanan.",
    status: "Selesai",
    createdAt: "2026-10-05 11:30",
    updatedAt: "2026-10-05 13:45",
  },
];

const INITIAL_NOTIFICATIONS: BookingNotification[] = [
  {
    id: "notif-1",
    bookingId: "BK-1003",
    customerName: "Budi Santoso",
    title: "Servis Selesai!",
    message: "Servis motor Honda BeAT FI (Ganti Oli - Honda AHM Oil SPX2) telah SELESAI dikerjakan dan siap diambil.",
    status: "Selesai",
    timestamp: "2026-10-05 13:45",
    read: false,
  },
  {
    id: "notif-2",
    bookingId: "BK-1001",
    customerName: "Ahmad Pratama",
    title: "Booking Sedang Diproses",
    message: "Pesanan ban motor Anda (#BK-1001) sedang disiapkan dan diproses oleh teknisi bengkel.",
    status: "Diproses",
    timestamp: "2026-10-06 14:35",
    read: false,
  },
];

function getFormattedNow(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}`;
}

export function getBookings(): BookingData[] {
  if (typeof window === "undefined") {
    return INITIAL_BOOKINGS;
  }

  const saved = window.localStorage.getItem(BOOKINGS_KEY);
  if (!saved) {
    window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify(INITIAL_BOOKINGS));
    return INITIAL_BOOKINGS;
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : INITIAL_BOOKINGS;
  } catch {
    return INITIAL_BOOKINGS;
  }
}

export function saveBooking(
  data: Omit<BookingData, "id" | "createdAt" | "status">
): BookingData {
  const currentBookings = getBookings();
  const formattedDate = getFormattedNow();

  const newBooking: BookingData = {
    ...data,
    id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
    status: "Menunggu",
    createdAt: formattedDate,
  };

  const updated = [newBooking, ...currentBookings];
  if (typeof window !== "undefined") {
    window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));

    // Create initial notification
    createNotification({
      bookingId: newBooking.id,
      username: newBooking.username,
      customerName: newBooking.name,
      title: "Booking Berhasil Terkirim",
      message: `Pesanan booking Anda (#${newBooking.id}) untuk motor ${newBooking.motorcycle} sedang menunggu konfirmasi admin.`,
      status: "Menunggu",
    });
  }

  return newBooking;
}

export function updateBookingStatus(
  id: string,
  newStatus: BookingData["status"],
  adminNote?: string
): void {
  const currentBookings = getBookings();
  const formattedDate = getFormattedNow();

  let targetBooking: BookingData | undefined;

  const updated = currentBookings.map((b) => {
    if (b.id === id) {
      targetBooking = {
        ...b,
        status: newStatus,
        adminNote: adminNote !== undefined ? adminNote : b.adminNote,
        updatedAt: formattedDate,
      };
      return targetBooking;
    }
    return b;
  });

  if (typeof window !== "undefined") {
    window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));

    if (targetBooking) {
      let title = `Update Booking #${targetBooking.id}`;
      let message = `Status pesanan motor ${targetBooking.motorcycle} (${targetBooking.service}) telah diperbarui.`;

      if (newStatus === "Diproses") {
        title = `Booking Diproses! (#${targetBooking.id})`;
        message = `Pesanan/servis ${targetBooking.service} untuk motor ${targetBooking.motorcycle} sedang DIPROSES oleh teknisi bengkel.`;
      } else if (newStatus === "Dikonfirmasi") {
        title = `Booking Dikonfirmasi! (#${targetBooking.id})`;
        message = `Jadwal kedatangan Anda pada ${targetBooking.date} jam ${targetBooking.time} WIB telah DIKONFIRMASI oleh admin. Silakan datang ke bengkel tepat waktu.`;
      } else if (newStatus === "Selesai") {
        title = `Servis Selesai! (#${targetBooking.id})`;
        message = `Pengerjaan servis ${targetBooking.service} pada motor ${targetBooking.motorcycle} telah SELESAI! Motor Anda siap diambil di bengkel.`;
      } else if (newStatus === "Dibatalkan") {
        title = `Booking Dibatalkan (#${targetBooking.id})`;
        message = `Mohon maaf, jadwal booking Anda (#${targetBooking.id}) telah DIBATALKAN oleh admin bengkel. Silakan hubungi kami untuk info lebih lanjut.`;
      }

      if (adminNote) {
        message += ` (Catatan Admin: ${adminNote})`;
      }

      createNotification({
        bookingId: targetBooking.id,
        username: targetBooking.username,
        customerName: targetBooking.name,
        title,
        message,
        status: newStatus,
      });
    }

    window.dispatchEvent(new Event("motofix_notification_updated"));
  }
}

export function deleteBooking(id: string): void {
  const currentBookings = getBookings();
  const updated = currentBookings.filter((b) => b.id !== id);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("motofix_notification_updated"));
  }
}

// ========================
// NOTIFICATIONS SYSTEM
// ========================

export function getNotifications(): BookingNotification[] {
  if (typeof window === "undefined") {
    return INITIAL_NOTIFICATIONS;
  }

  const saved = window.localStorage.getItem(NOTIFICATIONS_KEY);
  if (!saved) {
    window.localStorage.setItem(
      NOTIFICATIONS_KEY,
      JSON.stringify(INITIAL_NOTIFICATIONS)
    );
    return INITIAL_NOTIFICATIONS;
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : INITIAL_NOTIFICATIONS;
  } catch {
    return INITIAL_NOTIFICATIONS;
  }
}

export function getUserNotifications(
  username?: string,
  customerName?: string
): BookingNotification[] {
  const allNotifs = getNotifications();
  if (!username && !customerName) {
    return allNotifs;
  }

  return allNotifs.filter((n) => {
    if (username && n.username && n.username.toLowerCase() === username.toLowerCase()) {
      return true;
    }
    if (
      customerName &&
      n.customerName.toLowerCase() === customerName.toLowerCase()
    ) {
      return true;
    }
    // If not claimed by specific username, show to user
    return !n.username;
  });
}

export function getUnreadNotificationCount(
  username?: string,
  customerName?: string
): number {
  return getUserNotifications(username, customerName).filter((n) => !n.read)
    .length;
}

export function createNotification(
  data: Omit<BookingNotification, "id" | "timestamp" | "read">
): BookingNotification {
  const all = getNotifications();
  const newNotif: BookingNotification = {
    ...data,
    id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: getFormattedNow(),
    read: false,
  };

  const updated = [newNotif, ...all];
  if (typeof window !== "undefined") {
    window.localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("motofix_notification_updated"));
  }

  return newNotif;
}

export function markNotificationAsRead(id: string): void {
  const all = getNotifications();
  const updated = all.map((n) => (n.id === id ? { ...n, read: true } : n));

  if (typeof window !== "undefined") {
    window.localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("motofix_notification_updated"));
  }
}

export function markAllNotificationsAsRead(username?: string): void {
  const all = getNotifications();
  const updated = all.map((n) => {
    if (!username || !n.username || n.username.toLowerCase() === username.toLowerCase()) {
      return { ...n, read: true };
    }
    return n;
  });

  if (typeof window !== "undefined") {
    window.localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("motofix_notification_updated"));
  }
}
