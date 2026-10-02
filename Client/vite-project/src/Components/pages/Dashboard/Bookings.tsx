import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
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
const cols = "lg:grid-cols-[6rem_1.4fr_1.7fr_3.5rem_5rem_7rem_auto]";

const Bookings = () => {
  const [data, setData] = useState<Loaded<Booking> | null>(null);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState<Booking | null>(null);

  useEffect(() => {
    getBookings().then(setData);
  }, []);

  if (!data) return <p className="text-sm text-gray-500">Loading…</p>;

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
    ["Total", all.length],
    ["Upcoming", all.filter(isUpcoming).length],
    ["Completed", all.filter((b) => /complet/i.test(b.status)).length],
    ["Cancelled", all.filter((b) => /cancel/i.test(b.status)).length],
  ];

  const canCancel = (b: Booking) => isUpcoming(b);
  const cancel = () =>
    toast.info(
      "Cancellation will be available once it's connected to the backend.",
    );

  const row = (b: Booking) => (
    <li
      key={b.id}
      className={`${card} flex flex-col gap-2 p-4 text-sm lg:grid lg:items-center lg:gap-4 lg:rounded-none lg:border-0 lg:shadow-none ${cols}`}
    >
      <span className="font-medium">{b.id}</span>
      <span>
        {b.room}
        <span className="block text-xs text-gray-500">{b.roomType}</span>
      </span>
      <span className="text-gray-600">
        {fmtDate(b.checkIn)} → {fmtDate(b.checkOut)}
      </span>
      <span className="text-gray-600">
        {b.guests}
        <span className="lg:hidden"> guests</span>
      </span>
      <span className="font-medium">{money(b.amount)}</span>
      <span className="flex flex-wrap gap-1 lg:flex-col">
        <Badge status={b.status} />
        <Badge status={b.paymentStatus} />
      </span>
      <span className="mt-1 flex flex-wrap gap-2 lg:mt-0 lg:justify-end">
        <button className={outlineBtn} onClick={() => setSelected(b)}>
          View Details
        </button>
        {canCancel(b) && (
          <button
            className="rounded-md px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
            onClick={cancel}
          >
            Cancel
          </button>
        )}
      </span>
    </li>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Bookings"
        text="Manage your upcoming and past reservations."
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map(([label, n]) => (
          <div key={label} className={`${card} p-4`}>
            <p className="text-2xl font-semibold">{n}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className={`${inputCls} pl-9`}
            placeholder="Search by booking ID or room"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <select
          className={`${inputCls} sm:w-44`}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {FILTERS.map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
      </div>

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
        <p className="py-6 text-center text-sm text-gray-500">
          No bookings match your search or filter.
        </p>
      ) : (
        groups
          .filter(([, items]) => items.length > 0)
          .map(([title, items]) => (
            <section key={title}>
              <h3 className="mb-3 font-semibold">{title}</h3>
              <ul className="space-y-3 lg:space-y-0 lg:divide-y lg:divide-gray-100 lg:overflow-hidden lg:rounded-xl lg:border lg:border-gray-200 lg:bg-white lg:shadow-sm">
                <li
                  className={`hidden bg-gray-50 px-4 py-2 text-xs text-gray-500 lg:grid lg:gap-4 ${cols}`}
                >
                  <span>Booking ID</span>
                  <span>Room</span>
                  <span>Stay</span>
                  <span>Guests</span>
                  <span>Amount</span>
                  <span>Status</span>
                  <span />
                </li>
                {items.map(row)}
              </ul>
            </section>
          ))
      )}

      {selected && (
        <Modal
          title={`Booking ${selected.id}`}
          onClose={() => setSelected(null)}
        >
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
          <div className="mt-6 flex justify-end gap-2">
            <button className={outlineBtn} onClick={() => setSelected(null)}>
              Close
            </button>
            {canCancel(selected) && (
              <button className={primaryBtn} onClick={cancel}>
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
