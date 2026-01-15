import { useState } from "react";
import { Sparkles } from "lucide-react";
import { askGemini } from "../services/geminiService";
import { useAIContext } from "../context/AIContext";

export default function AIPlannerSection() {
  const { setPlannerContext } = useAIContext();

  const [direction, setDirection] = useState("from");
  const [destination, setDestination] = useState("Algarve");
  const [interests, setInterests] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!interests.trim()) return;

    setLoading(true);
    setResult("");

    const prompt = `
You are a professional private driver in Portugal.

Trip:
${direction === "from" ? "Start in Lisbon" : "End in Lisbon"}
Destination: ${destination}

Traveler interests:
${interests}

Suggest 3 to 5 sightseeing stopovers with short descriptions.
Friendly and professional tone.
`;

    const response = await askGemini(prompt);

    setResult(response);

    setPlannerContext({
      direction,
      destination,
      interests,
      suggestions: response,
    });

    setLoading(false);
  };

  return (
    <section className="py-24" id="planner">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">
          RouteGenius AI Planner
        </h2>

        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
          <div className="flex gap-3">
            <button
              onClick={() => setDirection("from")}
              className={`flex-1 p-3 rounded-xl ${
                direction === "from"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-100"
              }`}
            >
              Start in Lisbon
            </button>
            <button
              onClick={() => setDirection("to")}
              className={`flex-1 p-3 rounded-xl ${
                direction === "to"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-100"
              }`}
            >
              End in Lisbon
            </button>
          </div>

          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Destination"
          />

          <textarea
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            rows={3}
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Your interests (food, history, beaches...)"
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-4 rounded-xl font-bold"
          >
            <Sparkles size={18} />
            {loading ? "Planning..." : "Get Suggestions"}
          </button>

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
                      <option>Salamanca</option>
                      <option>Madrid</option>
                      <option>Santiago de Compostela</option>
                      <option>Málaga</option>
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
          )}
        </div>
      </div>
    </section>
  );
}







