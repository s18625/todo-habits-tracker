import React from 'react';
import { StickyNote } from 'lucide-react';

interface DailyNoteProps {
  note: string;
  onUpdate: (note: string) => void;
}

export const DailyNote: React.FC<DailyNoteProps> = ({ note, onUpdate }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-3">
      <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
        <StickyNote size={20} />
        <h3 className="font-bold">Notatka dla dnia</h3>
      </div>
      <textarea
        value={note}
        onChange={(e) => onUpdate(e.target.value)}
        placeholder="Jak Ci minął dzień?"
        className="w-full h-24 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none resize-none"
      />
    </div>
  );
};
