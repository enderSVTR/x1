import { supabase } from "@/lib/supabase";

export type BookingStatus = "Menunggu" | "Diproses" | "Dikonfirmasi" | "Selesai" | "Dibatalkan";

export interface BookingData {
  id: string;
  name: string;
  phone: string;
  motorcycle: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
  userId?: string;
  username?: string;
  adminNote?: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface BookingNotification {
  id: string;
  bookingId: string;
  userId?: string;
  customerName: string;
  title: string;
  message: string;
  status: BookingStatus;
  timestamp: string;
  read: boolean;
}

type BookingRow = {
  id: string;
  booking_code: string;
  user_id: string | null;
  customer_name: string;
  phone: string;
  motorcycle: string;
  service: string;
  appointment_date: string;
  appointment_time: string;
  notes: string | null;
  admin_note: string | null;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
};

let bookingCache: BookingData[] = [];
let notificationCache: BookingNotification[] = [];

function formatTimestamp(value: string) {
  return new Date(value).toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" });
}

function fromRow(row: BookingRow): BookingData {
  return {
    id: row.booking_code,
    name: row.customer_name,
    phone: row.phone,
    motorcycle: row.motorcycle,
    service: row.service,
    date: row.appointment_date,
    time: row.appointment_time.slice(0, 5),
    notes: row.notes ?? undefined,
    userId: row.user_id ?? undefined,
    adminNote: row.admin_note ?? undefined,
    status: row.status,
    createdAt: formatTimestamp(row.created_at),
    updatedAt: formatTimestamp(row.updated_at),
  };
}

function dispatchUpdate() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event("motofix_notification_updated"));
}

export function getBookings(): BookingData[] {
  return bookingCache;
}

export async function loadBookings(): Promise<BookingData[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  bookingCache = ((data ?? []) as BookingRow[]).map(fromRow);
  return bookingCache;
}

export async function saveBooking(input: Omit<BookingData, "id" | "createdAt" | "updatedAt" | "status" | "userId"> & { userId?: string }): Promise<BookingData> {
  const { data, error } = await supabase
    .from("bookings")
    .insert({
      user_id: input.userId ?? null,
      customer_name: input.name.trim(),
      phone: input.phone.trim(),
      motorcycle: input.motorcycle.trim(),
      service: input.service,
      appointment_date: input.date,
      appointment_time: input.time,
      notes: input.notes?.trim() || null,
    })
    .select("*")
    .single();
  if (error) throw error;
  const booking = fromRow(data as BookingRow);
  bookingCache = [booking, ...bookingCache];
  dispatchUpdate();
  return booking;
}

export async function updateBookingStatus(id: string, status: BookingStatus, adminNote?: string): Promise<void> {
  const updates: { status: BookingStatus; admin_note?: string | null } = { status };
  if (adminNote !== undefined) updates.admin_note = adminNote || null;
  const { error } = await supabase.from("bookings").update(updates).eq("booking_code", id);
  if (error) throw error;
  await loadBookings();
  dispatchUpdate();
}

export async function deleteBooking(id: string): Promise<void> {
  const { error } = await supabase.from("bookings").delete().eq("booking_code", id);
  if (error) throw error;
  bookingCache = bookingCache.filter((booking) => booking.id !== id);
  dispatchUpdate();
}

function notificationFromRow(row: any): BookingNotification {
  return {
    id: row.id,
    bookingId: row.booking?.booking_code ?? row.booking_id,
    userId: row.user_id ?? undefined,
    customerName: row.customer_name,
    title: row.title,
    message: row.message,
    status: row.status,
    timestamp: formatTimestamp(row.created_at),
    read: Boolean(row.read_at),
  };
}

export function getUserNotifications(): BookingNotification[] {
  return notificationCache;
}

export async function loadUserNotifications(): Promise<BookingNotification[]> {
  const { data, error } = await supabase
    .from("notifications")
    .select("*, booking:bookings(booking_code)")
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) throw error;
  notificationCache = (data ?? []).map(notificationFromRow);
  return notificationCache;
}

export function getUnreadNotificationCount(): number {
  return notificationCache.filter((item) => !item.read).length;
}

export async function markNotificationAsRead(id: string): Promise<void> {
  const { error } = await supabase.from("notifications").update({ read_at: new Date().toISOString() }).eq("id", id);
  if (error) throw error;
  notificationCache = notificationCache.map((item) => item.id === id ? { ...item, read: true } : item);
  dispatchUpdate();
}

export async function markAllNotificationsAsRead(): Promise<void> {
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!authData.user) return;
  const { error } = await supabase.from("notifications").update({ read_at: new Date().toISOString() }).eq("user_id", authData.user.id).is("read_at", null);
  if (error) throw error;
  notificationCache = notificationCache.map((item) => ({ ...item, read: true }));
  dispatchUpdate();
}
