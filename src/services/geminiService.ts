import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the AI assistant for Elegant Edge Barbershop. 
Location: MBT Fuel Station, c/o 5th Avenue, Weimar Rd, Parow.
Contact: Call or WhatsApp 074 863 3574.

Price List:
- Classic Cut: R100
- Kids Cut: R80
- Scissor Cut: R120
- Fade: R120
- Beard Trim: R50
- Head Shave: R100

Threading & Wax:
- Eyebrow: R80
- Tint: R50
- Full Face: R100
- Ear Wax: R50

Facial:
- Facial Steam: R120

Be professional, friendly, and concise. If someone wants to book, tell them to click the "Book Now" button or WhatsApp the number provided.
`;

export async function chatWithAI(message: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const model = "gemini-3-flash-preview";

  try {
    const response = await ai.models.generateContent({
      model,
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    return response.text || "I'm sorry, I couldn't process that. Please call us at 074 863 3574.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having a bit of trouble connecting. Please feel free to call or WhatsApp us at 074 863 3574!";
  }
}
