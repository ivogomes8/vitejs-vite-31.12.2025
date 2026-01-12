import { MapPin, Sparkles } from "lucide-react";

export default function AIPlannerSection() {
  return (
    <section
      id="planner"
      className="py-24 bg-gradient-to-b from-purple-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 mb-4 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold">
            <Sparkles size={14} />
            POWERED BY GEMINI AI
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            RouteGenius AI Planner
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto">
            Not sure where to stop? Tell me what you love, and I'll suggest the
            perfect stopovers for your journey.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2">

            {/* LEFT FORM */}
            <div className="p-8 lg:p-10 bg-slate-50">
              <div className="space-y-8">

                {/* Direction */}
                <div className="bg-white rounded-2xl border border-purple-200 p-6">
                  <p className="text-xs font-bold text-purple-600 mb-4 tracking-widest">
                    DIRECTION
                  </p>

                  <div className="space-y-4">
                    <button className="w-full text-left px-4 py-3 rounded-xl border border-purple-400 bg-purple-50 font-semibold text-purple-700">
                      Start in Lisbon
                    </button>

                    <button className="w-full text-left px-4 py-3 rounded-xl border border-purple-400 bg-purple-50 font-semibold text-purple-700">
                      End in Lisbon
                    </button>

                    <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400">
                      <option>Algarve</option>
                      <option>Porto</option>
                      <option>Seville</option>
                    </select>
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <p className="text-xs font-bold text-purple-600 mb-3 tracking-widest">
                    YOUR INTERESTS
                  </p>

                  <textarea
                    placeholder="I love history, wine, and small villages..."
                    className="w-full min-h-[120px] px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                  />
                </div>

                {/* Button */}
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl shadow-lg transition">
                  Get Suggestions
                </button>
              </div>
            </div>

            {/* RIGHT RESULT */}
            <div className="p-8 lg:p-10 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <MapPin size={40} className="mx-auto mb-4 opacity-40" />
                <p className="italic">
                  Your custom route highlights will appear here.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}




