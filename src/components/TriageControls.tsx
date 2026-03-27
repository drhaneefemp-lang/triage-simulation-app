import { TriageLevel } from "../types";
import { motion } from "motion/react";

interface TriageControlsProps {
  onSelect: (level: TriageLevel) => void;
  disabled: boolean;
}

export function TriageControls({ onSelect, disabled }: TriageControlsProps) {
  const levels: { level: TriageLevel, color: string, label: string, desc: string }[] = [
    { level: 'RED', color: 'bg-red-600 hover:bg-red-500 text-white border-red-800', label: 'RED', desc: 'Resuscitation / Immediate' },
    { level: 'ORANGE', color: 'bg-orange-600 hover:bg-orange-500 text-white border-orange-800', label: 'ORANGE', desc: 'Urgent (10 mins)' },
    { level: 'YELLOW', color: 'bg-yellow-500 hover:bg-yellow-400 text-slate-900 border-yellow-700', label: 'YELLOW', desc: 'Less Urgent (60 mins)' },
    { level: 'GREEN', color: 'bg-green-600 hover:bg-green-500 text-white border-green-800', label: 'GREEN', desc: 'Non-Urgent (120 mins)' },
  ];

  return (
    <div className="mt-8">
      <h3 className="text-slate-400 uppercase tracking-widest text-sm font-bold mb-4 text-center">Assign Triage Category</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {levels.map((l) => (
          <motion.button
            key={l.level}
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            onClick={() => onSelect(l.level)}
            disabled={disabled}
            className={`flex flex-col items-center justify-center p-6 rounded-xl border-b-4 shadow-lg transition-all ${l.color} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <span className="text-2xl font-black tracking-widest mb-2">{l.label}</span>
            <span className="text-xs font-semibold opacity-80 text-center">{l.desc}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
