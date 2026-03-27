import { Vitals } from "../types";
import { motion } from "motion/react";

interface MonitorProps {
  vitals: Vitals;
}

export function Monitor({ vitals }: MonitorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-inner">
      <VitalBox 
        label="HR" 
        value={vitals.hr} 
        unit="bpm" 
        colorClass="text-green-400" 
        bgClass="bg-green-950/30"
        borderClass="border-green-800/50"
      />
      <VitalBox 
        label="NIBP" 
        value={`${vitals.sbp}/${vitals.dbp}`} 
        unit="mmHg" 
        colorClass="text-red-400" 
        bgClass="bg-red-950/30"
        borderClass="border-red-800/50"
      />
      <VitalBox 
        label="SpO2" 
        value={vitals.spo2} 
        unit="%" 
        colorClass="text-cyan-400" 
        bgClass="bg-cyan-950/30"
        borderClass="border-cyan-800/50"
      />
      <VitalBox 
        label="RR" 
        value={vitals.rr} 
        unit="rpm" 
        colorClass="text-yellow-400" 
        bgClass="bg-yellow-950/30"
        borderClass="border-yellow-800/50"
      />
      <VitalBox 
        label="GRBS" 
        value={vitals.grbs} 
        unit="mg/dL" 
        colorClass="text-purple-400" 
        bgClass="bg-purple-950/30"
        borderClass="border-purple-800/50"
      />
      <VitalBox 
        label="TEMP" 
        value={vitals.temp.toFixed(1)} 
        unit="°C" 
        colorClass="text-orange-400" 
        bgClass="bg-orange-950/30"
        borderClass="border-orange-800/50"
      />
    </div>
  );
}

function VitalBox({ label, value, unit, colorClass, bgClass, borderClass }: { label: string, value: string | number, unit: string, colorClass: string, bgClass: string, borderClass: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col p-4 rounded-lg border ${bgClass} ${borderClass}`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className={`text-sm font-bold tracking-wider ${colorClass}`}>{label}</span>
        <span className="text-xs text-slate-400">{unit}</span>
      </div>
      <div className={`text-4xl md:text-5xl font-mono font-bold tracking-tighter ${colorClass} text-right`}>
        {value}
      </div>
    </motion.div>
  );
}
