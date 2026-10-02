import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { toast } from "sonner";
import { logout, type User } from "./dashboard.service.ts";
import { Avatar } from "./ui.tsx";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/dashboard/profile", label: "Profile" },
];

const ProfileMenu = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full p-1 transition hover:bg-gray-100"
        aria-label="Profile menu"
        title="Profile menu"
      >
        <Avatar user={user} />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-1 text-sm text-black shadow-lg">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 hover:bg-gray-50"
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 border-t border-gray-100 px-4 py-2 text-left text-red-600 hover:bg-gray-50"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
