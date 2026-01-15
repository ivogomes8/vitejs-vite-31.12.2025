import {
  Sparkles,
  ChevronRight,
  Clock,
  Camera,
  Users,
  Navigation
} from "lucide-react";

export default function Hero() {
  const scrollToSection = (id) => {
  const target = document.getElementById(id);
  if (!target) return;

  const offset = 80; // altura do navbar
  const position =
    target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: position,
    behavior: "smooth",
  });
};
  return (
    <section
      className="relative text-white overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/hero-bg.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/60 md:from-slate-900/70 md:to-slate-900/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-28">
        <div className="grid gap-14 md:grid-cols-2 items-center">

          {/* LEFT */}
          <div>
            <h1 className="text-4xl leading-tight font-extrabold md:text-6xl">
              More Than Just A <br />
              <span className="text-blue-400">Transfer Service.</span>
            </h1>

            <p className="mt-5 text-base text-slate-200 md:text-lg max-w-xl">
              Experience the beauty of Portugal and Spain with a local private driver.
              Comfort, reliability, and custom sightseeing at your own pace.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                  onClick={() => scrollToSection("planner")}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-xl font-semibold shadow-lg transition"
>
                 <Sparkles size={18} />
                     Plan Your Trip
              </button>

              <button
                   onClick={() => scrollToSection("pricing")}
                   className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-semibold shadow-lg transition"
>
                     Get a Quote
                   <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Feature
              icon={<Clock size={26} />}
              title="Your Time"
              text="Drive on your schedule, not a bus or train timetable."
            />
            <Feature
              icon={<Camera size={26} />}
              title="Sightseeing"
              text="Custom stops at castles, villages, and viewpoints."
            />
            <Feature
              icon={<Users size={26} />}
              title="Spacious Van"
              text="9-seater with air conditioning and large luggage space."
            />
            <Feature
              icon={<Navigation size={26} />}
              title="Door-to-Door"
              text="Stress-free pickup from your hotel or airport."
            />
          </div>

        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="bg-slate-800/80 backdrop-blur rounded-2xl p-5 md:p-6 shadow-md">
      <div className="text-blue-400 mb-3">{icon}</div>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-sm text-slate-200">{text}</p>
    </div>
  );
}







