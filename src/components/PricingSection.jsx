import { CheckCircle, Calculator } from "lucide-react";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Wrapper */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 lg:p-14">

          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* LEFT */}
            <div>
               {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
                <Calculator size={16} />
                FAIR & TRANSPARENT
              </div>


              <h2 className="text-4xl font-extrabold text-slate-900 mb-6">
                How I Calculate Quotes
              </h2>

              <p className="text-slate-600 text-lg leading-relaxed mb-10">
                Every trip is unique. Instead of fixed prices that might
                overcharge you, I use a transparent formula based on distance
                and time. This ensures you only pay for your specific journey,
                including any custom sightseeing stops.
              </p>

              {/* Price blocks */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-5">
                  <div className="bg-blue-600 text-white rounded-2xl px-6 py-4 text-2xl font-extrabold">
                    €1.25
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Per Kilometer</p>
                    <p className="text-slate-600 text-sm">
                      Base distance traveled
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="bg-blue-600 text-white rounded-2xl px-6 py-4 text-2xl font-extrabold">
                    €20
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Per Hour</p>
                    <p className="text-slate-600 text-sm">
                      Driving & waiting time
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT – WHAT'S INCLUDED */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
                <CheckCircle className="text-blue-600" />
                What’s included?
              </h3>

              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500" />
                  <span className="text-slate-700">
                    All Motorway Tolls, Fuel & Taxes
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500" />
                  <span className="text-slate-700">
                    Complementary Bottled Water & Wi-Fi
                  </span>
                </li>
              </ul>
            </div>
            <p className="mt-6 text-sm italic text-slate-500">
              *Final quotes may vary based on specific local parking fees or
               extended overnight stays for multi-day tours.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
