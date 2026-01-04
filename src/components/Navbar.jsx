import { MapPin, Car, Clock } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-2xl text-purple-700 flex items-center gap-2">
          <Car size={28} /> Evo Lisbon Driver
        </div>
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <button className="flex items-center gap-1 hover:text-purple-600 transition">
            <MapPin size={16} /> About
          </button>
          <button className="flex items-center gap-1 hover:text-purple-600 transition">
            <Clock size={16} /> Routes
          </button>
          <button className="hover:text-purple-600 transition">Pricing</button>
          <button className="hover:text-purple-600 font-bold">AI Planner</button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 shadow">
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}


