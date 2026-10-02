import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiCheck, FiHome, FiCalendar } from "react-icons/fi";
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

  if (!bookings) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-gray-500">Loading…</p>
      </div>
    );
  }

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

        <div className={`${card} overflow-hidden`}>
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

      {/* Main Stay Card */}
      <section className={`${card} overflow-hidden`}>
        {/* Room Image */}
        <div className="relative">
          <Photo
            src={stay.image}
            alt={stay.room}
            className="h-56 w-full sm:h-64 md:h-72"
          />

          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur">
              {current ? "Current Stay" : "Upcoming Stay"}
            </span>
          </div>
        </div>

        {/* Stay Information */}
        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
                Your Room
              </p>

              <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                {stay.room}
              </h3>

              <p className="mt-1 text-sm text-gray-500">{stay.roomType}</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FiHome className="text-indigo-500" />
              <span>Room {stay.roomNumber ?? "—"}</span>
            </div>
          </div>

          {/* Stay Dates */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                <FiCalendar className="text-indigo-500" />
                Check-in
              </div>

              <p className="mt-2 font-semibold text-gray-900">
                {fmtDate(stay.checkIn)}
              </p>

              <p className="mt-0.5 text-xs text-gray-500">{CHECK_IN_TIME}</p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                <FiCalendar className="text-indigo-500" />
                Check-out
              </div>

              <p className="mt-2 font-semibold text-gray-900">
                {fmtDate(stay.checkOut)}
              </p>

              <p className="mt-0.5 text-xs text-gray-500">{CHECK_OUT_TIME}</p>
            </div>
          </div>

          {/* Details */}
          <div className="mt-6">
            <DetailList
              cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
              rows={[
                ["Room number", stay.roomNumber ?? "—"],
                ["Guests", stay.guests],
                ["Duration", `${nights(stay.checkIn, stay.checkOut)} nights`],
                ["Total", money(stay.amount)],
                ["Booking status", <Badge status={stay.status} />],
                ["Payment", <Badge status={stay.paymentStatus} />],
              ]}
            />
          </div>

          {/* Action */}
          <div className="mt-6 border-t border-gray-100 pt-5">
            <Link
              to="/dashboard/bookings"
              className={`${outlineBtn} w-full sm:w-auto`}
            >
              View Booking Details
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={`${card} overflow-hidden`}>
        <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
          <h3 className="font-semibold text-gray-900">Stay Timeline</h3>

          <p className="mt-1 text-xs text-gray-500">
            Track your reservation progress
          </p>
        </div>

        <div className="p-5 sm:p-6">
          <ol className="grid grid-cols-4 gap-1 sm:gap-3">
            {steps.map(([label, sub], i) => (
              <li
                key={label}
                className="relative flex flex-col items-center text-center"
              >
                {/* Connector */}
                {i < steps.length - 1 && (
                  <span
                    className={`absolute left-[calc(50%+18px)] right-[calc(-50%+18px)] top-4 hidden h-0.5 sm:block ${
                      flags[i] ? "bg-indigo-600" : "bg-gray-200"
                    }`}
                  />
                )}

                {/* Step Circle */}
                <span
                  className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition sm:h-9 sm:w-9 ${
                    flags[i]
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : i === next
                        ? "border-indigo-600 bg-white text-indigo-600"
                        : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {flags[i] ? <FiCheck /> : i + 1}
                </span>

                {/* Label */}
                <span className="mt-3 text-[11px] font-semibold text-gray-800 sm:text-sm">
                  {label}
                </span>

                {/* Date */}
                <span className="mt-1 text-[10px] text-gray-400 sm:text-xs">
                  {sub || (i === 0 ? "Confirmed" : "")}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
};

export default Stay;
