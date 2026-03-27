import { PatientScenario } from "../types";
import { User, Activity } from "lucide-react";

interface PatientInfoProps {
  scenario: PatientScenario;
}

export function PatientInfo({ scenario }: PatientInfoProps) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-blue-500/20 p-3 rounded-full">
          <User className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">
            {scenario.age} yo {scenario.gender}
          </h2>
          <p className="text-slate-400 text-sm">Patient ID: {scenario.id.split('-')[0].toUpperCase()}</p>
        </div>
      </div>
      
      <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
        <div className="flex items-start gap-3">
          <Activity className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-1">Chief Complaint</h3>
            <p className="text-white text-lg leading-relaxed">{scenario.complaint}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
