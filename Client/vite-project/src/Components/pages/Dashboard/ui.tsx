import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { IconType } from "react-icons";
import { FiCalendar, FiCreditCard, FiHome, FiImage, FiX } from "react-icons/fi";
import { displayName, type Notice, type User } from "./dashboard.service.ts";

/* ---------- Shared classes ---------- */
export const card = "rounded-xl border border-gray-200 bg-white shadow-sm";
export const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50";
export const outlineBtn =
  "inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-black hover:bg-gray-50";
export const inputCls =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-gray-50 disabled:text-gray-500";

/* ---------- Formatters ---------- */
export const fmtDate = (s: string) =>
  new Date(s).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
export const NepaliRupee = () => (
  <span aria-label="Nepali rupees" title="Nepali rupees">
    रू
  </span>
);
export const money = (n: number) => (
  <>
    <NepaliRupee />
    {" "}
    {n.toLocaleString()}
  </>
);
export const nights = (a: string, b: string) =>
  Math.max(1, Math.round((+new Date(b) - +new Date(a)) / 864e5));

export const noticeIcon: Record<Notice["type"], IconType> = {
  booking: FiCalendar,
  payment: FiCreditCard,
  stay: FiHome,
};

/* ---------- Small shared components ---------- */
const tone = (s: string) =>
  /cancel|fail|unavailable/i.test(s)
    ? "bg-red-50 text-red-700"
    : /^(confirm|complet|paid|available|check)/i.test(s)
      ? "bg-emerald-50 text-emerald-700"
      : "bg-amber-50 text-amber-700";

export const Badge = ({ status }: { status: string }) => (
  <span
    className={`w-fit whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${tone(status)}`}
  >
    {status}
  </span>
);

export const Avatar = ({
  user,
  className = "h-9 w-9 text-sm",
}: {
  user: User;
  className?: string;
}) => {
  const [failed, setFailed] = useState(false);
  const name = displayName(user);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return user.profileImage && !failed ? (
    <img
      src={user.profileImage}
      alt={name}
      onError={() => setFailed(true)}
      className={`${className} shrink-0 rounded-full object-cover`}
    />
  ) : (
    <span
      className={`${className} flex shrink-0 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white`}
    >
      {initials}
    </span>
  );
};

/** Room/hotel image with a neutral placeholder when there is no image (or it fails to load). */
export const Photo = ({
  src,
  alt,
  className = "",
}: {
  src?: string;
  alt: string;
  className?: string;
}) => {
  const [failed, setFailed] = useState(false);
  return src && !failed ? (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  ) : (
    <div
      className={`flex items-center justify-center bg-gray-100 text-gray-300 ${className}`}
    >
      <FiImage className="text-3xl" />
    </div>
  );
};

export const PageHeader = ({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children?: ReactNode;
}) => (
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-sm text-gray-500">{text}</p>
    </div>
    {children}
  </div>
);

export const EmptyState = ({
  icon: Icon,
  title,
  text,
  to,
  cta,
}: {
  icon: IconType;
  title: string;
  text?: string;
  to?: string;
  cta?: string;
}) => (
  <div className="flex flex-col items-center px-4 py-10 text-center">
    <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-xl text-indigo-600">
      <Icon />
    </span>
    <p className="font-medium">{title}</p>
    {text && <p className="mt-1 text-sm text-gray-500">{text}</p>}
    {to && cta && (
      <Link to={to} className={`${primaryBtn} mt-4`}>
        {cta}
      </Link>
    )}
  </div>
);

export const DetailList = ({
  rows,
  cols = "grid-cols-2",
}: {
  rows: [string, ReactNode][];
  cols?: string;
}) => (
  <dl className={`grid gap-4 text-sm ${cols}`}>
    {rows.map(([k, v]) => (
      <div key={k}>
        <dt className="text-xs text-gray-500">{k}</dt>
        <dd className="mt-0.5 font-medium">{v}</dd>
      </div>
    ))}
  </dl>
);

export const Modal = ({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) => (
  <div
    className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
    onClick={onClose}
  >
    <div
      className={`${card} max-h-full w-full max-w-md overflow-y-auto p-6`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <button onClick={onClose} aria-label="Close">
          <FiX className="text-xl" />
        </button>
      </div>
      {children}
    </div>
  </div>
);
