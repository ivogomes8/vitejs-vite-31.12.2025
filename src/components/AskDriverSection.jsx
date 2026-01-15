import { useState } from "react";
import { Send, Bot } from "lucide-react";
import { askGemini } from "../services/geminiService";
import { useAIContext } from "../context/AIContext";

export default function AskDriverSection() {
  const { plannerContext } = useAIContext();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    const prompt = `
You are Evo, a friendly private driver in Portugal.

Trip context:
- Direction: ${plannerContext.direction || "N/A"}
- Destination: ${plannerContext.destination || "N/A"}
- Interests: ${plannerContext.interests || "N/A"}
- Suggested route:
${plannerContext.suggestions || "No route generated yet"}

Answer clearly and concisely (max 3 sentences).

Question:
${question}
`;

    const response = await askGemini(prompt);
    setAnswer(response);
    setLoading(false);
  };

  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-slate-800 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <Bot className="text-blue-400" />
            <div>
              <h3 className="text-xl font-bold">Ask the Driver</h3>
              <p className="text-slate-400 text-sm">
                Questions about food, timing, culture or stops.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-1 rounded-xl px-4 py-3 text-black"
              placeholder="e.g. Where should we stop for lunch?"
            />
            <button
              onClick={handleAsk}
              disabled={loading}
              className="bg-blue-600 px-5 rounded-xl"
            >
              <Send />
            </button>
          </div>

          {(loading || answer) && (
            <div className="mt-6 bg-slate-700 p-4 rounded-xl whitespace-pre-line">
              {loading ? "Thinking…" : answer}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}



