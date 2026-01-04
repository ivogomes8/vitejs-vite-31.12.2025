import { MapPin } from "lucide-react";

const routes = {
  porto: {
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
};

export default function RouteDetails() {
  const route = routes.porto;

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">

        {/* Top Blue Card */}
        <div className="bg-blue-600 text-white rounded-3xl px-10 py-12 mb-14 shadow-lg">
          <h3 className="text-3xl font-bold mb-3">
            {route.title}
          </h3>
          <p className="text-blue-100 text-lg max-w-3xl">
            {route.description}
          </p>
        </div>

        {/* Stops */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
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
    </section>
  );
}
