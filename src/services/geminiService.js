export async function askGemini(prompt) {
  try {
    const response = await fetch("/.netlify/functions/gemini", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response."
    );
  } catch (error) {
    console.error("Gemini fetch error:", error);
    return "Erro de conexão com o serviço de IA";
  }
}


