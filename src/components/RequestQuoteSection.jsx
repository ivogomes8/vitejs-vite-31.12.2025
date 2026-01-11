import { ChevronRight, Calendar, Users } from "lucide-react";

export default function RequestQuoteSection() {
  return (
    <section id="quote" className="py-24 bg-slate-100">
      <div className="max-w-5xl mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* HEADER */}
          <div className="bg-blue-600 text-center px-6 py-10">
            <h2 className="text-3xl font-extrabold text-white mb-2">
              Request a Quote
            </h2>
            <p className="text-blue-100 max-w-xl mx-auto mb-6">
              Ready for a custom quote? Send your travel details below and I’ll
              get back to you shortly.
            </p>

            <a
              href="https://wa.me/351964417917"
              target="_blank"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
            >
              WhatsApp Me Directly
            </a>
          </div>

          {/* FORM */}
          <form className="p-8 md:p-10 grid gap-6">

            {/* ROW 1 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2">
                  FULL NAME
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* ROW 2 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2">
                  PICKUP LOCATION
                </label>
                <input
                  type="text"
                  placeholder="Hotel/Airport name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2">
                  DESTINATION
                </label>
                <input
                  type="text"
                  placeholder="City or address"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* ROW 3 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2">
                  DATE OF TRAVEL
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="date"
                    className="w-full pl-11 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2">
                  NUMBER OF PASSENGERS
                </label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <select className="w-full pl-11 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>1 Person</option>
                    <option>2 People</option>
                    <option>3 People</option>
                    <option>4+ People</option>
                  </select>
                </div>
              </div>
            </div>

            {/* CHECKBOX */}
            <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4">
              <input type="checkbox" className="mt-1" />
              <p className="text-sm text-slate-600">
                Interested in sightseeing stops along the way? I’ll incorporate
                them into your personalized quote.
              </p>
            </div>

            {/* TEXTAREA */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2">
                ADDITIONAL DETAILS / QUESTIONS
              </label>
              <textarea
                placeholder="e.g. Traveling with several large suitcases, child seat needed, or specific sightseeing requests..."
                className="w-full min-h-[120px] px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              Send Quote Request
              <ChevronRight size={18} />
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}
