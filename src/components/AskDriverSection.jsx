import { Bot, Send } from "lucide-react";

export default function AskDriverSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center gap-8">

          {/* ICON */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center">
              <Bot className="text-blue-400" size={32} />
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex-1 w-full">
            <h3 className="text-2xl font-extrabold text-white mb-1">
              Ask the Driver
            </h3>
            <p className="text-slate-300 mb-6">
              Quick questions about travel, culture, or local tips.
            </p>

            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="e.g. Do I need to tip in Portugal?"
                className="flex-1 bg-slate-700/60 text-white placeholder-slate-400 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button className="bg-blue-600 hover:bg-blue-700 p-4 rounded-xl transition flex items-center justify-center">
                <Send className="text-white" size={20} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
