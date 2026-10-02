import { useEffect, useState } from "react";
import {
  FiSearch,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiEye,
  FiSlash,
} from "react-icons/fi";
import { toast } from "sonner";
import { getBookings, type Booking, type Loaded } from "./dashboard.service.ts";

import {
  Badge,
  DetailList,
  EmptyState,
  Modal,
  PageHeader,
  card,
  fmtDate,
  inputCls,
  money,
  nights,
  outlineBtn,
  primaryBtn,
} from "./ui.tsx";

const FILTERS = ["All", "Confirmed", "Pending", "Completed", "Cancelled"];

// Exact columns:
// Booking ID | Room | Stay | Guests | Amount | Status | Actions
const cols =
  "lg:grid-cols-[7rem_minmax(140px,1fr)_minmax(170px,1.2fr)_5rem_7rem_8rem_9rem]";

const Bookings = () => {
  const [data, setData] = useState<Loaded<Booking> | null>(null);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState<Booking | null>(null);

  useEffect(() => {
    getBookings().then(setData);
  }, []);

  if (!data) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-indigo-600" />
          <p className="text-sm text-gray-500">Loading bookings...</p>
        </div>
      </div>
    );
  }

  const today = new Date().toISOString().slice(0, 10);
  const all = data.items;

  const list = all.filter(
    (b) =>
      (status === "All" || b.status.toLowerCase() === status.toLowerCase()) &&
      `${b.id} ${b.room} ${b.roomType}`.toLowerCase().includes(q.toLowerCase()),
  );

  const isUpcoming = (b: Booking) =>
    b.checkOut >= today && !/cancel|complet/i.test(b.status);

  const groups: [string, Booking[]][] = [
    ["Upcoming Bookings", list.filter(isUpcoming)],
    ["Past Bookings", list.filter((b) => !isUpcoming(b))],
  ];

  const stats = [
    {
      label: "Total Bookings",
      value: all.length,
      icon: FiCalendar,
      bg: "bg-indigo-50",
      color: "text-indigo-600",
    },
    {
      label: "Upcoming",
      value: all.filter(isUpcoming).length,
      icon: FiClock,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      label: "Completed",
      value: all.filter((b) => /complet/i.test(b.status)).length,
      icon: FiCheckCircle,
      bg: "bg-emerald-50",
      color: "text-emerald-600",
    },
    {
      label: "Cancelled",
      value: all.filter((b) => /cancel/i.test(b.status)).length,
      icon: FiXCircle,
      bg: "bg-red-50",
      color: "text-red-600",
    },
  ];

  const canCancel = (b: Booking) => isUpcoming(b);

  const cancel = () =>
    toast.info(
      "Cancellation will be available once it's connected to the backend.",
    );

  const row = (b: Booking) => (
    <li
      key={b.id}
      className={`${card} overflow-hidden p-4 lg:grid lg:items-center lg:gap-4 lg:rounded-none lg:border-0 lg:border-b lg:border-gray-100 lg:shadow-none lg:hover:bg-gray-50/70 ${cols}`}
    >
      {/* Booking ID */}
      <div className="flex items-center justify-between lg:block">
        <span className="text-xs text-gray-500 lg:hidden">Booking ID</span>

        <span className="font-semibold text-gray-900">{b.id}</span>
      </div>

      {/* Room */}
      <div className="mt-3 flex items-center justify-between lg:mt-0 lg:block">
        <span className="text-xs text-gray-500 lg:hidden">Room</span>

        <span className="text-right font-medium text-gray-900 lg:text-left">
          {b.room}
          <span className="block text-xs font-normal text-gray-500">
            {b.roomType}
          </span>
        </span>
      </div>

      {/* Stay */}
      <div className="mt-3 flex items-center justify-between lg:mt-0 lg:block">
        <span className="text-xs text-gray-500 lg:hidden">Stay</span>

        <span className="text-right text-sm text-gray-600 lg:text-left">
          {fmtDate(b.checkIn)}
          <span className="mx-1 text-gray-400">→</span>
          {fmtDate(b.checkOut)}
        </span>
      </div>

      {/* Guests */}
      <div className="mt-3 flex items-center justify-between lg:mt-0 lg:justify-center">
        <span className="text-xs text-gray-500 lg:hidden">Guests</span>

        <span className="font-medium text-gray-700">
          {b.guests}
          <span className="ml-1 text-xs font-normal text-gray-500 lg:hidden">
            guests
          </span>
        </span>
      </div>

      {/* Amount */}
      <div className="mt-3 flex items-center justify-between lg:mt-0 lg:justify-end">
        <span className="text-xs text-gray-500 lg:hidden">Amount</span>

        <span className="whitespace-nowrap font-semibold text-gray-900">
          {money(b.amount)}
        </span>
      </div>

      {/* Status */}
      <div className="mt-3 flex items-center justify-between lg:mt-0">
        <span className="text-xs text-gray-500 lg:hidden">Status</span>

        <div className="flex flex-wrap justify-end gap-1.5 lg:flex-col lg:items-start">
          <Badge status={b.status} />
          <Badge status={b.paymentStatus} />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center justify-end gap-2 border-t border-gray-100 pt-3 lg:mt-0 lg:border-0 lg:pt-0">
        <button
          type="button"
          className={`${outlineBtn} h-9 px-3 text-xs`}
          onClick={() => setSelected(b)}
        >
          <FiEye className="text-sm" />
          View
        </button>

        {canCancel(b) && (
          <button
            type="button"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-red-200 bg-white px-3 text-xs font-medium text-red-600 transition hover:bg-red-50"
            onClick={cancel}
          >
            <FiSlash className="text-sm" />
            Cancel
          </button>
        )}
      </div>
    </li>
  );

  return (
    <div className="space-y-7">
      {/* Header */}
      <PageHeader
        title="My Bookings"
        text="Manage your upcoming and past reservations."
      />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, bg, color }) => (
          <div key={label} className={`${card} p-4 transition hover:shadow-md`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{value}</p>

                <p className="mt-1 text-xs font-medium text-gray-500">
                  {label}
                </p>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${color}`}
              >
                <Icon className="text-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div
        className={`${card} flex flex-col gap-3 p-4 sm:flex-row sm:items-center`}
      >
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            className={`${inputCls} h-10 pl-9`}
            placeholder="Search by booking ID, room or room type"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <select
          className={`${inputCls} h-10 sm:w-48`}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {FILTERS.map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
      </div>

      {/* Empty */}
      {all.length === 0 ? (
        <div className={card}>
          <EmptyState
            icon={FiSearch}
            title="No bookings yet"
            text="Your reservations will appear here."
            to="/dashboard/rooms"
            cta="Find a Room"
          />
        </div>
      ) : list.length === 0 ? (
        <div
          className={`${card} flex flex-col items-center justify-center px-6 py-12 text-center`}
        >
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <FiSearch className="text-xl" />
          </span>

          <h3 className="font-semibold text-gray-900">No bookings found</h3>

          <p className="mt-1 text-sm text-gray-500">
            No bookings match your current search or filter.
          </p>

          {(q || status !== "All") && (
            <button
              type="button"
              className={`${outlineBtn} mt-4`}
              onClick={() => {
                setQ("");
                setStatus("All");
              }}
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        groups
          .filter(([, items]) => items.length > 0)
          .map(([title, items]) => (
            <section key={title}>
              {/* Section Header */}
              <div className="mb-3 flex items-center gap-2">
                <h3 className="text-base font-semibold text-gray-900">
                  {title}
                </h3>

                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                  {items.length}
                </span>
              </div>

              {/* Table */}
              <ul className="space-y-3 lg:space-y-0 lg:overflow-hidden lg:rounded-xl lg:border lg:border-gray-200 lg:bg-white lg:shadow-sm">
                {/* Table Header */}
                <li
                  className={`hidden bg-gray-50 px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500 lg:grid lg:items-center lg:gap-4 ${cols}`}
                >
                  <span>Booking ID</span>
                  <span>Room</span>
                  <span>Stay</span>
                  <span className="text-center">Guests</span>
                  <span className="text-right">Amount</span>
                  <span>Status</span>
                  <span className="text-right">Actions</span>
                </li>

                {items.map(row)}
              </ul>
            </section>
          ))
      )}

      {/* Details Modal */}
      {selected && (
        <Modal
          title={`Booking ${selected.id}`}
          onClose={() => setSelected(null)}
        >
          <div className="mb-6 rounded-xl bg-gray-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs text-gray-500">Booking ID</p>

                <p className="mt-1 font-semibold text-gray-900">
                  {selected.id}
                </p>
              </div>

              <Badge status={selected.status} />
            </div>
          </div>

          <DetailList
            rows={[
              ["Room", selected.room],
              ["Room type", selected.roomType],
              ["Check-in", fmtDate(selected.checkIn)],
              ["Check-out", fmtDate(selected.checkOut)],
              ["Nights", nights(selected.checkIn, selected.checkOut)],
              ["Guests", selected.guests],
              ["Amount", money(selected.amount)],
              ["Booking status", <Badge status={selected.status} />],
              ["Payment", <Badge status={selected.paymentStatus} />],
            ]}
          />

          <div className="mt-7 flex flex-col-reverse gap-2 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              className={outlineBtn}
              onClick={() => setSelected(null)}
            >
              Close
            </button>

            {canCancel(selected) && (
              <button type="button" className={primaryBtn} onClick={cancel}>
                <FiSlash />
                Cancel Booking
              </button>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Bookings;
