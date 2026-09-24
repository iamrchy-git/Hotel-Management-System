import type { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

type ResponsiveMenuProps = {
    showMenu: boolean;
    setShowMenu: Dispatch<SetStateAction<boolean>>;
};

const ResponsiveMenu = ({ showMenu, setShowMenu }: ResponsiveMenuProps) => {
  return (
    <div className={`
            ${showMenu ? "left-0" : "left-[-1000%]"} 
            fixed top-18 bottom-0 z-50 w-[70%] bg-sky-950 text-white p-10 transition-all duration-500 md:hidden flex flex-col justify-between dark:bg-black dark:text-secondary font-semibold  px-14
        `}>
            <div>
                 
                <ul className="flex flex-col gap-8 text-xl">
                    <li>
                        <Link to="/" onClick={() => setShowMenu(false)}>Home</Link>
                    </li>
                    <li>
                        <Link to="/about" onClick={() => setShowMenu(false)}>About</Link>
                    </li>
                    <li>
                        <Link to="/project" onClick={() => setShowMenu(false)}>Project</Link>
                    </li>
                    <li>
                        <Link to="/contact" onClick={() => setShowMenu(false)}>Contact</Link>
                    </li>
                </ul>
            </div>
        </div>
  )
}

export default ResponsiveMenu
