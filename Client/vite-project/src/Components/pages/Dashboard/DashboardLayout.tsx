import { useState } from "react";
import {
  Navigate,
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  FiBell,
  FiCalendar,
  FiCreditCard,
  FiGrid,
  FiHome,
  FiLogOut,
  FiMenu,
  FiSearch,
  FiUser,
  FiX,
} from "react-icons/fi";
import { toast } from "sonner";
import ProfileMenu from "./ProfileMenu.tsx";
import { getToken, getUser, logout } from "./dashboard.service.ts";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: FiGrid },
  { to: "/dashboard/bookings", label: "My Bookings", icon: FiCalendar },
  { to: "/dashboard/rooms", label: "Find a Room", icon: FiSearch },
  { to: "/dashboard/stay", label: "My Stay", icon: FiHome },
  { to: "/dashboard/payments", label: "Payments", icon: FiCreditCard },
  { to: "/dashboard/notifications", label: "Notifications", icon: FiBell },
  { to: "/dashboard/profile", label: "Profile", icon: FiUser },
];

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = getUser();

  if (!getToken() || !user) return <Navigate to="/login" replace />;
  // ASSUMED: role is "guest" (any case) when present. Adjust if your backend uses another value.
  if (user.role && user.role.toLowerCase() !== "guest")
    return <Navigate to="/" replace />;

  const title = items.find((i) => i.to === pathname)?.label ?? "Dashboard";
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium md:justify-center lg:justify-start ${
      isActive
        ? "bg-indigo-50 text-indigo-700"
        : "text-gray-600 hover:bg-gray-100 hover:text-black"
    }`;

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50 text-black md:pl-16 lg:pl-60">
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar: drawer on mobile, icons on tablet, full on desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform md:z-30 md:w-16 md:translate-x-0 lg:w-60 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 font-bold md:justify-center lg:justify-start">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2"
          >
            <span className="flex items-center gap-2 md:hidden lg:inline-flex">
              <FiHome className="text-xl text-indigo-600" />
              <span>GrandStay</span>
            </span>
            <span className="hidden text-indigo-600 md:inline lg:hidden">
              GS
            </span>
          </Link>
          <button
            className="md:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/dashboard"}
              title={label}
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              <Icon className="shrink-0 text-lg" />
              <span className="md:hidden lg:inline">{label}</span>
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            title="Logout"
            className="mt-auto flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 md:justify-center lg:justify-start"
          >
            <FiLogOut className="shrink-0 text-lg" />
            <span className="md:hidden lg:inline">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Topbar */}
      <header className="fixed inset-x-0 top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:left-16 md:px-8 lg:left-60">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu className="text-xl" />
          </button>
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <NavLink
            to="/dashboard/notifications"
            className="rounded-full p-2 text-gray-600 hover:bg-gray-100"
            aria-label="Notifications"
          >
            <FiBell className="text-lg" />
          </NavLink>
          <ProfileMenu user={user} />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-4 pt-20 md:px-8 md:pb-8 md:pt-24">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
