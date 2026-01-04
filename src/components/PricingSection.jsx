import { CheckCircle, XCircle, Calculator } from "lucide-react";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

        {/* LEFT SIDE */}
        <div>
          <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-6">
            <Calculator size={16} />
            FAIR & TRANSPARENT
          </span>

          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            How I Calculate Quotes
          </h2>

          <p className="text-slate-600 text-lg mb-10 max-w-xl">
            Every trip is unique. Instead of fixed prices that might overcharge
            you, I use a transparent formula based on distance and time. This
            ensures you only pay for your specific journey, including any
            custom sightseeing stops.
          </p>

          {/* Price Cards */}
          <div className="flex flex-col sm:flex-row gap-6 mb-6">
            <PriceCard
              price="€1.25"
              title="Per Kilometer"
              subtitle="Base distance traveled"
            />
            <PriceCard
              price="€20"
              title="Per Hour"
              subtitle="Driving & waiting time"
            />
          </div>

          <p className="text-sm text-slate-400 italic max-w-xl">
            *Final quotes may vary based on specific local parking fees or
            extended overnight stays for multi-day tours.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-8">
          <InfoCard
            title="What's included?"
            color="green"
            items={[
              "All Motorway Tolls, Fuel & Taxes",
              "Complementary Bottled Water & Wi-Fi",
            ]}
          />

          <InfoCard
            title="Not included?"
            color="red"
            items={[
              "Attraction Tickets (Monuments, Castles, etc.)",
              "Individual Meal Costs",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- Components ---------- */

function PriceCard({ price, title, subtitle }) {
  return (
    <div className="flex items-center gap-4 bg-blue-600 text-white rounded-2xl px-6 py-5 shadow-lg min-w-[220px]">
      <div className="text-3xl font-bold">
        {price}
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-blue-100 text-sm">{subtitle}</p>
      </div>
    </div>
  );
}

function InfoCard({ title, items, color }) {
  const isGreen = color === "green";

  return (
    <div
      className={`rounded-2xl p-6 border ${
        isGreen
          ? "bg-white border-green-200"
          : "bg-white border-red-200"
      }`}
    >
      <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
        {isGreen ? (
          <CheckCircle className="text-green-500" size={22} />
        ) : (
          <XCircle className="text-red-500" size={22} />
        )}
        {title}
      </h3>

      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-slate-700">
            {isGreen ? (
              <CheckCircle size={18} className="text-green-500" />
            ) : (
              <XCircle size={18} className="text-red-500" />
            )}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
