import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiCheck, FiHome } from "react-icons/fi";
import {
  CHECK_IN_TIME,
  CHECK_OUT_TIME,
  getBookings,
  type Booking,
} from "./dashboard.service.ts";
import {
  Badge,
  DetailList,
  EmptyState,
  PageHeader,
  Photo,
  card,
  fmtDate,
  money,
  nights,
  outlineBtn,
} from "./ui.tsx";

const Stay = () => {
  const [bookings, setBookings] = useState<Booking[] | null>(null);

  useEffect(() => {
    getBookings().then((r) => setBookings(r.items));
  }, []);

  if (!bookings) return <p className="text-sm text-gray-500">Loading…</p>;

  const today = new Date().toISOString().slice(0, 10);
  // First non-cancelled booking that hasn't ended: either happening now or the next upcoming one
  const stay = bookings
    .filter((b) => !/cancel/i.test(b.status) && b.checkOut >= today)
    .sort((a, b) => a.checkIn.localeCompare(b.checkIn))[0];

  if (!stay) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="My Stay"
          text="Details for your current or upcoming stay."
        />
        <div className={card}>
          <EmptyState
            icon={FiHome}
            title="You don't have an upcoming stay"
            text="Book a room to see your stay details here."
            to="/dashboard/rooms"
            cta="Find a Room"
          />
        </div>
      </div>
    );
  }

  const current = stay.checkIn <= today;
  const flags = [
    !/pending/i.test(stay.status),
    today >= stay.checkIn,
    today > stay.checkIn,
    today > stay.checkOut,
  ];
  const next = flags.indexOf(false);
  const steps = [
    ["Booking Confirmed", ""],
    ["Check-in", fmtDate(stay.checkIn)],
    ["Current Stay", ""],
    ["Check-out", fmtDate(stay.checkOut)],
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Stay"
        text="Details for your current or upcoming stay."
      />

      <section className={`${card} overflow-hidden`}>
        <Photo
          src={stay.image}
          alt={stay.room}
          className="h-52 w-full md:h-64"
        />
        <div className="space-y-5 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold">{stay.room}</h3>
              <p className="text-sm text-gray-500">{stay.roomType}</p>
            </div>
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
              {current ? "Current Stay" : "Upcoming Stay"}
            </span>
          </div>
          <DetailList
            cols="grid-cols-2 sm:grid-cols-3"
            rows={[
              ["Room number", stay.roomNumber ?? "—"],
              ["Check-in", `${fmtDate(stay.checkIn)} · ${CHECK_IN_TIME}`],
              ["Check-out", `${fmtDate(stay.checkOut)} · ${CHECK_OUT_TIME}`],
              ["Guests", stay.guests],
              ["Duration", `${nights(stay.checkIn, stay.checkOut)} nights`],
              ["Total", money(stay.amount)],
              ["Booking status", <Badge status={stay.status} />],
              ["Payment", <Badge status={stay.paymentStatus} />],
            ]}
          />
          <Link to="/dashboard/bookings" className={outlineBtn}>
            View Booking Details
          </Link>
        </div>
      </section>

      <section className={`${card} p-5`}>
        <h3 className="mb-5 font-semibold">Stay Timeline</h3>
        <ol className="grid grid-cols-4 gap-2 text-center text-xs sm:text-sm">
          {steps.map(([label, sub], i) => (
            <li key={label} className="flex flex-col items-center gap-2">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold ${
                  flags[i]
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : i === next
                      ? "border-indigo-600 text-indigo-600"
                      : "border-gray-300 text-gray-400"
                }`}
              >
                {flags[i] ? <FiCheck /> : i + 1}
              </span>
              <span className="font-medium">{label}</span>
              <span className="text-gray-500">{sub}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};

export default Stay;
