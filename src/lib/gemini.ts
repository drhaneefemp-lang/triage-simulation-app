import { GoogleGenAI, Type } from "@google/genai";
import { PatientScenario } from "../types";
import { fallbackScenarios } from "./scenarios";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const schema = {
  type: Type.OBJECT,
  properties: {
    age: { type: Type.NUMBER, description: "Patient age in years" },
    gender: { type: Type.STRING, description: "Male or Female" },
    complaint: { type: Type.STRING, description: "Chief complaint and brief history" },
    vitals: {
      type: Type.OBJECT,
      properties: {
        hr: { type: Type.NUMBER, description: "Heart Rate (bpm)" },
        sbp: { type: Type.NUMBER, description: "Systolic BP (mmHg)" },
        dbp: { type: Type.NUMBER, description: "Diastolic BP (mmHg)" },
        spo2: { type: Type.NUMBER, description: "Oxygen Saturation (%)" },
        grbs: { type: Type.NUMBER, description: "Random Blood Sugar (mg/dL)" },
        rr: { type: Type.NUMBER, description: "Respiratory Rate (breaths/min)" },
        temp: { type: Type.NUMBER, description: "Temperature in Celsius" }
      },
      required: ["hr", "sbp", "dbp", "spo2", "grbs", "rr", "temp"]
    },
    correctTriage: { type: Type.STRING, description: "RED, ORANGE, YELLOW, or GREEN" },
    explanation: { type: Type.STRING, description: "Clinical reasoning for the triage category based on Indian ED protocols" }
  },
  required: ["age", "gender", "complaint", "vitals", "correctTriage", "explanation"]
};

export async function generateScenario(): Promise<PatientScenario> {
  const prompt = `Generate a realistic clinical triage scenario for an Emergency Department in India.
  
Triage Guidelines (Indian ED context):
- RED (Resuscitation / Immediate): SpO2 < 90%, HR < 40 or > 130, SBP < 90, GRBS < 40 or > 400 (with symptoms), RR < 10 or > 30.
- ORANGE (Urgent - 10 mins): SpO2 90-93%, HR 120-130 or 40-50, SBP 90-100 or > 200, GRBS 40-60 or 300-400, RR 25-30.
- YELLOW (Less Urgent - 60 mins): SpO2 94-95%, HR 100-120 or 50-60, SBP 100-110 or 160-200, GRBS 60-80 or 200-300, RR 20-24.
- GREEN (Non-Urgent - 120 mins): Normal vitals, minor complaints. SpO2 >= 96%, HR 60-100, SBP 110-160, GRBS 80-200, RR 12-20.

Make the scenarios varied (some trauma, some medical, some pediatric, some geriatric). Ensure the vitals match the correct triage category.
Return ONLY a JSON object matching the schema.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No text returned from Gemini");
    
    const data = JSON.parse(text);
    return {
      id: crypto.randomUUID(),
      ...data
    };
  } catch (error) {
    console.error("Error generating scenario, using fallback:", error);
    const randomIndex = Math.floor(Math.random() * fallbackScenarios.length);
    return fallbackScenarios[randomIndex];
  }
}
