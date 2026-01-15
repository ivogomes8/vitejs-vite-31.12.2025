import { Car, Sparkles } from "lucide-react";

export default function Navbar() {

  const slowScrollTo = (id) => {
    const target = document.getElementById(id);
    if (!target) return;

    const headerOffset = 80;
    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - headerOffset;

    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let startTime = null;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeOutCubic(progress);

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const slowScrollToTop = () => {
    const startPosition = window.scrollY;
    const duration = 800;
    let startTime = null;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeOutCubic(progress);

      window.scrollTo(0, startPosition * (1 - ease));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div
          onClick={slowScrollToTop}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Car className="w-7 h-7 text-blue-600" />
          <span className="text-lg font-bold text-slate-900">
            Evo Lisbon Driver
          </span>
        </div>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-8 text-slate-700 font-medium">
          <button
            onClick={() => slowScrollTo("about")}
            className="hover:text-blue-600 transition"
          >
            About
          </button>

          <button
            onClick={() => slowScrollTo("routes")}
            className="hover:text-blue-600 transition"
          >
            Routes
          </button>

          <button
            onClick={() => slowScrollTo("pricing")}
            className="hover:text-blue-600 transition"
          >
            Pricing
          </button>

          <button
            onClick={() => slowScrollTo("planner")}
            className="flex items-center gap-1 text-purple-600 font-semibold hover:text-purple-700 transition"
          >
            <Sparkles className="w-4 h-4" />
            AI Planner
          </button>
        </nav>

        {/* CTA */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold shadow">
          Book Now
        </button>
      </div>
    </header>
  );
}



