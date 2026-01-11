import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="text-blue-600">
              {/* Ícone do carro (SVG simples para não depender de libs extras) */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 16H9m10 0h-1l-1-3H7L6 16H5" />
                <path d="M3 16v-3l1-5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2l1 5v3" />
                <circle cx="7.5" cy="16.5" r="1.5" />
                <circle cx="16.5" cy="16.5" r="1.5" />
              </svg>
            </div>

            <span className="text-xl font-extrabold text-slate-900">
              Evo Lisbon Driver
            </span>
          </div>

          {/* NAV LINKS */}
          <nav className="hidden md:flex items-center gap-10">
            <a
              href="#about"
              className="text-slate-600 font-semibold hover:text-slate-900 transition"
            >
              About
            </a>
            <a
              href="#routes"
              className="text-slate-600 font-semibold hover:text-slate-900 transition"
            >
              Routes
            </a>
            <a
              href="#pricing"
              className="text-slate-600 font-semibold hover:text-slate-900 transition"
            >
              Pricing
            </a>

            <a
              href="#planner"
              className="flex items-center gap-2 font-semibold text-purple-600 hover:text-purple-700 transition"
            >
              <Sparkles size={16} />
              AI Planner
            </a>
          </nav>

          {/* CTA */}
          <div className="flex items-center">
            <a
              href="#quote"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full shadow-md transition"
            >
              Book Now
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}


