import axios from "axios";

const API = "http://localhost:3900/api";

/* ---------- Types ---------- */
// ASSUMED user fields: Login.tsx stores `user` as an untyped object. Adjust here if yours differ.
export interface User {
  name?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: string;
  profileImage?: string;
}

export interface Booking {
  id: string;
  room: string;
  roomNumber?: string;
  roomType: string;
  image?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  amount: number;
  status: string;
  paymentStatus: string;
}

export interface Room {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
  capacity: number;
  amenities: string[];
  available: boolean;
  image?: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  date: string;
  amount: number;
  method: string;
  status: string;
}

export interface Notice {
  id: string;
  type: "booking" | "payment" | "stay";
  text: string;
  time: string;
  read: boolean;
}

export interface Loaded<T> {
  items: T[];
  demo: boolean;
}

// Placeholder hotel policy times until the backend provides them
export const CHECK_IN_TIME = "2:00 PM";
export const CHECK_OUT_TIME = "11:00 AM";

/* ---------- Auth helpers (reuse the existing localStorage keys from Login.tsx) ---------- */
export const getToken = () => localStorage.getItem("accessToken");

export const getUser = (): User | null => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

export const logout = () =>
  ["accessToken", "refreshToken", "user"].forEach((k) =>
    localStorage.removeItem(k),
  );

export const displayName = (u: User) =>
  u.fullName ||
  u.name ||
  [u.firstName, u.lastName].filter(Boolean).join(" ") ||
  u.email?.split("@")[0] ||
  "Guest";

/* ---------- Response mappers ----------
   ASSUMED backend field names. When the real responses are known, fix only these three. */
/* eslint-disable @typescript-eslint/no-explicit-any */
const toBooking = (b: any): Booking => ({
  id: String(b._id ?? b.id ?? ""),
  room:
    b.room?.name ?? (b.room?.roomNumber ? `Room ${b.room.roomNumber}` : "Room"),
  roomNumber: b.room?.roomNumber ? String(b.room.roomNumber) : undefined,
  roomType: b.room?.type ?? b.room?.roomType ?? "Standard",
  image: b.room?.image ?? b.room?.images?.[0],
  checkIn: String(b.checkInDate ?? b.checkIn ?? "").slice(0, 10),
  checkOut: String(b.checkOutDate ?? b.checkOut ?? "").slice(0, 10),
  guests: b.guests ?? b.numberOfGuests ?? 1,
  amount: b.totalAmount ?? b.totalPrice ?? 0,
  status: b.status ?? "Pending",
  paymentStatus: b.paymentStatus ?? "Pending",
});

const toRoom = (r: any): Room => ({
  id: String(r._id ?? r.id ?? ""),
  name: r.name ?? (r.roomNumber ? `Room ${r.roomNumber}` : "Room"),
  type: r.type ?? r.roomType ?? "Standard",
  description: r.description ?? "",
  price: r.pricePerNight ?? r.price ?? 0,
  capacity: r.capacity ?? 2,
  amenities: r.amenities ?? [],
  available:
    r.isAvailable ??
    String(r.status ?? "available").toLowerCase() === "available",
  image: r.image ?? r.images?.[0],
});

const toPayment = (p: any): Payment => ({
  id: String(p._id ?? p.id ?? ""),
  bookingId: String(p.booking?._id ?? p.booking ?? p.bookingId ?? ""),
  date: String(p.createdAt ?? p.paymentDate ?? "").slice(0, 10),
  amount: p.amount ?? 0,
  method: p.method ?? p.paymentMethod ?? "—",
  status: p.status ?? "Pending",
});

/** One GET helper for every list. Falls back to placeholder data if the request fails. */
async function load<T>(
  path: string,
  map: (x: any) => T,
  fallback: T[],
): Promise<Loaded<T>> {
  try {
    const res = await axios.get(`${API}${path}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const list = res.data?.data ?? res.data;
    return { items: Array.isArray(list) ? list.map(map) : [], demo: false };
  } catch {
    return { items: fallback, demo: true };
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/* ---------- Minimal placeholder data (used only when the API fails) ---------- */
const day = (n: number) =>
  new Date(Date.now() + n * 864e5).toISOString().slice(0, 10);

const MOCK_BOOKINGS: Booking[] = [
  {
    id: "BK-1002",
    room: "Room 204",
    roomNumber: "204",
    roomType: "Deluxe King",
    checkIn: day(12),
    checkOut: day(15),
    guests: 2,
    amount: 540,
    status: "Confirmed",
    paymentStatus: "Pending",
  },
  {
    id: "BK-0981",
    room: "Room 110",
    roomNumber: "110",
    roomType: "Standard Twin",
    checkIn: day(-40),
    checkOut: day(-37),
    guests: 2,
    amount: 330,
    status: "Completed",
    paymentStatus: "Paid",
  },
  {
    id: "BK-0950",
    room: "Room 305",
    roomNumber: "305",
    roomType: "Executive Suite",
    checkIn: day(-90),
    checkOut: day(-88),
    guests: 1,
    amount: 640,
    status: "Cancelled",
    paymentStatus: "Refunded",
  },
];

const MOCK_ROOMS: Room[] = [
  {
    id: "r1",
    name: "Standard Twin",
    type: "Standard Twin",
    description: "Comfortable twin room with city views and a work desk.",
    price: 110,
    capacity: 2,
    amenities: ["Wi-Fi", "Air conditioning"],
    available: true,
  },
  {
    id: "r2",
    name: "Deluxe King",
    type: "Deluxe King",
    description:
      "Spacious king room with a private balcony and breakfast included.",
    price: 180,
    capacity: 2,
    amenities: ["Wi-Fi", "Breakfast", "Balcony"],
    available: true,
  },
  {
    id: "r3",
    name: "Executive Suite",
    type: "Executive Suite",
    description: "Separate living area, premium bedding and pool access.",
    price: 320,
    capacity: 3,
    amenities: ["Wi-Fi", "Breakfast", "Pool access", "Air conditioning"],
    available: false,
  },
  {
    id: "r4",
    name: "Family Room",
    type: "Family Room",
    description: "Roomy layout for families with two double beds.",
    price: 240,
    capacity: 4,
    amenities: ["Wi-Fi", "Breakfast", "Air conditioning"],
    available: true,
  },
];

const MOCK_PAYMENTS: Payment[] = [
  {
    id: "PAY-310",
    bookingId: "BK-1002",
    date: day(0),
    amount: 540,
    method: "Card",
    status: "Pending",
  },
  {
    id: "PAY-301",
    bookingId: "BK-0981",
    date: day(-40),
    amount: 330,
    method: "Card",
    status: "Paid",
  },
  {
    id: "PAY-288",
    bookingId: "BK-0950",
    date: day(-90),
    amount: 640,
    method: "Card",
    status: "Refunded",
  },
];

const MOCK_NOTICES: Notice[] = [
  {
    id: "n1",
    type: "booking",
    text: "Your booking BK-1002 is confirmed",
    time: "Today",
    read: false,
  },
  {
    id: "n2",
    type: "stay",
    text: "Upcoming check-in in 12 days",
    time: "Today",
    read: false,
  },
  {
    id: "n3",
    type: "payment",
    text: "Payment successful for BK-0981",
    time: "40 days ago",
    read: true,
  },
  {
    id: "n4",
    type: "booking",
    text: "Booking BK-0950 was cancelled",
    time: "90 days ago",
    read: true,
  },
];

/* ---------- Public API (UI pages only call these) ---------- */
// NOTE: /bookings and /payments may return every guest's records; filter by the logged-in guest when wiring up.
export const getBookings = () => load("/bookings", toBooking, MOCK_BOOKINGS);
export const getRooms = () => load("/rooms", toRoom, MOCK_ROOMS); // later: "/rooms/available" + dates
export const getPayments = () => load("/payments", toPayment, MOCK_PAYMENTS);
// No notifications endpoint exists yet, so this returns placeholders. Swap for load(...) when one does.
export const getNotices = async (): Promise<Loaded<Notice>> => ({
  items: MOCK_NOTICES,
  demo: true,
});
