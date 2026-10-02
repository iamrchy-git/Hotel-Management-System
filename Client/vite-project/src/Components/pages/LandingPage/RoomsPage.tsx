import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { getRooms, type Room } from "../Dashboard/dashboard.service.ts";
import {
  BOOK,
  PIC,
  PageHero,
  CTA,
  display,
  wrap,
  cta,
  link,
} from "./PublicShared.tsx";

const sel =
  "h-12 w-full border-b border-stone-300 bg-transparent text-sm outline-none focus:border-indigo-600";
const Cap = ({ t, children }: { t: string; children: React.ReactNode }) => (
  <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.16em] text-stone-500">
    {t}
    {children}
  </label>
);

const RoomsPage = () => {
  const [sp] = useSearchParams();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [f, setF] = useState({
    checkIn: sp.get("checkIn") || "",
    checkOut: sp.get("checkOut") || "",
    guests: sp.get("guests") || "1",
    type: sp.get("type") || "",
    amenity: "",
    max: "",
    open: false,
  });
  const set =
    (k: string) =>
    (e: { target: { value: string; type?: string; checked?: boolean } }) =>
      setF({
        ...f,
        [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
      });
  useEffect(() => {
    getRooms().then((r) => setRooms(r.items));
  }, []);

  const types = [...new Set(rooms.map((r) => r.type))];
  const amenities = [...new Set(rooms.flatMap((r) => r.amenities))];
  const list = rooms.filter(
    (r) =>
      r.capacity >= Number(f.guests) &&
      (!f.type || r.type === f.type) &&
      (!f.amenity || r.amenities.includes(f.amenity)) &&
      (!f.max || r.price <= Number(f.max)) &&
      (!f.open || r.available),
  );
  const book = (r: Room) =>
    `${BOOK}?${new URLSearchParams({ room: r.id, ...(f.checkIn && { checkIn: f.checkIn }), ...(f.checkOut && { checkOut: f.checkOut }), guests: f.guests })}`;

  return (
    <div className="bg-stone-50 text-stone-900">
      <PageHero
        src={PIC.king}
        tag="Rooms and suites"
        title="Find your perfect room"
        text="Filter by dates, guests and comforts, then book in a few clicks."
      />

      <div className={wrap}>
        <div className="relative z-10 -mt-10 grid gap-5 border border-stone-200 bg-white p-6 shadow-xl shadow-black/5 sm:grid-cols-2 lg:grid-cols-4">
          <Cap t="Check-in">
            <input
              type="date"
              value={f.checkIn}
              onChange={set("checkIn")}
              className={sel}
            />
          </Cap>
          <Cap t="Check-out">
            <input
              type="date"
              min={f.checkIn}
              value={f.checkOut}
              onChange={set("checkOut")}
              className={sel}
            />
          </Cap>
          <Cap t="Guests">
            <select value={f.guests} onChange={set("guests")} className={sel}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </Cap>
          <Cap t="Room type">
            <select value={f.type} onChange={set("type")} className={sel}>
              <option value="">Any</option>
              {types.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Cap>
          <Cap t="Max price / night">
            <input
              type="number"
              min={0}
              placeholder="No limit"
              value={f.max}
              onChange={set("max")}
              className={sel}
            />
          </Cap>
          <Cap t="Amenity">
            <select value={f.amenity} onChange={set("amenity")} className={sel}>
              <option value="">Any</option>
              {amenities.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </Cap>
          <label className="flex items-center gap-3 self-end pb-3 text-sm lg:col-span-2">
            <input
              type="checkbox"
              checked={f.open}
              onChange={set("open")}
              className="h-4 w-4 accent-indigo-600"
            />{" "}
            Show available rooms only
          </label>
        </div>

        <p className="mt-8 text-sm text-stone-500">
          {list.length} {list.length === 1 ? "room" : "rooms"} found
        </p>

        <div className="space-y-24 py-12 md:space-y-32 md:py-20">
          {list.length === 0 && (
            <p className={`${display} py-20 text-center text-3xl`}>
              No rooms match. Try loosening a filter.
            </p>
          )}
          {list.map((r, i) => (
            <article
              key={r.id}
              className={
                i === 0
                  ? ""
                  : `grid items-center gap-8 md:grid-cols-12 md:gap-14 ${i % 2 ? "" : "md:[&>div:first-child]:order-2"}`
              }
            >
              {i === 0 ? (
                <div className="group relative aspect-[4/5] overflow-hidden bg-stone-900 text-white sm:aspect-[16/9]">
                  <img
                    src={r.image || PIC.suite}
                    alt={r.name}
                    className="h-full w-full object-cover transition duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 p-6 md:p-10">
                    <div className="max-w-lg">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                        Featured · {r.type} ·{" "}
                        {r.available ? "Available" : "Fully booked"}
                      </p>
                      <h2 className={`${display} mt-2 text-3xl md:text-5xl`}>
                        {r.name}
                      </h2>
                      <p className="mt-3 text-white/80">{r.description}</p>
                      <p className="mt-3 flex flex-wrap gap-x-4 text-sm text-white/80">
                        <span className="flex items-center gap-1.5">
                          <FiUsers /> {r.capacity} guests
                        </span>
                        {r.amenities.slice(0, 3).map((a) => (
                          <span key={a}>{a}</span>
                        ))}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <p className="text-3xl">
                        रू {r.price}
                        <span className="text-sm text-white/70"> / night</span>
                      </p>
                      <Link to={book(r)} className={link}>
                        View details
                      </Link>
                      <Link to={book(r)} className={cta}>
                        Book now
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    className={`group overflow-hidden bg-stone-200 md:col-span-7 ${i % 3 === 0 ? "aspect-[3/4] md:aspect-[4/5]" : "aspect-[4/3]"}`}
                  >
                    <img
                      src={r.image || PIC.twin}
                      alt={r.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-1000 group-hover:scale-105"
                    />
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-indigo-600">
                      {r.type} · {r.available ? "Available" : "Fully booked"}
                    </p>
                    <h2 className={`${display} mt-3 text-3xl md:text-4xl`}>
                      {r.name}
                    </h2>
                    <p className="mt-4 text-stone-600">{r.description}</p>
                    <ul className="mt-5 divide-y divide-stone-200 border-y border-stone-200 text-sm">
                      <li className="flex justify-between py-3">
                        <span className="text-stone-500">Capacity</span>
                        {r.capacity} guests
                      </li>
                      <li className="flex justify-between py-3">
                        <span className="text-stone-500">Amenities</span>
                        {r.amenities.slice(0, 3).join(", ") || "-"}
                      </li>
                    </ul>
                    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <p className="mr-auto text-2xl">
                        रू {r.price}
                        <span className="text-sm text-stone-500"> / night</span>
                      </p>
                      <Link to={book(r)} className={link}>
                        View details
                      </Link>
                      <Link to={book(r)} className={cta}>
                        Book now
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      </div>
      <CTA
        title="Not sure which room? Start with your dates"
        text="See what is free for your stay."
      />
    </div>
  );
};

export default RoomsPage;
