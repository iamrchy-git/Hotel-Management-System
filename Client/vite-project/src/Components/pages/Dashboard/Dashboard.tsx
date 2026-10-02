import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCalendar,
  FiCreditCard,
  FiHome,
  FiList,
  FiSearch,
} from "react-icons/fi";
import {
  displayName,
  getBookings,
  getNotices,
  getUser,
  type Booking,
  type Notice,
} from "./dashboard.service.ts";
import {
  Avatar,
  Badge,
  DetailList,
  EmptyState,
  Photo,
  card,
  fmtDate,
  money,
  noticeIcon,
  primaryBtn,
} from "./ui.tsx";

const Dashboard = () => {
  const [data, setData] = useState<{
    bookings: Booking[];
    notices: Notice[];
  } | null>(null);
  const user = getUser();

  useEffect(() => {
    Promise.all([getBookings(), getNotices()]).then(([b, n]) =>
      setData({ bookings: b.items, notices: n.items }),
    );
  }, []);

  if (!data) return <p className="text-sm text-gray-500">Loading…</p>;

  const { bookings, notices } = data;
  const today = new Date().toISOString().slice(0, 10);
  const active = bookings.filter((b) => !/cancel/i.test(b.status));
  const upcoming = active
    .filter((b) => b.checkIn > today)
    .sort((a, b) => a.checkIn.localeCompare(b.checkIn))[0];
  const current = active.find((b) => b.checkIn <= today && b.checkOut >= today);
  const pending = active
    .filter((b) => b.paymentStatus.toLowerCase() === "pending")
    .reduce((sum, b) => sum + b.amount, 0);
  const recent = [...bookings]
    .sort((a, b) => b.checkIn.localeCompare(a.checkIn))
    .slice(0, 5);

  const stats = [
    {
      label: "Upcoming Booking",
      value: upcoming ? fmtDate(upcoming.checkIn) : "None",
      icon: FiCalendar,
    },
    { label: "Total Bookings", value: bookings.length, icon: FiList },
    {
      label: "Current Stay",
      value: current ? current.room : "None",
      icon: FiHome,
    },
    { label: "Pending Payment", value: money(pending), icon: FiCreditCard },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome + primary action */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {user && <Avatar user={user} className="h-14 w-14 text-xl" />}
          <div>
            <h2 className="text-2xl font-bold">
              Welcome back, {user ? displayName(user) : "Guest"}
            </h2>
            <p className="text-sm text-gray-500">
              Here's an overview of your stays.
            </p>
          </div>
        </div>
        <Link to="/dashboard/rooms" className={primaryBtn}>
          <FiSearch /> Find a Room
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className={`${card} p-4`}>
            <Icon className="mb-3 text-xl text-indigo-600" />
            <p className="truncate text-lg font-semibold">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Upcoming stay */}
          <section className={`${card} overflow-hidden`}>
            {upcoming ? (
              <div className="sm:flex">
                <Photo
                  src={upcoming.image}
                  alt={upcoming.room}
                  className="h-44 w-full sm:h-auto sm:w-56"
                />
                <div className="flex-1 space-y-4 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-indigo-600">
                        Upcoming Stay
                      </p>
                      <p className="text-lg font-semibold">{upcoming.room}</p>
                      <p className="text-sm text-gray-500">
                        {upcoming.roomType}
                      </p>
                    </div>
                    <Badge status={upcoming.status} />
                  </div>
                  <DetailList
                    cols="grid-cols-2 sm:grid-cols-4"
                    rows={[
                      ["Check-in", fmtDate(upcoming.checkIn)],
                      ["Check-out", fmtDate(upcoming.checkOut)],
                      ["Guests", upcoming.guests],
                      ["Amount", money(upcoming.amount)],
                    ]}
                  />
                  <Link to="/dashboard/stay" className={primaryBtn}>
                    View Details
                  </Link>
                </div>
              </div>
            ) : (
              <EmptyState
                icon={FiSearch}
                title="Find a room for your next stay"
                to="/dashboard/rooms"
                cta="Browse available rooms"
              />
            )}
          </section>

          {/* Recent bookings */}
          <section className={card}>
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <h3 className="font-semibold">Recent Bookings</h3>
              <Link
                to="/dashboard/bookings"
                className="text-sm text-indigo-600 hover:underline"
              >
                View all
              </Link>
            </div>
            {recent.length === 0 && (
              <p className="p-5 text-sm text-gray-500">No bookings yet.</p>
            )}
            <ul className="divide-y divide-gray-100 text-sm">
              {recent.length > 0 && (
                <li className="hidden grid-cols-7 gap-3 px-5 py-2 text-xs text-gray-500 md:grid">
                  <span>Booking ID</span>
                  <span>Room</span>
                  <span>Check-in</span>
                  <span>Check-out</span>
                  <span>Amount</span>
                  <span>Status</span>
                  <span />
                </li>
              )}
              {recent.map((b) => (
                <li
                  key={b.id}
                  className="flex flex-col gap-1 px-5 py-3 md:grid md:grid-cols-7 md:items-center md:gap-3"
                >
                  <span className="font-medium">{b.id}</span>
                  <span>{b.room}</span>
                  <span className="text-gray-600">
                    {fmtDate(b.checkIn)}
                    <span className="md:hidden"> → {fmtDate(b.checkOut)}</span>
                  </span>
                  <span className="hidden text-gray-600 md:block">
                    {fmtDate(b.checkOut)}
                  </span>
                  <span>{money(b.amount)}</span>
                  <Badge status={b.status} />
                  <Link
                    to="/dashboard/bookings"
                    className="mt-1 inline-flex items-center gap-1 text-indigo-600 hover:underline md:mt-0 md:justify-end"
                  >
                    View <FiArrowRight />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Notifications */}
        <section className={`${card} h-fit p-5`}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Recent Notifications</h3>
            <Link
              to="/dashboard/notifications"
              className="text-sm text-indigo-600 hover:underline"
            >
              View all
            </Link>
          </div>
          <ul className="space-y-4 text-sm">
            {notices.slice(0, 3).map((n) => {
              const Icon = noticeIcon[n.type];
              return (
                <li key={n.id} className="flex gap-3">
                  <Icon className="mt-0.5 shrink-0 text-indigo-600" />
                  <div>
                    <p>{n.text}</p>
                    <p className="text-xs text-gray-500">{n.time}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
