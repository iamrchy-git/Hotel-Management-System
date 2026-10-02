import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiCalendar,
  FiCreditCard,
  FiHome,
  FiList,
  FiSearch,
} from "react-icons/fi";
import {
  displayName,
  getBookings,
  getUser,
  type Booking,
} from "./dashboard.service.ts";
import { Avatar, card, fmtDate, money, primaryBtn } from "./ui.tsx";

const Dashboard = () => {
  const [data, setData] = useState<{
    bookings: Booking[];
  } | null>(null);

  const user = getUser();

  useEffect(() => {
    getBookings().then((b) => setData({ bookings: b.items }));
  }, []);

  if (!data) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-gray-500">Loading…</p>
      </div>
    );
  }

  const { bookings } = data;

  const today = new Date().toISOString().slice(0, 10);

  const active = bookings.filter((b) => !/cancel/i.test(b.status));

  const upcoming = active
    .filter((b) => b.checkIn > today)
    .sort((a, b) => a.checkIn.localeCompare(b.checkIn))[0];

  const current = active.find((b) => b.checkIn <= today && b.checkOut >= today);

  const pending = active
    .filter((b) => b.paymentStatus.toLowerCase() === "pending")
    .reduce((sum, b) => sum + b.amount, 0);

  const stats = [
    {
      label: "Upcoming Booking",
      value: upcoming ? fmtDate(upcoming.checkIn) : "None",
      icon: FiCalendar,
    },
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: FiList,
    },
    {
      label: "Current Stay",
      value: current ? current.room : "None",
      icon: FiHome,
    },
    {
      label: "Pending Payment",
      value: money(pending),
      icon: FiCreditCard,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div
        className={`${card} flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6`}
      >
        <div className="flex items-center gap-4">
          {user && (
            <Avatar user={user} className="h-14 w-14 text-lg sm:h-16 sm:w-16" />
          )}

          <div className="min-w-0">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              Welcome back, {user ? displayName(user) : "Guest"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Here's an overview of your stays.
            </p>
          </div>
        </div>

        <Link to="/dashboard/rooms" className={`${primaryBtn} shrink-0`}>
          <FiSearch />
          Find a Room
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className={`${card} p-4 sm:p-5`}>
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <Icon className="text-lg" />
              </div>
            </div>

            <div className="mt-4">
              <p className="truncate text-lg font-semibold text-gray-900 sm:text-xl">
                {value}
              </p>

              <p className="mt-1 text-xs text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Current / Upcoming Stay */}
      <div className={`${card} overflow-hidden`}>
        <div className="border-b border-gray-200 px-5 py-4">
          <h3 className="font-semibold text-gray-900">Stay Overview</h3>

          <p className="mt-1 text-xs text-gray-500">
            Your current and upcoming reservation
          </p>
        </div>

        {current || upcoming ? (
          <div className="grid divide-y divide-gray-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <div className="p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                {current ? "Current Stay" : "Upcoming Stay"}
              </p>

              <p className="mt-2 text-lg font-semibold text-gray-900">
                {current?.room || upcoming?.room}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {current?.roomType || upcoming?.roomType}
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                <FiCalendar className="text-indigo-500" />

                <span>
                  {fmtDate(current?.checkIn || upcoming!.checkIn)}
                  {" → "}
                  {fmtDate(current?.checkOut || upcoming!.checkOut)}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between p-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Booking Details
                </p>

                <div className="mt-3 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Guests</p>
                    <p className="mt-1 font-medium text-gray-900">
                      {current?.guests || upcoming?.guests}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Amount</p>
                    <p className="mt-1 font-medium text-gray-900">
                      {money(current?.amount || upcoming?.amount || 0)}
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/dashboard/bookings"
                className="mt-5 text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                View all bookings →
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-5 py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <FiCalendar className="text-xl" />
            </div>

            <p className="mt-3 font-medium text-gray-900">No upcoming stay</p>

            <p className="mt-1 text-sm text-gray-500">
              Find a room and make your next reservation.
            </p>

            <Link to="/dashboard/rooms" className={`${primaryBtn} mt-4`}>
              <FiSearch />
              Find a Room
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
