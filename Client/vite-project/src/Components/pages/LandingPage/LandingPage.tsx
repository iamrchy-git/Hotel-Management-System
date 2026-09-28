
import { Link } from 'react-router-dom';

const LandingPage = () => {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      {/* Background Purple Glow - matching your design */}
      <div className="absolute top-[-20%] left-[20%] w-600px h-600px bg-purple-700/20 rounded-full blur-[160px] pointer-events-none" />
     

      {/* ===== HERO SECTION ===== */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-28 pb-20">
        {/* Announcement badge */}
        <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-400 mb-8 bg-white/5 backdrop-blur-sm">
          Announcing our next round of funding.{' '}
          <a href="#" className="text-indigo-400 hover:underline font-medium">Read more →</a>
        </div>
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight max-w-3xl">
          Data to enrich your <br />
          online business
        </h1>
        {/* Subtext */}
        <p className="text-gray-400 text-base mt-6 max-w-xl leading-relaxed">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat.
        </p>
        {/* CTA Buttons */}
        <div className="flex items-center gap-4 mt-10">
          <Link
            to="/register"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-sm transition shadow-lg shadow-indigo-600/30">
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 rounded-lg font-medium text-sm transition">
            Sign In
          </Link>
        </div>
      </main>
    </div>

  );
}

export default LandingPage