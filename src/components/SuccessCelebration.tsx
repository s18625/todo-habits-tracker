import React, { useState } from 'react';
import { X, Trophy, Sparkles } from 'lucide-react';

interface SuccessCelebrationProps {
  isAllDone: boolean;
}

export const SuccessCelebration: React.FC<SuccessCelebrationProps> = ({ isAllDone }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  // Reset dismissal if it's no longer all done (so it can pop up again when re-completed)
  if (!isAllDone && isDismissed) {
    setIsDismissed(false);
  }

  const isOpen = isAllDone && !isDismissed;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 max-w-md w-full text-center overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Decoration */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-amber-500 to-emerald-500" />

        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex justify-center mb-6">
          <div className="relative">
            <Trophy className="text-amber-500 w-20 h-20 animate-bounce" />
            <Sparkles className="absolute -top-2 -right-2 text-pink-500 w-8 h-8 animate-pulse" />
          </div>
        </div>

        <h2 className="text-3xl font-black mb-4 text-slate-800 dark:text-white leading-tight">
          BRAWO PAULINA!<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-amber-500">
            JESTEM Z CIEBIE DUMNY
          </span>
        </h2>

        <p className="text-slate-600 dark:text-slate-400 mb-8 font-medium italic">
          "Wszystko co robisz, robisz najlepiej!" ✨
        </p>

        <button
          onClick={() => setIsDismissed(true)}
          className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
        >
          Dzięki! ❤️
        </button>

        {/* Hidden audio player for music */}
        <audio
          autoPlay
          src="./SKOLIM_IDELANIE.mp3"
          className="hidden"
        />
      </div>
    </div>
  );
};
