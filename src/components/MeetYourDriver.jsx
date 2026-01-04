import { ShieldCheck, MessageCircle, Utensils, Sparkles } from "lucide-react";

export default function MeetYourDriver() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Title */}
        <h2 className="text-4xl font-bold text-slate-900">
          Meet Your Driver
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-12 rounded-full"></div>

        {/* Main Card */}
        <div className="bg-slate-50 rounded-3xl shadow-sm px-10 py-14 mb-16">
          <p className="text-xl italic text-slate-700 mb-10">
            “Hi, I'm Evo. I've been professionally driving for over 8 years
            across the stunning landscapes of Portugal and Spain.”
          </p>

          <p className="text-slate-600 text-lg leading-relaxed max-w-4xl mx-auto">
            Throughout these years, I've gathered the deep local knowledge
            necessary to provide more than just a ride. My goal is to ensure a
            safe, smooth, and completely stress-free transfer experience.
            <br /><br />
            Along the way, I love sharing recommendations and sightseeing tips
            to ensure you make the absolute best out of your travels in my home
            region.
          </p>
        </div>

        {/* Badges */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Badge
            icon={ShieldCheck}
            title="Fully Insured"
          />
          <Badge
            icon={MessageCircle}
            title="English Fluency"
          />
          <Badge
            icon={Utensils}
            title="Food & Sightseeing Tips"
          />
          <Badge
            icon={Sparkles}
            title="Schedule Flexibility"
          />
        </div>
      </div>
    </section>
  );
}

function Badge({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-3 justify-center bg-white border border-slate-200 rounded-xl py-5 px-6 shadow-sm">
      <Icon className="text-blue-600" size={22} />
      <span className="font-semibold text-slate-800">
        {title}
      </span>
    </div>
  );
}
