import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pickup: "",
    destination: "",
    date: "",
    passengers: "2",
    sightseeing: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = `
New Quote Request – Evo Lisbon Driver

Name: ${formData.name}
Email: ${formData.email}
Pickup Location: ${formData.pickup}
Destination: ${formData.destination}
Date of Travel: ${formData.date}
Number of Passengers: ${formData.passengers}
Sightseeing Stops: ${formData.sightseeing ? "Yes" : "No"}

Additional Details:
${formData.message}
`;

    // WhatsApp
    const whatsappURL =
      "https://wa.me/351964417917?text=" +
      encodeURIComponent(text);

    window.open(whatsappURL, "_blank");
  };

  return (
    <section id="quote" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* HEADER AZUL */}
          <div className="bg-blue-600 text-center px-8 py-12">
            <h2 className="text-3xl font-extrabold text-white mb-3">
              Request a Quote
            </h2>

            <p className="text-blue-100 max-w-xl mx-auto mb-6">
              Ready for a custom quote? Send your travel details below and I’ll
              get back to you shortly.
            </p>

            <a
              href="https://wa.me/351964417917"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow-md transition"
            >
              <MessageCircle size={18} />
              WhatsApp Me Directly
            </a>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="p-10 space-y-8">

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* FULL NAME */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                  Full Name
                </label>
                <input
                  name="name"
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* PICKUP */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                  Pickup Location
                </label>
                <input
                  name="pickup"
                  onChange={handleChange}
                  placeholder="Hotel/Airport name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* DESTINATION */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                  Destination
                </label>
                <input
                  name="destination"
                  onChange={handleChange}
                  placeholder="City address"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* DATE */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                  Date of Travel
                </label>
                <input
                  type="date"
                  name="date"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* PASSENGERS */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                  Number of Passengers
                </label>
                <select
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
            </div>

            {/* CHECKBOX */}
            <label className="flex items-start gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                name="sightseeing"
                onChange={handleChange}
                className="mt-1"
              />
              Interested in sightseeing stops along the way? I’ll incorporate
              them into your personalized quote.
            </label>

            {/* MESSAGE */}
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                Additional Details / Questions
              </label>
              <textarea
                name="message"
                onChange={handleChange}
                rows={4}
                placeholder="e.g. Traveling with several large suitcases, child seat needed, or specific sightseeing requests..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg transition"
            >
              Send Quote Request
              <Send size={18} />
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}
