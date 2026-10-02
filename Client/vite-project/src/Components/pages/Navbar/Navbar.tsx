import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import { FiHome } from "react-icons/fi";
import ProfileMenu from "../../pages/Dashboard/ProfileMenu.tsx";
import { getUser } from "../../pages/Dashboard/dashboard.service.ts";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(getUser);

  useEffect(() => {
    const syncUser = () => setUser(getUser());
    window.addEventListener("auth-change", syncUser);
    return () => window.removeEventListener("auth-change", syncUser);
  }, []);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="sticky top-0 z-40 h-18 w-full border-b border-indigo-100 bg-white shadow-sm dark:bg-black dark:text-secondary">
      {/* Navbar Container */}
      <div className="flex justify-between items-center max-w-7xl mx-auto h-full px-6 md:px-14">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200">
            <FiHome className="text-xl" />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-bold tracking-tight text-slate-900">
              GrandStay
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.16em] text-indigo-600 sm:block">
              Your comfort, our priority
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <ProfileMenu user={user} />
          ) : (
            <>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-indigo-700"
              >
                Register
              </Link>

              <Link
                to="/login"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-700"
              >
                Login ➜
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden gap-4 items-center ">
          <div
            onClick={handleMenuToggle}
            className="z-50 cursor-pointer text-indigo-600 focus:outline-none dark:text-secondary"
          >
            {showMenu ? (
              <IoMdClose className="text-xl" />
            ) : (
              <CiMenuBurger className="text-xl" />
            )}
          </div>
        </div>
      </div>

      {/* Responsive Mobile Menu */}
      {/* <ResponsiveMenu
                showMenu={showMenu}
                setShowMenu={setShowMenu}
            /> */}
    </div>
  );
};

export default Navbar;
