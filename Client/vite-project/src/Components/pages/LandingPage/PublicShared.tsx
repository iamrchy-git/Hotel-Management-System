import { Link } from "react-router-dom";
import {
  FiArrowUp,
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
  FiTwitter,
} from "react-icons/fi";

export const BOOK = "/dashboard/rooms"; // existing booking flow
export const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
export const PIC = {
  hero: img("1566073771259-6a8506099945", 2400),
  lobby: img("1564501049412-61c2a3083791"),
  suite: img("1566665797739-1674de7a421a"),
  king: img("1618773928121-c32242e63f39"),
  dining: img("1414235077428-338989a2e8c0"),
  pool: img("1520250497591-112f2f40a3f4"),
  twin: img("1590490359683-658d3d23f972"),
  family: img("1595576508898-0ad5c879a061"),
};
/* PLACEHOLDER contact details: replace with your real hotel info. */
export const CONTACT = {
  address: "123 Hotel Street, Your City",
  phone: "+977 000 000 000",
  email: "hello@grandstay.com",
};

export const label =
  "text-xs font-medium uppercase tracking-[0.22em] text-indigo-600";
export const display = "font-serif font-medium tracking-tight";
export const wrap = "mx-auto max-w-7xl px-6 md:px-14";
export const cta =
  "inline-flex items-center justify-center bg-indigo-600 px-8 py-4 text-sm font-semibold tracking-wide text-white transition hover:bg-indigo-500";
export const link =
  "border-b border-current pb-1 text-sm font-medium transition hover:text-indigo-500";

export const PageHero = ({
  src,
  tag,
  title,
  text,
  tall,
}: {
  src: string;
  tag: string;
  title: string;
  text: string;
  tall?: boolean;
}) => (
  <header
    className={`relative flex items-end overflow-hidden bg-black text-white ${tall ? "min-h-[85vh]" : "min-h-[58vh]"}`}
  >
    <img
      src={src}
      alt=""
      className="absolute inset-0 h-full w-full object-cover opacity-60"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50" />
    <div className={`${wrap} relative w-full pb-16 pt-40`}>
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/70">
        {tag}
      </p>
      <h1
        className={`${display} max-w-3xl text-5xl leading-[1.05] md:text-7xl`}
      >
        {title}
      </h1>
      <p className="mt-5 max-w-md text-lg text-white/75">{text}</p>
    </div>
  </header>
);

export const CTA = ({ title, text }: { title: string; text: string }) => (
  <section className="relative flex min-h-[70vh] items-center justify-center bg-black px-6 text-center text-white">
    <img
      src={PIC.hero}
      alt=""
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover opacity-45"
    />
    <div className="relative">
      <h2
        className={`${display} mx-auto max-w-3xl text-4xl leading-tight md:text-6xl`}
      >
        {title}
      </h2>
      <p className="mx-auto mt-5 max-w-md text-white/75">{text}</p>
      <Link to={BOOK} className={`${cta} mt-9`}>
        Book your stay
      </Link>
    </div>
  </section>
);

/* ---------- Footer ---------- */
const COLS = [
  [
    "Explore",
    [
      ["/rooms", "Rooms"],
      ["/experience", "Experience"],
      ["/about", "About"],
      ["/contact", "Contact"],
    ],
  ],
  [
    "Guests",
    [
      [BOOK, "Book a stay"],
      ["/dashboard/bookings", "My bookings"],
      ["/login", "Login"],
      ["/register", "Register"],
    ],
  ],
] as const;

/* PLACEHOLDER: replace "#" with your real social profile links. */
const SOCIAL = [
  [FiInstagram, "Instagram"],
  [FiFacebook, "Facebook"],
  [FiTwitter, "Twitter"],
] as const;

const ACCENT = "text-indigo-400";
const head = `mb-5 text-xs font-medium uppercase tracking-[0.22em] ${ACCENT}`;

export const Footer = () => (
  <footer className="relative overflow-hidden bg-slate-950 text-slate-400">
    {/* Purple hairline */}
    <div className="h-px bg-gradient-to-r from-transparent via-violet-500/70 to-transparent" />

    {/* Closing invitation */}
    <div
      className={`${wrap} flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center`}
    >
      <h2
        className={`${display} max-w-xl text-3xl leading-tight text-white md:text-5xl`}
      >
        Your next stay starts here.
      </h2>
      <Link
        to={BOOK}
        className="inline-flex items-center justify-center bg-indigo-600 px-8 py-4 text-sm font-semibold tracking-wide text-white transition hover:bg-indigo-500"
      >
        Book your stay
      </Link>
    </div>

    <div
      className={`${wrap} grid gap-12 border-t border-white/10 py-16 md:grid-cols-12`}
    >
      <div className="md:col-span-5">
        <p className="font-serif text-3xl font-semibold text-white">
         GrandStay - Your Gateway to Comfort and Luxury
        </p>
        <p className="mt-4 max-w-sm text-sm leading-relaxed">
          Comfortable rooms, warm service and a booking that takes minutes.
          Reception is open 24 hours a day.
        </p>
        <div className="mt-8 flex gap-3">
          {SOCIAL.map(([Icon, name]) => (
            <a
              key={name}
              href="#"
              aria-label={name}
              className="flex h-11 w-11 items-center justify-center border border-white/20 text-indigo-400 transition hover:bg-indigo-600 hover:text-white"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      {COLS.map(([title, items]) => (
        <nav key={title} className="md:col-span-2">
          <p className={head}>{title}</p>
          <ul className="space-y-3 text-sm">
            {items.map(([to, t]) => (
              <li key={to}>
                <Link
                  to={to}
                  className="inline-block transition hover:translate-x-1 hover:text-indigo-300"
                >
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ))}

      <div className="md:col-span-3">
        <p className={head}>Contact</p>
        <ul className="space-y-4 text-sm">
          <li className="flex gap-3">
            <FiMapPin className={`mt-0.5 shrink-0 ${ACCENT}`} />
            {CONTACT.address}
          </li>
          <li className="flex gap-3">
            <FiPhone className={`mt-0.5 shrink-0 ${ACCENT}`} />
            {CONTACT.phone}
          </li>
          <li className="flex gap-3">
            <FiMail className={`mt-0.5 shrink-0 ${ACCENT}`} />
            {CONTACT.email}
          </li>
        </ul>
      </div>
    </div>

    <p
      aria-hidden
      className="pointer-events-none select-none whitespace-nowrap text-center font-serif text-[15vw] font-semibold leading-[0.8] text-indigo-400/[0.07]"
    >
      GrandStay
    </p>

    <div className="relative border-t border-white/10">
      <div
        className={`${wrap} flex flex-col items-center justify-between gap-4 py-6 text-xs sm:flex-row`}
      >
        <p>© {new Date().getFullYear()} GrandStay. All rights reserved.</p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 transition hover:text-indigo-300"
        >
          Back to top <FiArrowUp />
        </button>
      </div>
    </div>
  </footer>
);
