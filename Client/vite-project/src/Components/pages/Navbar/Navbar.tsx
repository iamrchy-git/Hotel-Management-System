import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import ProfileMenu from "../../pages/Dashboard/ProfileMenu.tsx";
import { getUser } from "../../pages/Dashboard/dashboard.service.ts";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const user = getUser();

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="bg-white dark:bg-black dark:text-secondary h-18 sticky top-0 z-40 w-full shadow-xl">
      {/* Navbar Container */}
      <div className="flex justify-between items-center max-w-7xl mx-auto h-full px-6 md:px-14">
        {/* Logo */}
        <div className="font-bold text-lg">
          <h1>LUXE ESCAPE</h1>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <ProfileMenu user={user} />
          ) : (
            <>
              <Link
                to="/register"
                className="text-sm text-muted-foreground px-4 py-2 text-sm font-medium hover:text-blue-700 transition-colors"
              >
                Register
              </Link>

              <Link
                to="/login"
                className="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors hover:text-blue-700"
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
            className="cursor-pointer text-primary dark:text-secondary focus:outline-none z-50"
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
