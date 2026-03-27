import { PatientScenario } from "../types";

export const fallbackScenarios: PatientScenario[] = [
  {
    id: "sc-001",
    age: 65,
    gender: "Male",
    complaint: "Severe crushing chest pain radiating to left arm, sweating profusely.",
    vitals: { hr: 110, sbp: 85, dbp: 50, spo2: 92, grbs: 140, rr: 24, temp: 37.1 },
    correctTriage: "RED",
    explanation: "Patient has signs of acute myocardial infarction with cardiogenic shock (SBP < 90). Requires immediate resuscitation."
  },
  {
    id: "sc-002",
    age: 22,
    gender: "Female",
    complaint: "Acute exacerbation of asthma, speaking in single words, audible wheeze.",
    vitals: { hr: 135, sbp: 120, dbp: 80, spo2: 88, grbs: 110, rr: 32, temp: 37.0 },
    correctTriage: "RED",
    explanation: "Severe respiratory distress with SpO2 < 90% and HR > 130. This is a life-threatening asthma attack."
  },
  {
    id: "sc-003",
    age: 45,
    gender: "Male",
    complaint: "Fever for 3 days, cough with yellowish sputum, feeling weak.",
    vitals: { hr: 115, sbp: 105, dbp: 65, spo2: 94, grbs: 125, rr: 22, temp: 39.2 },
    correctTriage: "YELLOW",
    explanation: "Likely lower respiratory tract infection. Vitals are mildly deranged (SpO2 94%, HR 115) but not immediately life-threatening. Can wait up to 60 mins."
  },
  {
    id: "sc-004",
    age: 72,
    gender: "Female",
    complaint: "Found unresponsive at home by son. Known diabetic.",
    vitals: { hr: 125, sbp: 140, dbp: 85, spo2: 96, grbs: 35, rr: 18, temp: 36.5 },
    correctTriage: "RED",
    explanation: "Severe hypoglycemia (GRBS < 40) with altered mental status. Requires immediate IV dextrose."
  },
  {
    id: "sc-005",
    age: 28,
    gender: "Male",
    complaint: "Twisted ankle while playing football, swelling and pain.",
    vitals: { hr: 85, sbp: 120, dbp: 80, spo2: 99, grbs: 100, rr: 16, temp: 36.8 },
    correctTriage: "GREEN",
    explanation: "Isolated limb injury with normal vitals. Non-urgent, can wait up to 120 mins."
  },
  {
    id: "sc-006",
    age: 55,
    gender: "Female",
    complaint: "Sudden onset severe headache, worst of her life, with vomiting.",
    vitals: { hr: 95, sbp: 210, dbp: 120, spo2: 98, grbs: 130, rr: 18, temp: 37.0 },
    correctTriage: "ORANGE",
    explanation: "Possible subarachnoid hemorrhage. SBP > 200 is a hypertensive emergency requiring urgent evaluation within 10 mins."
  },
  {
    id: "sc-007",
    age: 8,
    gender: "Male",
    complaint: "Allergic reaction after eating peanuts. Swelling of lips and difficulty swallowing.",
    vitals: { hr: 128, sbp: 95, dbp: 60, spo2: 91, grbs: 95, rr: 28, temp: 37.2 },
    correctTriage: "ORANGE",
    explanation: "Anaphylaxis with airway compromise risk. SpO2 91% and tachycardia. Needs urgent adrenaline."
  },
  {
    id: "sc-008",
    age: 35,
    gender: "Female",
    complaint: "Lower abdominal pain and vaginal bleeding. 8 weeks pregnant.",
    vitals: { hr: 125, sbp: 95, dbp: 55, spo2: 97, grbs: 105, rr: 20, temp: 37.0 },
    correctTriage: "ORANGE",
    explanation: "Possible ruptured ectopic pregnancy. Borderline hypotension and tachycardia indicate early shock. Urgent evaluation needed."
  },
  {
    id: "sc-009",
    age: 50,
    gender: "Male",
    complaint: "Known alcoholic, vomiting blood for the last 2 hours.",
    vitals: { hr: 135, sbp: 80, dbp: 45, spo2: 95, grbs: 110, rr: 24, temp: 36.5 },
    correctTriage: "RED",
    explanation: "Massive upper GI bleed with hemorrhagic shock (SBP < 90, HR > 130). Requires immediate fluid resuscitation and blood products."
  },
  {
    id: "sc-010",
    age: 19,
    gender: "Female",
    complaint: "Burning sensation while passing urine for 2 days. No fever.",
    vitals: { hr: 80, sbp: 115, dbp: 75, spo2: 100, grbs: 90, rr: 14, temp: 37.4 },
    correctTriage: "GREEN",
    explanation: "Uncomplicated UTI symptoms with normal vitals. Non-urgent."
  }
];
