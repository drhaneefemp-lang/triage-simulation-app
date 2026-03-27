import { Flame, Trophy } from "lucide-react";
import { motion } from "motion/react";

interface ScoreBoardProps {
  score: number;
  streak: number;
}

export function ScoreBoard({ score, streak }: ScoreBoardProps) {
  return (
    <div className="flex items-center gap-6 bg-slate-800/50 px-6 py-3 rounded-full border border-slate-700 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <span className="text-xl font-black text-white">{score}</span>
        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Pts</span>
      </div>
      <div className="w-px h-6 bg-slate-700"></div>
      <div className="flex items-center gap-2">
        <motion.div
          animate={streak > 2 ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Flame className={`w-5 h-5 ${streak > 0 ? 'text-orange-500' : 'text-slate-600'}`} />
        </motion.div>
        <span className={`text-xl font-black ${streak > 0 ? 'text-orange-400' : 'text-slate-500'}`}>{streak}</span>
        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Streak</span>
      </div>
    </div>
  );
}
