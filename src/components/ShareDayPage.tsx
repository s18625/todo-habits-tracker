import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDailySummary } from '../hooks/useDailySummary';
import { SummaryCard } from './SummaryCard';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export const ShareDayPage: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  const { data, settings, dateLabel, hasData } = useDailySummary(date || '');

  if (!date) return <div>Nieprawidłowa data.</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
            <ArrowLeft size={20} />
            <span className="font-bold text-sm uppercase tracking-wider">Powrót</span>
          </Link>
        </div>

        {hasData ? (
          <SummaryCard data={data} settings={settings} dateLabel={dateLabel} />
        ) : (
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 text-center">
            <h2 className="text-xl font-bold mb-2">Brak danych</h2>
            <p className="text-slate-500 mb-6">Nie znaleziono danych dla dnia {dateLabel}.</p>
            <Link to="/" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-colors">
               Otwórz moją aplikację
            </Link>
          </div>
        )}

        <div className="text-center">
          <a
            href={window.location.origin + window.location.pathname.replace(/\/share\/.*$/, '')}
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            <ExternalLink size={16} />
            Otwórz moją aplikację
          </a>
        </div>
      </div>
    </div>
  );
};
