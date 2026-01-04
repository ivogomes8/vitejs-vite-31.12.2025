import {
  Clock,
  Camera,
  Users,
  Navigation,
  ShieldCheck,
  MessageCircle,
  Utensils,
  Sparkles,
  Wifi,
  Droplets,
  Baby,
  BadgeCheck
} from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Your Time",
    text: "Drive on your schedule, not a bus or train timetable."
  },
  {
    icon: Camera,
    title: "Sightseeing",
    text: "Custom stops at castles, villages, and viewpoints."
  },
  {
    icon: Users,
    title: "Spacious Van",
    text: "9-seater with air conditioning, tinted windows and large luggage space."
  },
  {
    icon: Navigation,
    title: "Door-to-Door",
    text: "Stress-free pickup directly from your hotel or airport."
  },
  {
    icon: ShieldCheck,
    title: "Fully Insured",
    text: "Licensed and fully insured professional service."
  },
  {
    icon: MessageCircle,
    title: "English Speaking Driver",
    text: "Clear communication throughout your journey."
  },
  {
    icon: Utensils,
    title: "Local Tips",
    text: "Recommendations for food, wine and authentic local spots."
  },
  {
    icon: Sparkles,
    title: "Flexible Schedule",
    text: "Stops and timing adapted to your preferences."
  },
  {
    icon: Wifi,
    title: "Free Wi-Fi",
    text: "Stay connected during the entire trip."
  },
  {
    icon: Droplets,
    title: "Bottled Water",
    text: "Complimentary bottled water on board."
  },
  {
    icon: Baby,
    title: "Baby Seats",
    text: "Child and baby seats available on request."
  },
  {
    icon: BadgeCheck,
    title: "Licensed Driver",
    text: "Official RNAT licensed professional driver."
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Travel With Me
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-slate-800/80 backdrop-blur rounded-2xl p-6 border border-white/10 hover:border-blue-400/40 transition"
              >
                <Icon className="text-blue-400 mb-4" size={28} />
                <h3 className="text-xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
