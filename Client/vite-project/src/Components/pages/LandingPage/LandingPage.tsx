import { Link } from "react-router-dom";

const LandingPage = () => (
  <div className="relative min-h-screen overflow-hidden bg-white text-black">
    <div className="pointer-events-none absolute left-[20%] top-[-20%] h-[600px] w-[600px] rounded-full bg-purple-700/20 blur-[160px]" />

    <main className="relative z-10 flex flex-col items-center px-4 pb-20 pt-28 text-center">
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-xs text-indigo-700">
        Your comfort, our priority
      </div>
      <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
        Stay in comfort, arrive with ease
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-500">
        Manage rooms, bookings, payments, and guest services in one clear and
        reliable platform.
      </p>
      <div className="mt-10 flex items-center gap-4">
        <Link
          to="/register"
          className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="rounded-lg border border-indigo-200 px-6 py-3 text-sm font-medium text-indigo-700 transition hover:border-indigo-400 hover:bg-indigo-50"
        >
          Sign In
        </Link>
      </div>
    </main>
  </div>
);

export default LandingPage;
