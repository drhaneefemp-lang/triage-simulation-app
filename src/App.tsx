import { useState, useEffect } from 'react';
import { PatientScenario, GameState, TriageLevel } from './types';
import { generateScenario } from './lib/gemini';
import { Monitor } from './components/Monitor';
import { PatientInfo } from './components/PatientInfo';
import { TriageControls } from './components/TriageControls';
import { Feedback } from './components/Feedback';
import { ScoreBoard } from './components/ScoreBoard';
import { Activity, Loader2, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    status: 'loading',
    score: 0,
    streak: 0,
    currentScenario: null,
    userChoice: null,
  });

  const fetchNewScenario = async () => {
    setGameState(prev => ({ ...prev, status: 'loading', error: undefined }));
    try {
      const scenario = await generateScenario();
      setGameState(prev => ({
        ...prev,
        status: 'playing',
        currentScenario: scenario,
        userChoice: null,
      }));
    } catch (error) {
      console.error("Failed to fetch scenario", error);
      setGameState(prev => ({
        ...prev,
        status: 'error',
        error: "Failed to generate patient scenario. Please try again.",
      }));
    }
  };

  useEffect(() => {
    fetchNewScenario();
  }, []);

  const handleTriageSelect = (level: TriageLevel) => {
    if (gameState.status !== 'playing' || !gameState.currentScenario) return;

    const isCorrect = level === gameState.currentScenario.correctTriage;
    
    if (isCorrect) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#3b82f6', '#eab308']
      });
    }

    setGameState(prev => ({
      ...prev,
      status: 'feedback',
      userChoice: level,
      score: isCorrect ? prev.score + 10 + (prev.streak * 2) : Math.max(0, prev.score - 5),
      streak: isCorrect ? prev.streak + 1 : 0,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-red-500 p-1.5 rounded-md">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-black tracking-tight text-white">
              Triage<span className="text-red-500">Sim</span>
            </h1>
          </div>
          <ScoreBoard score={gameState.score} streak={gameState.streak} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {gameState.status === 'loading' && (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <h2 className="text-xl font-bold text-slate-300">Receiving new patient...</h2>
            <p className="text-slate-500 mt-2">AI is generating clinical scenario</p>
          </div>
        )}

        {gameState.status === 'error' && (
          <div className="flex flex-col items-center justify-center py-32 bg-red-950/20 rounded-2xl border border-red-900/50">
            <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-red-400 mb-2">Connection Error</h2>
            <p className="text-slate-400 mb-6 text-center max-w-md">{gameState.error}</p>
            <button 
              onClick={fetchNewScenario}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold transition-colors"
            >
              Retry Connection
            </button>
          </div>
        )}

        {(gameState.status === 'playing' || gameState.status === 'feedback') && gameState.currentScenario && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Patient Info & Monitor */}
              <div className="lg:col-span-12">
                <PatientInfo scenario={gameState.currentScenario} />
                <Monitor vitals={gameState.currentScenario.vitals} />
              </div>
              
            </div>

            {/* Bottom Section: Controls or Feedback */}
            {gameState.status === 'playing' ? (
              <TriageControls 
                onSelect={handleTriageSelect} 
                disabled={false} 
              />
            ) : (
              <Feedback 
                scenario={gameState.currentScenario} 
                userChoice={gameState.userChoice!} 
                onNext={fetchNewScenario} 
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
