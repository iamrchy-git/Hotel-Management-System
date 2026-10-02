import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import { FiHome, FiUser } from "react-icons/fi";
import ProfileMenu from "../../pages/Dashboard/ProfileMenu.tsx";
import {
  displayName,
  getUser,
} from "../../pages/Dashboard/dashboard.service.ts";

const LINKS = [
  ["/", "Home"],
  ["/rooms", "Rooms"],
  ["/experience", "Experience"],
  ["/about", "About"],
  ["/contact", "Contact"],
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(getUser);

  useEffect(() => {
    const sync = () => setUser(getUser());
    const scroll = () => setScrolled(window.scrollY > 40);

    scroll();
    window.addEventListener("auth-change", sync);
    window.addEventListener("scroll", scroll, { passive: true });

    return () => {
      window.removeEventListener("auth-change", sync);
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const overlay = !scrolled && !open;
  const close = () => setOpen(false);

  const navStyle = (active: boolean) =>
    `relative py-1 text-base font-medium transition-colors
    after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full
    after:origin-left after:bg-indigo-500 after:transition-transform
    ${active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}
    ${overlay ? "text-white" : "text-stone-800"}`;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        overlay
          ? "bg-transparent"
          : "border-b border-stone-200 bg-white/95 shadow-sm backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-14">
        <Link to="/" onClick={close} className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <FiHome className="text-xl" />
          </span>

          <span
            className={`font-serif text-2xl font-semibold tracking-tight ${
              overlay ? "text-white" : "text-stone-900"
            }`}
          >
            GrandStay
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {LINKS.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) => navStyle(isActive)}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          {user ? (
            <ProfileMenu user={user} />
          ) : (
            <>
              <Link to="/login" className={navStyle(false)}>
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg border border-indigo-200 px-4 py-2.5 text-base font-semibold text-indigo-700 transition hover:border-indigo-400 hover:bg-indigo-50"
              >
                Register
              </Link>
            </>
          )}

          <Link
            to="/dashboard/rooms"
            className="rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-indigo-500"
          >
            Book now
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className={`rounded-full p-2 text-2xl transition ${
            overlay
              ? "text-white hover:bg-white/10"
              : "text-stone-800 hover:bg-stone-100"
          } lg:hidden`}
        >
          {open ? <IoMdClose /> : <CiMenuBurger />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-[72px] h-[calc(100vh-72px)] overflow-y-auto bg-white lg:hidden">
          <div className="mx-auto flex max-w-xl flex-col px-6 py-7">
            <nav className="flex flex-col">
              {LINKS.map(([to, label]) => (
                <NavLink
                  key={to}
                  to={to}
                  end
                  onClick={close}
                  className={({ isActive }) =>
                    `border-b border-stone-100 px-2 py-4 font-serif text-xl ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-stone-800"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-6 border-t border-stone-200 pt-6">
              {user ? (
                <div className="mb-5 rounded-2xl bg-stone-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                      {initials || <FiUser />}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-stone-900">
                        {displayName(user)}
                      </p>
                      <p className="text-xs text-stone-500">Signed in</p>
                    </div>
                  </div>

                  <Link
                    to="/dashboard"
                    onClick={close}
                    className="mt-4 flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-semibold text-stone-800 shadow-sm ring-1 ring-stone-200 transition hover:text-indigo-600"
                  >
                    My Dashboard
                    <span>→</span>
                  </Link>
                </div>
              ) : (
                <div className="mb-5 flex gap-3">
                  <Link
                    to="/login"
                    onClick={close}
                    className="flex-1 rounded-xl border border-stone-200 py-3 text-center font-semibold text-stone-800"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={close}
                    className="flex-1 rounded-xl bg-stone-900 py-3 text-center font-semibold text-white"
                  >
                    Register
                  </Link>
                </div>
              )}

              <Link
                to="/dashboard/rooms"
                onClick={close}
                className="block rounded-xl bg-indigo-600 py-4 text-center font-semibold text-white transition hover:bg-indigo-500"
              >
                Book Your Stay
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
