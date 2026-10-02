import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiNavigation,
  FiArrowUpRight,
} from "react-icons/fi";
import { getRooms } from "../Dashboard/dashboard.service.ts";
import {
  BOOK,
  CONTACT,
  PIC,
  PageHero,
  CTA,
  label,
  display,
  wrap,
  cta,
  link,
} from "./PublicShared.tsx";

/* ---------- Experience ---------- */

const EXP = [
  [
    "Restaurant",
    "Dining, unhurried",
    "Evening meals made from simple, good ingredients.",
    PIC.dining,
    "aspect-[4/5]",
  ],
  [
    "Swimming pool",
    "Quiet water",
    "A calm place to swim or simply sit and rest.",
    PIC.pool,
    "aspect-[3/2]",
  ],
  [
    "Breakfast",
    "A good start",
    "Breakfast is served every morning, included with selected rooms.",
    PIC.king,
    "aspect-square",
  ],
  [
    "Room service",
    "Brought to you",
    "Meals and essentials delivered to your door.",
    PIC.suite,
    "aspect-[4/5]",
  ],
  [
    "Wi-Fi",
    "Always connected",
    "Fast Wi-Fi in every room and public space.",
    PIC.twin,
    "aspect-[3/2]",
  ],
  [
    "24/7 reception",
    "Always at the desk",
    "Check in late or ask for anything, at any hour.",
    PIC.lobby,
    "aspect-[4/5]",
  ],
];

export const ExperiencePage = () => (
  <div className="overflow-hidden bg-stone-50 text-stone-900">
    <PageHero
      tall
      src={PIC.pool}
      tag="Experience"
      title="Experience more than a stay"
      text="The little things that make a trip feel easy."
    />

    <section className="py-24 md:py-32">
      <div className={wrap}>
        <div className="mb-20 max-w-2xl md:mb-28">
          <p className={label}>At GrandStay</p>
          <h2 className={`${display} mt-4 text-4xl leading-tight md:text-6xl`}>
            Comfort in every detail.
          </h2>
        </div>

        <div className="space-y-24 md:space-y-40">
          {EXP.map(([cat, title, text, src, ratio], i) => (
            <section
              key={cat}
              className={`grid items-center gap-8 md:grid-cols-12 md:gap-16 ${
                i % 2 ? "md:ml-12" : ""
              }`}
            >
              <div
                className={`group relative overflow-hidden md:col-span-7 ${
                  i % 2 ? "md:order-2" : ""
                } ${ratio}`}
              >
                <img
                  src={src}
                  alt={cat}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-1000 group-hover:scale-105"
                />

                <span className="absolute left-5 top-5 bg-white px-3 py-2 text-xs font-semibold tracking-widest">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div
                className={`md:col-span-4 ${
                  i % 2 ? "md:col-start-1 md:row-start-1" : ""
                }`}
              >
                <p className={label}>{cat}</p>
                <h2
                  className={`${display} mt-3 text-4xl leading-tight md:text-5xl`}
                >
                  {title}
                </h2>
                <p className="mt-5 max-w-sm leading-7 text-stone-600">{text}</p>

                {i === 2 && (
                  <Link
                    to={BOOK}
                    className={`${link} mt-7 inline-flex items-center gap-2`}
                  >
                    See rooms with breakfast <FiArrowUpRight />
                  </Link>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>

    <CTA
      title="Everything you need for a comfortable stay"
      text="Pick your dates and we will take care of the rest."
    />
  </div>
);

/* ---------- About ---------- */

const VALUES = [
  ["Comfort", "Rooms that are clean, quiet and ready."],
  ["Hospitality", "Warm, attentive and never intrusive."],
  ["Quality", "Small details checked every day."],
  ["Guest experience", "Simple booking from start to finish."],
];

export const AboutPage = () => {
  const [types, setTypes] = useState(0);

  useEffect(() => {
    getRooms().then((r) => setTypes(new Set(r.items.map((x) => x.type)).size));
  }, []);

  const facts = [
    ["24/7", "Reception"],
    ["Daily", "Breakfast"],
    [types ? String(types) : "-", "Room types"],
  ];

  return (
    <div className="overflow-hidden bg-stone-50 text-stone-900">
      <PageHero
        src={PIC.lobby}
        tag="About GrandStay"
        title="A stay designed around you"
        text="A hotel built on comfort, good service and an easy booking."
      />

      {/* Story */}
      <section className="py-24 md:py-32">
        <div
          className={`${wrap} grid items-center gap-14 md:grid-cols-12 md:gap-20`}
        >
          <div className="relative md:col-span-6">
            <img
              src={PIC.suite}
              alt="GrandStay suite"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute -bottom-6 right-4 hidden bg-white px-7 py-5 shadow-sm sm:block md:-right-8">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                GrandStay
              </p>
              <p className={`${display} mt-1 text-2xl`}>Made for comfort</p>
            </div>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <p className={label}>Our story</p>
            <h2
              className={`${display} mt-4 text-4xl leading-tight md:text-6xl`}
            >
              Simple, comfortable, well run.
            </h2>
            <p className="mt-7 leading-7 text-stone-600">
              GrandStay is a hotel for travellers who want a good room, a
              friendly desk and no fuss. We keep our focus on the basics and do
              them well.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-stone-200 bg-white py-24 md:py-28">
        <div className={`${wrap} grid gap-12 md:grid-cols-12 md:gap-20`}>
          <div className="md:col-span-4">
            <p className={label}>Our values</p>
            <h2 className={`${display} mt-4 text-4xl md:text-5xl`}>
              What matters to us.
            </h2>
          </div>

          <dl className="md:col-span-7 md:col-start-6">
            {VALUES.map(([title, text], i) => (
              <div
                key={title}
                className="grid gap-3 border-t border-stone-200 py-7 sm:grid-cols-[80px_1fr_1.3fr]"
              >
                <span className="text-sm text-stone-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <dt className={`${display} text-2xl`}>{title}</dt>
                <dd className="text-stone-500">{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Facts */}
      <section className="bg-stone-950 py-20 text-white md:py-24">
        <div className={`${wrap} grid grid-cols-3 divide-x divide-white/15`}>
          {facts.map(([number, title]) => (
            <div key={title} className="px-3 text-center sm:px-6">
              <p className={`${display} text-3xl sm:text-5xl md:text-6xl`}>
                {number}
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-stone-400 sm:text-sm">
                {title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className={`${wrap} py-24 md:py-32`}>
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className={label}>A glimpse inside</p>
            <h2 className={`${display} mt-3 text-4xl md:text-5xl`}>
              Spaces to settle into.
            </h2>
          </div>
        </div>

        <div className="grid auto-rows-[120px] grid-cols-2 gap-3 sm:auto-rows-[170px] md:auto-rows-[190px] md:grid-cols-6">
          {[
            [PIC.king, "Rooms", "col-span-2 row-span-3 md:col-span-3"],
            [PIC.lobby, "Lobby", "col-span-1 row-span-2 md:col-span-2"],
            [PIC.dining, "Dining", "col-span-1 row-span-1 md:col-span-1"],
            [PIC.pool, "Facilities", "col-span-2 row-span-2 md:col-span-3"],
            [PIC.family, "Family rooms", "col-span-2 row-span-2 md:col-span-3"],
          ].map(([src, title, classes]) => (
            <figure
              key={title}
              className={`group relative overflow-hidden ${classes}`}
            >
              <img
                src={src}
                alt={title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-1000 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10 text-sm text-white">
                {title}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-stone-900 px-6 py-24 text-center text-white md:py-32">
        <p
          className={`${display} mx-auto max-w-4xl text-3xl leading-tight md:text-6xl`}
        >
          Good service is quiet. You notice it when you need it, and not before.
        </p>
      </section>

      <CTA
        title="Discover our rooms"
        text="Find the room that suits your stay and book it today."
      />
    </div>
  );
};

/* ---------- Contact ---------- */

const FAQ = [
  [
    "What are check-in and check-out times?",
    "Check-in is from 2:00 PM and check-out is by 11:00 AM.",
  ],
  [
    "How do I book a room?",
    "Choose your dates on the Rooms page, pick a room and confirm in your guest dashboard.",
  ],
  [
    "Can I cancel a booking?",
    "You can manage your bookings from your dashboard. Contact us for cancellation terms.",
  ],
  [
    "How do I pay?",
    "Payments are shown in your dashboard once a booking is confirmed.",
  ],
  [
    "How can I reach the hotel?",
    "Call, email or use the form above. Reception is open 24/7.",
  ],
];

const fld =
  "w-full border-b border-stone-300 bg-transparent px-0 py-4 text-sm outline-none transition placeholder:text-stone-400 focus:border-indigo-600";

export const ContactPage = () => {
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<
      string,
      string
    >;

    window.location.href =
      `mailto:${CONTACT.email}?subject=${encodeURIComponent(d.subject)}` +
      `&body=${encodeURIComponent(`${d.message}\n\n${d.name}\n${d.email}\n${d.phone}`)}`;

    setSent(true);
  };

  return (
    <div className="overflow-hidden bg-stone-50 text-stone-900">
      <PageHero
        src={PIC.lobby}
        tag="Contact"
        title="We are here to help"
        text="Questions about a stay? Reach the team any time."
      />

      {/* Contact */}
      <section
        className={`${wrap} grid gap-16 py-24 md:grid-cols-12 md:gap-20 md:py-32`}
      >
        <div className="md:col-span-4">
          <p className={label}>Get in touch</p>
          <h2 className={`${display} mt-4 text-4xl leading-tight md:text-5xl`}>
            Let us help with your stay.
          </h2>

          <ul className="mt-10 space-y-6 text-sm text-stone-600">
            <li className="flex gap-4">
              <FiMapPin className="mt-1 shrink-0 text-indigo-600" />
              <span>{CONTACT.address}</span>
            </li>
            <li className="flex gap-4">
              <FiPhone className="mt-1 shrink-0 text-indigo-600" />
              <span>{CONTACT.phone}</span>
            </li>
            <li className="flex gap-4">
              <FiMail className="mt-1 shrink-0 text-indigo-600" />
              <span>{CONTACT.email}</span>
            </li>
          </ul>

          <p className="mt-8 text-xs uppercase tracking-widest text-stone-400">
            Reception open 24 hours
          </p>
        </div>

        <form
          onSubmit={submit}
          className="grid gap-x-8 gap-y-5 sm:grid-cols-2 md:col-span-7 md:col-start-6"
        >
          <input name="name" required placeholder="Name" className={fld} />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className={fld}
          />
          <input name="phone" placeholder="Phone" className={fld} />
          <input
            name="subject"
            required
            placeholder="Subject"
            className={fld}
          />
          <textarea
            name="message"
            required
            rows={5}
            placeholder="How can we help?"
            className={`${fld} sm:col-span-2 resize-none`}
          />

          <div className="pt-3 sm:col-span-2">
            <button className={`${cta} inline-flex items-center gap-2`}>
              Send message <FiArrowUpRight />
            </button>

            {sent && (
              <p className="mt-4 text-sm text-stone-500">
                Your mail app should open with the message ready to send.
              </p>
            )}
          </div>
        </form>
      </section>

      {/* Location */}
      <section className="grid md:grid-cols-2">
        <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-stone-900">
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-2xl text-white shadow-xl">
            <FiMapPin />
          </div>
        </div>

        <div className="flex flex-col justify-center px-6 py-20 md:px-16 md:py-28">
          <p className={label}>Location</p>
          <h2 className={`${display} mt-4 text-4xl md:text-5xl`}>
            Find your way to GrandStay.
          </h2>

          <p className="mt-5 max-w-md text-stone-600">{CONTACT.address}</p>

          <a
            href="https://www.google.com/maps/search/?api=1&query=GrandStay+Hotel"
            target="_blank"
            rel="noreferrer"
            className={`${cta} mt-8 w-fit gap-2`}
          >
            <FiNavigation /> Get directions
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${wrap} max-w-4xl py-24 md:py-32`}>
        <p className={label}>FAQ</p>
        <h2 className={`${display} mb-10 mt-3 text-4xl md:text-5xl`}>
          Common questions.
        </h2>

        <div className="divide-y divide-stone-200 border-y border-stone-200 bg-white">
          {FAQ.map(([question, answer]) => (
            <details key={question} className="group px-5 py-5 md:px-7">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-medium">
                <span>{question}</span>
                <span className="shrink-0 text-xl font-light text-indigo-600 transition group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-4 max-w-2xl pr-8 text-sm leading-7 text-stone-500">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <CTA
        title="Ready when you are"
        text="Choose your dates and book your stay."
      />
    </div>
  );
};
