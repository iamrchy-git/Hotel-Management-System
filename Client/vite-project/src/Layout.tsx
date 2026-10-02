// import LandingPage from './Components/pages/LandingPage/LandingPage.tsx'
// import Navbar from './Components/pages/Navbar/Navbar.tsx'

// const Layout = () => {
//   return (
//     <>
//     <Navbar/>
//     <LandingPage/>
//     </>

//   );
// }

// export default Layout
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Components/pages/Navbar/Navbar.tsx";
import { Footer } from "./Components/pages/LandingPage/PublicShared.tsx";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
