"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Bell,
  CheckCircle2,
  Clock,
  Wrench,
  XCircle,
  CalendarCheck,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import {
  getUserNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  BookingNotification,
} from "@/lib/bookings";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<BookingNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function refresh() {
    const user = getCurrentUser();
    const notifs = getUserNotifications(user?.username);
    setNotifications(notifs);
    setUnreadCount(getUnreadNotificationCount(user?.username));
  }

  useEffect(() => {
    refresh();

    function handleUpdate() {
      refresh();
    }

    window.addEventListener("motofix_notification_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("motofix_notification_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleMarkRead(id: string) {
    markNotificationAsRead(id);
    refresh();
  }

  function handleMarkAllRead() {
    const user = getCurrentUser();
    markAllNotificationsAsRead(user?.username);
    refresh();
  }

  function getStatusIcon(status: BookingNotification["status"]) {
    switch (status) {
      case "Selesai":
        return <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
      case "Diproses":
        return <Wrench className="w-4 h-4 text-blue-600 shrink-0" />;
      case "Dikonfirmasi":
        return <CalendarCheck className="w-4 h-4 text-indigo-600 shrink-0" />;
      case "Dibatalkan":
        return <XCircle className="w-4 h-4 text-red-600 shrink-0" />;
      default:
        return <Clock className="w-4 h-4 text-amber-600 shrink-0" />;
    }
  }

  function getStatusBadge(status: BookingNotification["status"]) {
    switch (status) {
      case "Selesai":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "Diproses":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Dikonfirmasi":
        return "bg-indigo-100 text-indigo-800 border-indigo-300";
      case "Dibatalkan":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-amber-100 text-amber-800 border-amber-300";
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors"
        title="Notifikasi Status Booking"
        aria-label="Notifikasi"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-black text-white shadow-md animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 sm:right-auto sm:-left-36 md:right-0 md:left-auto mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-slate-200 z-50 overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 to-blue-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-sm">Notifikasi Booking</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-red-500 text-[10px] font-bold">
                  {unreadCount} Baru
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-[11px] text-blue-200 hover:text-white flex items-center gap-1 font-semibold"
              >
                <Check className="w-3.5 h-3.5" />
                Tandai Dibaca
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <Bell className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                <p className="text-xs font-semibold">Belum Ada Notifikasi</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Saat Anda booking servis atau ban, pembaruan status dari admin akan muncul di sini.
                </p>
              </div>
            ) : (
              notifications.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleMarkRead(item.id)}
                  className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer text-left ${
                    !item.read ? "bg-blue-50/50" : ""
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5">{getStatusIcon(item.status)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${getStatusBadge(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {item.timestamp}
                        </span>
                      </div>
                      <h4
                        className={`text-xs font-bold leading-tight ${
                          !item.read ? "text-slate-900" : "text-slate-700"
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        {item.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
            <Link
              href="/pesanan"
              onClick={() => setIsOpen(false)}
              className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1.5 w-full justify-center py-1"
            >
              Lihat Riwayat &amp; Status Booking Lengkap
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
