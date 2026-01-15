import { useState } from "react";
import { MapPin, Clock, Navigation } from "lucide-react";

const routes = {
  porto: {
    label: "Lisbon ↔ Porto",
    time: "3h Direct / 6–8h with Stops",
    distance: "315km",
    title: "Lisbon ↔ Porto",
    description:
      "The most popular route in Portugal. Turn the transfer into a history lesson.",
    stops: [
      "Fátima Catholic Sanctuary",
      "Óbidos Medieval Town",
      "Nazaré",
      "Batalha Monastery",
      "Coimbra University",
      "Aveiro",
    ],
  },
  seville: {
    label: "Lisbon ↔ Seville",
    time: "4.5h Direct / 7–9h with Stops",
    distance: "450km",
    title: "Lisbon ↔ Seville",
    description:
      "A scenic cross-border journey into southern Spain with culture and history.",
    stops: [
      "Évora",
      "Monsaraz",
      "Mértola",
      "Aracena",
      "Seville Old Town",
    ],
  },
  algarve: {
    label: "Lisbon ↔ Algarve",
    time: "3h Direct / 5–6h with Stops",
    distance: "300km",
    title: "Lisbon ↔ Algarve",
    description:
      "From the capital to the sunny coast. Beaches, cliffs, and charming towns.",
    stops: [
      "Setúbal",
      "Arrábida Natural Park",
      "Comporta",
      "Albufeira",
      "Lagos",
    ],
  },
};

export default function RouteDetails() {
  const [activeRoute, setActiveRoute] = useState("porto");
  const route = routes[activeRoute];

  return (
    <section className="py-24 bg-slate-50" id="routes">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* COLUNA ESQUERDA */}
          <div className="flex flex-col gap-6 self-start">
            {Object.entries(routes).map(([key, r]) => (
              <button
                key={key}
                onClick={() => setActiveRoute(key)}
                className={`text-left rounded-2xl border px-6 py-5 transition shadow-sm
                  ${
                    activeRoute === key
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-200 bg-white hover:border-blue-400"
                  }
                `}
              >
                <h4 className="text-lg font-bold text-slate-900">
                  {r.label}
                </h4>

                <div className="mt-2 flex items-center gap-5 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {r.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Navigation size={14} />
                    {r.distance}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* COLUNA DIREITA */}
          <div className="flex flex-col items-start self-start w-full">

            {/* BLOCO AZUL — ALTURA LIVRE */}
            <div className="bg-blue-600 text-white rounded-3xl px-10 py-12 mb-14 shadow-lg h-auto self-start w-full">
              <h3 className="text-3xl font-bold mb-3">
                {route.title}
              </h3>
              <p className="text-blue-100 text-lg max-w-3xl">
                {route.description}
              </p>
            </div>

            {/* STOPS */}
            <div className="grid gap-6 w-full">
               {route.stops.map((stop, i) => (
                <div
                key={i}
                className="flex items-center gap-4 bg-white rounded-xl border border-slate-200 px-6 py-5 shadow-sm hover:shadow-md transition"
            >
                 <MapPin className="text-red-500" size={22} />
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


