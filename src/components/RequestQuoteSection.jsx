import { useState } from "react";
import { Calculator } from "lucide-react";

export default function RequestQuote() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    pickup: "",
    dropoff: "",
    date: "",
    passengers: 1,
    stops: false,
  });

  const BASE_KM_PRICE = 1.25;
  const BASE_HOUR_PRICE = 20;
  const ESTIMATED_KM = 300; // estimativa média
  const ESTIMATED_HOURS = 3;

  const extraPassengers =
    form.passengers > 2 ? (form.passengers - 2) * 10 : 0;

  const estimatedPrice =
    ESTIMATED_KM * BASE_KM_PRICE +
    ESTIMATED_HOURS * BASE_HOUR_PRICE +
    extraPassengers;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT */}
        <div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Request a Quote
          </h2>
          <p className="text-slate-600 mb-6">
            Fill in your trip details and receive a personalized quote.
          </p>

          <div className="space-y-4">
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full p-3 rounded-lg border"
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="w-full p-3 rounded-lg border"
            />

            <input
              name="pickup"
              placeholder="Pickup Location"
              onChange={handleChange}
              className="w-full p-3 rounded-lg border"
            />

            <input
              name="dropoff"
              placeholder="Destination"
              onChange={handleChange}
              className="w-full p-3 rounded-lg border"
            />

            <input
              name="date"
              type="date"
              onChange={handleChange}
              className="w-full p-3 rounded-lg border"
            />

            {/* PASSENGERS */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Number of Passengers
              </label>
              <select
               name="passengers"
                value={form.passengers}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200"
              >
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5">5 People</option>
                <option value="6">6 People</option>
                <option value="7">7 People</option>
             </select>

            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="stops"
                onChange={handleChange}
              />
              Interested in sightseeing stops?
            </label>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
              Send Quote Request
            </button>
          </div>
        </div>

        {/* RIGHT – ESTIMATE */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="text-blue-600" />
            <h3 className="text-xl font-bold">
              Estimated Price
            </h3>
          </div>

          <p className="text-4xl font-bold text-slate-900 mb-2">
            €{Math.round(estimatedPrice)}
          </p>

          <p className="text-sm text-slate-500">
            *Final quotes may vary based on distance, time, parking fees or
            extended overnight stays for multi-day tours.
          </p>
        </div>
      </div>
    </section>
  );
}

