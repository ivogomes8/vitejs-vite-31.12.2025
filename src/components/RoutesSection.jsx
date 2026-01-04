import { MapPin, Clock, Car } from "lucide-react";

export default function RoutesSection() {
  const routes = [
    { name: "Lisbon ↔ Porto", icon: <MapPin size={20} /> },
    { name: "Lisbon ↔ Seville", icon: <Clock size={20} /> },
    { name: "Lisbon ↔ Algarve", icon: <Car size={20} /> },
  ];

  return (
    <section className="bg-gray-50 text-gray-800 p-20 text-center">
      <h2 className="text-4xl font-bold mb-10">Popular Transfer Routes</h2>
      <div className="flex flex-col md:flex-row justify-center gap-8">
        {routes.map((r) => (
          <div
            key={r.name}
            className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-3 hover:scale-105 transform transition"
          >
            {r.icon} <span className="font-semibold">{r.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}




