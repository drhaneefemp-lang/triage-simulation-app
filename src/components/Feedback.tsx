import { PatientScenario, TriageLevel } from "../types";
import { CheckCircle, XCircle, ArrowRight, BrainCircuit } from "lucide-react";
import { motion } from "motion/react";

interface FeedbackProps {
  scenario: PatientScenario;
  userChoice: TriageLevel;
  onNext: () => void;
}

export function Feedback({ scenario, userChoice, onNext }: FeedbackProps) {
  const isCorrect = userChoice === scenario.correctTriage;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-8 p-6 rounded-xl border-2 ${isCorrect ? 'bg-green-950/40 border-green-800' : 'bg-red-950/40 border-red-800'}`}
    >
      <div className="flex items-center gap-4 mb-6">
        {isCorrect ? (
          <CheckCircle className="w-10 h-10 text-green-500 flex-shrink-0" />
        ) : (
          <XCircle className="w-10 h-10 text-red-500 flex-shrink-0" />
        )}
        <div>
          <h2 className={`text-2xl font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {isCorrect ? 'Correct Triage!' : 'Incorrect Triage'}
          </h2>
          <p className="text-slate-300 mt-1">
            You selected <span className="font-bold px-2 py-1 bg-slate-800 rounded">{userChoice}</span>. 
            The correct category is <span className="font-bold px-2 py-1 bg-slate-800 rounded text-white">{scenario.correctTriage}</span>.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 p-5 rounded-lg border border-slate-700 mb-6">
        <div className="flex items-start gap-3">
          <BrainCircuit className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-purple-300 uppercase tracking-wider mb-2">Clinical Reasoning (AI)</h3>
            <p className="text-slate-200 leading-relaxed text-lg">{scenario.explanation}</p>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/20"
      >
        Next Patient <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}
