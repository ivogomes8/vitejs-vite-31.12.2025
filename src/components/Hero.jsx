import {
  Clock,
  Camera,
  Users,
  Navigation,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[720px] w-full overflow-hidden">

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />

      {/* Dark blue overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-900/60" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex items-center">
        <div className="grid lg:grid-cols-2 gap-20 items-center w-full">

          {/* LEFT TEXT */}
          <div>
            <h1 className="text-[56px] leading-[1.1] font-extrabold text-white mb-6">
              More Than Just A <br />
              <span className="text-[#6CB6FF]">Transfer Service.</span>
            </h1>

            <p className="text-[18px] text-slate-300 max-w-xl mb-10">
              Experience the beauty of Portugal and Spain with a local private
              driver. Comfort, reliability, and custom sightseeing at your own
              pace.
            </p>

            <div className="flex gap-4">
              <button className=" flex items-center gap-2 bg-[#8B3DFF] hover:bg-[#7A2FE6] px-6 py-4 rounded-xl font-semibold shadow-lg transition text-white">
                <Sparkles size={18} />
                Plan Your Trip
              </button>

              <button className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] px-6 py-4 rounded-xl font-semibold shadow-lg transition text-white">
                Get a Quote
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* RIGHT CARDS */}
          <div className="grid grid-cols-2 gap-6">
            <FeatureCard
              icon={Clock}
              title="Your Time"
              text="Drive on your schedule, not a bus or train timetable."
            />
            <FeatureCard
              icon={Camera}
              title="Sightseeing"
              text="Custom stops at castles, villages, and viewpoints."
            />
            <FeatureCard
              icon={Users}
              title="Spacious Van"
              text="9-Seater with air conditioning, tinted windows and huge luggage capacity."
            />
            <FeatureCard
              icon={Navigation}
              title="Door-to-Door"
              text="Stress-free pickup from your hotel or airport."
            />
          </div>

        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, text }) {
  return (
    <div className="bg-[#2A3443]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
      <Icon className="text-[#6CB6FF] mb-4" size={26} />
      <h3 className="text-[20px] font-bold text-white mb-2">
        {title}
      </h3>
      <p className="text-slate-300 text-[14px] leading-relaxed">
        {text}
      </p>
    </div>
  );
}









