import { useEffect, useState } from "react";
import { FiFilter, FiUsers, FiX } from "react-icons/fi";
import { toast } from "sonner";
import { getRooms, type Loaded, type Room } from "./dashboard.service.ts";
import {
  Badge,
  EmptyState,
  PageHeader,
  Photo,
  card,
  inputCls,
  money,
  outlineBtn,
  primaryBtn,
} from "./ui.tsx";

const AMENITIES = [
  "Wi-Fi",
  "Breakfast",
  "Air conditioning",
  "Balcony",
  "Pool access",
];
const initial = {
  type: "All",
  maxPrice: 500,
  availableOnly: false,
  amenities: [] as string[],
};
const today = () => new Date().toISOString().slice(0, 10);

const Rooms = () => {
  const [data, setData] = useState<Loaded<Room> | null>(null);
  const [trip, setTrip] = useState({ checkIn: "", checkOut: "", guests: 1 });
  const [f, setF] = useState(initial);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    getRooms().then(setData);
  }, []);

  const rooms = data?.items ?? [];
  const types = ["All", ...new Set(rooms.map((r) => r.type))];
  const list = rooms.filter(
    (r) =>
      (f.type === "All" || r.type === f.type) &&
      r.price <= f.maxPrice &&
      (!f.availableOnly || r.available) &&
      r.capacity >= trip.guests &&
      f.amenities.every((a) => r.amenities.includes(a)),
  );

  const search = () => {
    if (trip.checkIn && trip.checkOut && trip.checkOut <= trip.checkIn) {
      toast.error("Check-out must be after check-in");
      return;
    }
    getRooms().then(setData); // later: pass trip dates to /api/rooms/available
  };
  const soon = () =>
    toast.info("Booking will be available once it's connected to the backend.");
  const toggleAmenity = (a: string) =>
    setF({
      ...f,
      amenities: f.amenities.includes(a)
        ? f.amenities.filter((x) => x !== a)
        : [...f.amenities, a],
    });

  if (!data) return <p className="text-sm text-gray-500">Loading…</p>;

  const panel = (
    <div className="space-y-5 text-sm">
      <label className="block">
        <span className="mb-1 block font-medium">Room type</span>
        <select
          className={inputCls}
          value={f.type}
          onChange={(e) => setF({ ...f, type: e.target.value })}
        >
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-1 block font-medium">
          Max price: {money(f.maxPrice)} / night
        </span>
        <input
          type="range"
          min={50}
          max={500}
          step={10}
          value={f.maxPrice}
          onChange={(e) => setF({ ...f, maxPrice: +e.target.value })}
          className="w-full accent-indigo-600"
        />
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          className="accent-indigo-600"
          checked={f.availableOnly}
          onChange={(e) => setF({ ...f, availableOnly: e.target.checked })}
        />
        Available only
      </label>
      <div>
        <p className="mb-2 font-medium">Amenities</p>
        <div className="space-y-2">
          {AMENITIES.map((a) => (
            <label key={a} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-indigo-600"
                checked={f.amenities.includes(a)}
                onChange={() => toggleAmenity(a)}
              />
              {a}
            </label>
          ))}
        </div>
      </div>
      <button className={`${outlineBtn} w-full`} onClick={() => setF(initial)}>
        Reset filters
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Find a Room"
        text="Search available rooms for your next stay."
      />
      <div
        className={`${card} grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_8rem_auto] lg:items-end`}
      >
        <label className="text-sm font-medium">
          Check-in
          <input
            type="date"
            min={today()}
            className={`${inputCls} mt-1`}
            value={trip.checkIn}
            onChange={(e) => setTrip({ ...trip, checkIn: e.target.value })}
          />
        </label>
        <label className="text-sm font-medium">
          Check-out
          <input
            type="date"
            min={trip.checkIn || today()}
            className={`${inputCls} mt-1`}
            value={trip.checkOut}
            onChange={(e) => setTrip({ ...trip, checkOut: e.target.value })}
          />
        </label>
        <label className="text-sm font-medium">
          Guests
          <input
            type="number"
            min={1}
            max={10}
            className={`${inputCls} mt-1`}
            value={trip.guests}
            onChange={(e) =>
              setTrip({ ...trip, guests: Math.max(1, +e.target.value) })
            }
          />
        </label>
        <button className={primaryBtn} onClick={search}>
          Search
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-6">
        <aside className={`${card} hidden h-fit p-5 lg:block`}>
          <h3 className="mb-4 font-semibold">Filters</h3>
          {panel}
        </aside>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-gray-500">{list.length} rooms found</p>
            <button
              className={`${outlineBtn} lg:hidden`}
              onClick={() => setDrawer(true)}
            >
              <FiFilter /> Filters
            </button>
          </div>

          {list.length === 0 ? (
            <div className={card}>
              <EmptyState
                icon={FiFilter}
                title="No rooms match your filters"
                text="Try adjusting the price, dates or amenities."
              />
            </div>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {list.map((r) => (
                <li
                  key={r.id}
                  className={`${card} flex flex-col overflow-hidden`}
                >
                  <Photo src={r.image} alt={r.name} className="h-44 w-full" />
                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold">{r.name}</h3>
                        <p className="text-xs text-gray-500">{r.type}</p>
                      </div>
                      <Badge
                        status={r.available ? "Available" : "Unavailable"}
                      />
                    </div>
                    <p className="line-clamp-2 text-sm text-gray-600">
                      {r.description}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-gray-500">
                      <FiUsers /> Up to {r.capacity} guests
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {r.amenities.map((a) => (
                        <span
                          key={a}
                          className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto space-y-3 border-t border-gray-100 pt-3">
                      <p>
                        <span className="text-lg font-semibold">
                          {money(r.price)}
                        </span>
                        <span className="text-xs text-gray-500"> / night</span>
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <button className={outlineBtn} onClick={soon}>
                          View Details
                        </button>
                        <button
                          className={primaryBtn}
                          disabled={!r.available}
                          onClick={soon}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawer(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-full overflow-y-auto bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Filters</h3>
              <button
                onClick={() => setDrawer(false)}
                aria-label="Close filters"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            {panel}
            <button
              className={`${primaryBtn} mt-5 w-full`}
              onClick={() => setDrawer(false)}
            >
              Show {list.length} rooms
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
