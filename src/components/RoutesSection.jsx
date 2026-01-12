import { useState } from "react";
import { Clock, Navigation, MapPin } from "lucide-react";

const routes = [
  {
    id: 0,
    title: "Lisbon ↔ Porto",
    duration: "3h Direct / 6-8h with Stops",
    distance: "315km",
    description:
      "The most popular route in Portugal. Turn the transfer into a history lesson.",
    stops: [
      "Fátima Catholic Sanctuary",
      "Obidos Medieval Town",
      "Nazaré Giant Waves",
      "Batalha Monastery",
      "Coimbra University",
      "Aveiro",
    ],
  },
  {
    id: 1,
    title: "Lisbon ↔ Seville",
    duration: "4.5h Direct / 7-9h with Stops",
    distance: "450km",
    description:
      "A cross-border journey from Lisbon to the heart of Andalusia.",
    stops: ["Évora Old Town", "Monsaraz Castle", "Mérida Roman Ruins"],
  },
  {
    id: 2,
    title: "Lisbon ↔ Algarve",
    duration: "3h Direct / 5-6h with Stops",
    distance: "300km",
    description:
      "Travel south to Portugal’s sunny coast and dramatic cliffs.",
    stops: ["Azeitão Wine Tasting", "Palmela Castle", "Silves Castle"],
  },
];

export default function RoutesSection() {
  const [active, setActive] = useState(0);
  const route = routes[active];

  return (
    <section id="routes" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center text-slate-900 mb-12">
  Popular Transfer Routes
</h2>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT LIST */}
          <div className="space-y-6">
            {routes.map((r, i) => (
              <button
                key={r.id}
                onClick={() => setActive(i)}
                className={`w-full text-left p-6 rounded-2xl border-2 transition shadow-sm
                  ${
                    active === i
                      ? "border-blue-600 bg-white"
                      : "border-transparent bg-white hover:border-blue-200"
                  }`}
              >
                <h3
                  className={`text-xl font-bold mb-3 ${
                    active === i ? "text-blue-600" : "text-slate-900"
                  }`}
                >
                  {r.title}
                </h3>

                <div className="flex items-center gap-5 text-sm text-slate-600">
                  <span className="flex items-center gap-2">
                    <Clock size={16} />
                    {r.duration}
                  </span>
                  <span className="flex items-center gap-2">
                    <Navigation size={16} />
                    {r.distance}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* RIGHT DETAIL */}
          <div className="lg:col-span-2 rounded-3xl overflow-hidden shadow-xl bg-white min-h-[520px]">

            {/* BLUE HEADER */}
            <div className="bg-blue-600 px-10 py-10">
              <h3 className="text-3xl font-bold text-white mb-4">
                {route.title}
              </h3>
              <p className="text-blue-100 text-lg max-w-2xl">
                {route.description}
              </p>
            </div>

            {/* STOPS */}
            <div className="p-10 grid sm:grid-cols-2 gap-6 bg-white">
              {route.stops.map((stop, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-5 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <MapPin className="text-red-500" size={18} />
                  <span className="font-semibold text-slate-800">
                    {stop}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}





