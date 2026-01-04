import { MapPin, Clock } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-20 text-center space-y-6">
      <h1 className="text-5xl md:text-6xl font-extrabold flex justify-center items-center gap-3">
        <MapPin size={32} /> More Than Just A Transfer Service
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto">
        Experience the beauty of Portugal and Spain with a local private driver. Comfort, reliability, and sightseeing at your own pace.
      </p>
      <button className="mt-6 px-8 py-4 bg-white text-purple-700 font-bold rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-100 transition flex items-center gap-2 justify-center">
        <Clock size={20} /> Plan Your Trip
      </button>
    </section>
  );
}








