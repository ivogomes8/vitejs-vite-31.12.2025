import { ShieldCheck, MessageCircle, Utensils, Sparkles } from "lucide-react";

import driverPhoto from "../assets/driver.jpg";
import { ShieldCheck, MessageCircle, Utensils, Sparkles } from "lucide-react";

export default function MeetYourDriver() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-4xl font-bold text-center text-slate-900">
          Meet Your Driver
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-14 rounded-full"></div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-14 items-center mb-16">

          {/* PHOTO */}
          <div className="flex justify-center">
            <img
              src={driverPhoto}
              alt="Private Driver Lisbon"
              className="rounded-3xl shadow-lg w-full max-w-sm object-cover"
            />
          </div>

          {/* TEXT */}
          <div>
            <p className="text-xl italic text-slate-700 mb-6">
              “Hi, I'm Evo. I've been professionally driving for over 8 years
              across the stunning landscapes of Portugal and Spain.”
            </p>

            <p className="text-slate-600 text-lg leading-relaxed">
              Throughout these years, I've gathered the deep local knowledge
              necessary to provide more than just a ride. My goal is to ensure a
              safe, smooth, and completely stress-free transfer experience.
              <br /><br />
              Along the way, I love sharing recommendations and sightseeing tips
              to ensure you make the absolute best out of your travels in my home
              region.
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-center">
          <Badge icon={ShieldCheck} title="Fully Insured" />
          <Badge icon={MessageCircle} title="English Fluency" />
          <Badge icon={Utensils} title="Food & Sightseeing Tips" />
          <Badge icon={Sparkles} title="Schedule Flexibility" />
        </div>
      </div>
    </section>
  );
}

function Badge({ icon: Icon, title }) {
  return (
    <div className="flex items-center justify-center gap-3 bg-slate-50 border border-slate-200 rounded-xl py-5 px-6 shadow-sm">
      <Icon className="text-blue-600" size={22} />
      <span className="font-semibold text-slate-800">
        {title}
      </span>
    </div>
  );
}
