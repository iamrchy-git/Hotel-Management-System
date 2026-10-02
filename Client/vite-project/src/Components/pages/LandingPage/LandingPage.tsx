import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiWifi,
  FiCoffee,
  FiWind,
  FiMapPin,
  FiPhone,
  FiMail,
  FiStar,
  FiUsers,
  FiShield,
  FiClock,
  FiCheckCircle,
  FiNavigation,
} from "react-icons/fi";
import { getRooms, type Room } from "../Dashboard/dashboard.service.ts";

/* Booking flow lives in the existing guest dashboard (it already redirects guests to login). */
const BOOK = "/dashboard/rooms";

const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const PIC = {
  hero: img("1566073771259-6a8506099945", 2000),
  lobby: img("1564501049412-61c2a3083791"),
  suite: img("1566665797739-1674de7a421a"),
  king: img("1618773928121-c32242e63f39"),
  dining: img("1414235077428-338989a2e8c0"),
  pool: img("1520250497591-112f2f40a3f4"),
  twin: img("1590490359683-658d3d23f972"),
};

const today = () => new Date().toISOString().slice(0, 10);

const HIGHLIGHTS = [
  ["4.8 / 5", "Average guest rating"],
  ["Comfort-first", "Quiet, well-kept rooms"],
  ["24/7", "Front desk & support"],
  ["Book online", "In a few clicks"],
];

const AMENITIES = [
  {
    title: "Dining & breakfast",
    text: "Start the day with a fresh breakfast, served daily.",
    img: PIC.dining,
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Pool access",
    text: "Unwind after a long day.",
    img: PIC.pool,
    span: "",
  },
  {
    title: "Free Wi-Fi",
    text: "Fast and reliable in every room.",
    icon: FiWifi,
    span: "",
  },
  {
    title: "Air conditioning",
    text: "Your temperature, your way.",
    icon: FiWind,
    span: "",
  },
  {
    title: "Room service",
    text: "Meals and essentials, brought to you.",
    icon: FiCoffee,
    span: "",
  },
];

const WHY = [
  [FiCheckCircle, "Easy online booking", "Pick dates, choose a room, confirm."],
  [FiStar, "Comfortable rooms", "Clean, quiet and well equipped."],
  [FiShield, "Secure payment", "Your payment details stay protected."],
  [FiClock, "24/7 support", "Our team is always at the desk."],
] as const;

/* PLACEHOLDER reviews: replace with real feedback once the reviews endpoint is connected. */
const REVIEWS = [
  {
    name: "Sample Guest A",
    stay: "Deluxe King · 3 nights",
    text: "Calm room, friendly staff and a very smooth check-in.",
  },
  {
    name: "Sample Guest B",
    stay: "Family Room · 2 nights",
    text: "Plenty of space for the kids and breakfast was great.",
  },
  {
    name: "Sample Guest C",
    stay: "Executive Suite · 4 nights",
    text: "Everything we needed for a relaxed, comfortable stay.",
  },
];

const btn =
  "inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition";
const primary = `${btn} bg-indigo-600 text-white hover:bg-indigo-500`;
const ghost = `${btn} border border-white/40 text-white hover:bg-white/10`;
const wrap = "mx-auto max-w-7xl px-6 md:px-14";
const h2 = "font-serif text-3xl font-semibold tracking-tight md:text-5xl";

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <label className="flex flex-1 flex-col gap-1 text-xs font-medium text-slate-500">
    {label}
    {children}
  </label>
);
const input =
  "h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

const SearchPanel = ({ types }: { types: string[] }) => {
  const nav = useNavigate();
  const [q, setQ] = useState({
    checkIn: today(),
    checkOut: "",
    guests: "2",
    type: "",
  });
  const set = (k: string) => (e: { target: { value: string } }) =>
    setQ({ ...q, [k]: e.target.value });
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams(Object.entries(q).filter(([, v]) => v));
    nav(`${BOOK}?${p}`);
  };
  return (
    <form
      onSubmit={submit}
      className="mx-auto -mt-16 flex max-w-5xl flex-col gap-4 rounded-2xl bg-white p-5 shadow-2xl shadow-black/20 md:flex-row md:items-end md:p-6 relative z-20"
    >
      <Field label="Check-in">
        <input
          type="date"
          min={today()}
          value={q.checkIn}
          onChange={set("checkIn")}
          className={input}
        />
      </Field>
      <Field label="Check-out">
        <input
          type="date"
          min={q.checkIn}
          value={q.checkOut}
          onChange={set("checkOut")}
          className={input}
        />
      </Field>
      <Field label="Guests">
        <select value={q.guests} onChange={set("guests")} className={input}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Room type">
        <select value={q.type} onChange={set("type")} className={input}>
          <option value="">Any type</option>
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <button className={`${primary} h-11`}>Find a room</button>
    </form>
  );
};

const RoomCard = ({ r }: { r: Room }) => (
  <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white">
    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
      <img
        src={r.image || PIC.king}
        alt={r.name}
        loading="lazy"
        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
      <span
        className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium ${r.available ? "bg-white text-emerald-700" : "bg-black/70 text-white"}`}
      >
        {r.available ? "Available" : "Fully booked"}
      </span>
    </div>
    <div className="p-5">
      <h3 className="font-serif text-xl font-semibold">{r.name}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-slate-500">
        {r.description}
      </p>
      <p className="mt-3 flex items-center gap-2 text-sm text-slate-600">
        <FiUsers /> Up to {r.capacity} guests
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {r.amenities.slice(0, 3).map((a) => (
          <span
            key={a}
            className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600"
          >
            {a}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <p>
          <span className="text-2xl font-semibold">रू {r.price}</span>{" "}
          <span className="text-sm text-slate-500">/ night</span>
        </p>
        <div className="flex gap-2">
          <Link
            to={BOOK}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium hover:border-indigo-400"
          >
            Details
          </Link>
          <Link
            to={BOOK}
            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Book now
          </Link>
        </div>
      </div>
    </div>
  </article>
);

const LandingPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  useEffect(() => {
    getRooms().then((r) => setRooms(r.items));
  }, []);
  const types = [...new Set(rooms.map((r) => r.type))];
  const featured = [...rooms]
    .sort((a, b) => Number(b.available) - Number(a.available))
    .slice(0, 3);

  return (
    <div className="overflow-x-hidden bg-white text-slate-900">
      <style>{`@keyframes rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
        .rise{animation:rise .9s cubic-bezier(.22,1,.36,1) both}@media(prefers-reduced-motion:reduce){.rise{animation:none}}`}</style>

      {/* Hero */}
      <header className="relative flex min-h-[88vh] items-center bg-black pb-28 pt-24 text-white">
        <img
          src={PIC.hero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className={`${wrap} rise relative w-full`}>
          <p className="mb-4 flex items-center gap-2 text-sm text-white/80">
            <FiMapPin /> GrandStay Hotel
          </p>
          <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Rest well. Remember the stay.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Quiet rooms, warm service and a booking process that takes minutes.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to={BOOK} className={primary}>
              Book your stay
            </Link>
            <a href="#rooms" className={ghost}>
              Explore rooms
            </a>
          </div>
        </div>
      </header>

      <div className={wrap}>
        <SearchPanel types={types} />
      </div>

      {/* Highlights */}
      <section
        className={`${wrap} grid grid-cols-2 gap-y-8 py-16 md:grid-cols-4`}
      >
        {HIGHLIGHTS.map(([a, b]) => (
          <div key={a} className="border-l border-indigo-200 pl-5">
            <p className="font-serif text-2xl font-semibold">{a}</p>
            <p className="mt-1 text-sm text-slate-500">{b}</p>
          </div>
        ))}
      </section>

      {/* Featured rooms */}
      <section id="rooms" className={`${wrap} pb-24`}>
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className={h2}>Rooms made for rest</h2>
          <Link
            to={BOOK}
            className="hidden text-sm font-semibold text-indigo-600 hover:underline sm:block"
          >
            View all rooms
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((r) => (
            <RoomCard key={r.id} r={r} />
          ))}
        </div>
      </section>

      {/* Amenities */}
      <section className="bg-slate-950 py-24 text-white">
        <div className={wrap}>
          <h2 className={`${h2} mb-10 max-w-2xl`}>
            Everything for an easy stay
          </h2>
          <div className="grid auto-rows-[220px] gap-4 md:grid-cols-4">
            {AMENITIES.map((a) => (
              <div
                key={a.title}
                className={`group relative overflow-hidden rounded-xl ${a.span} ${a.img ? "" : "border border-white/10 bg-white/5 p-6"}`}
              >
                {a.img ? (
                  <>
                    <img
                      src={a.img}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 p-6">
                      <h3 className="text-lg font-semibold">{a.title}</h3>
                      <p className="text-sm text-white/70">{a.text}</p>
                    </div>
                  </>
                ) : (
                  <>
                    {a.icon && <a.icon className="text-2xl text-indigo-400" />}
                    <h3 className="mt-6 text-lg font-semibold">{a.title}</h3>
                    <p className="mt-1 text-sm text-white/60">{a.text}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section
        className={`${wrap} grid items-center gap-12 py-24 md:grid-cols-2`}
      >
        <img
          src={PIC.lobby}
          alt="Hotel lobby"
          loading="lazy"
          className="aspect-[4/5] w-full rounded-xl object-cover"
        />
        <div>
          <p className="mb-3 text-sm font-medium text-indigo-600">
            About our hotel
          </p>
          <h2 className={h2}>A calm place to arrive, a easy place to stay</h2>
          <p className="mt-6 max-w-lg text-slate-600">
            GrandStay keeps things simple: comfortable rooms, attentive staff
            and a front desk that never closes.
          </p>
          <ul className="mt-6 space-y-3 text-slate-700">
            {[
              "Rooms for solo trips, couples and families",
              "Breakfast and room service on site",
              "Simple online booking and payment",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <FiCheckCircle className="mt-1 shrink-0 text-indigo-600" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery */}
      <section className={`${wrap} pb-24`}>
        <h2 className={`${h2} mb-10`}>A look inside</h2>
        <div className="grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-4">
          {[
            [PIC.suite, "Suites", "col-span-2 row-span-2"],
            [PIC.lobby, "Lobby", "row-span-2"],
            [PIC.pool, "Pool", ""],
            [PIC.dining, "Dining", ""],
            [PIC.twin, "Rooms", "col-span-2"],
          ].map(([src, label, cls]) => (
            <figure
              key={label}
              className={`group relative overflow-hidden rounded-xl ${cls}`}
            >
              <img
                src={src}
                alt={label}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-0 flex items-end bg-black/0 p-4 text-sm font-medium text-white opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
                {label}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="border-y border-slate-200 py-20">
        <div className={`${wrap} grid gap-10 sm:grid-cols-2 lg:grid-cols-4`}>
          {WHY.map(([Icon, t, d]) => (
            <div key={t}>
              <Icon className="text-2xl text-indigo-600" />
              <h3 className="mt-4 font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-slate-500">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews (placeholder data) */}
      <section className={`${wrap} py-24`}>
        <h2 className={`${h2} mb-10`}>What guests say</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <blockquote
              key={r.name}
              className="rounded-xl border border-slate-200 p-6 shadow-sm"
            >
              <div className="flex gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="fill-current" />
                ))}
              </div>
              <p className="mt-4 text-slate-700">“{r.text}”</p>
              <footer className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
                  {r.name.slice(-1)}
                </span>
                <span className="text-sm">
                  <b className="block">{r.name}</b>
                  <span className="text-slate-500">{r.stay}</span>
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-400">
          Sample reviews shown until real feedback is connected.
        </p>
      </section>

      {/* Location (placeholder details) */}
      <section className="bg-slate-50 py-24">
        <div className={`${wrap} grid items-center gap-12 md:grid-cols-2`}>
          <div>
            <h2 className={h2}>Find us</h2>
            <p className="mt-4 max-w-md text-slate-600">
              Easy to reach, with the city close by.
            </p>
            <ul className="mt-8 space-y-4 text-slate-700">
              <li className="flex gap-3">
                <FiMapPin className="mt-1 text-indigo-600" />
                123 Hotel Street, Your City
              </li>
              <li className="flex gap-3">
                <FiPhone className="mt-1 text-indigo-600" />
                +977 000 000 000
              </li>
              <li className="flex gap-3">
                <FiMail className="mt-1 text-indigo-600" />
                hello@grandstay.com
              </li>
            </ul>
            <a
              href="https://www.google.com/maps/search/?api=1&query=GrandStay+Hotel"
              target="_blank"
              rel="noreferrer"
              className={`${primary} mt-8 gap-2`}
            >
              <FiNavigation /> Get directions
            </a>
          </div>
          <div className="flex aspect-[4/3] items-center justify-center rounded-xl border border-slate-200 bg-[linear-gradient(#e2e8f0_1px,transparent_1px),linear-gradient(90deg,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px]">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-2xl text-white shadow-lg">
              <FiMapPin />
            </span>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative bg-black py-28 text-center text-white">
        <img
          src={PIC.suite}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className={`${wrap} relative`}>
          <h2 className="mx-auto max-w-3xl font-serif text-4xl font-semibold md:text-6xl">
            Your room is waiting.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-white/80">
            Choose your dates and book in minutes.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to={BOOK} className={primary}>
              Book your stay
            </Link>
            <a href="#rooms" className={ghost}>
              Explore rooms
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
