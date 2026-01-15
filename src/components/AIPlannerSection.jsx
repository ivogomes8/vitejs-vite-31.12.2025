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

          {result && (
            <div className="whitespace-pre-line text-slate-700 bg-slate-50 p-6 rounded-xl">
              {result}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}







