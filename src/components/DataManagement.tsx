import React, { useRef } from 'react';
import { Download, Upload, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

export const DataManagement: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportData = () => {
    const allData: Record<string, unknown> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('daily_') || key === 'app_settings' || key === 'theme')) {
        const value = localStorage.getItem(key);
        if (value) {
          try {
            allData[key] = JSON.parse(value);
          } catch {
            allData[key] = value;
          }
        }
      }
    }
    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `daily-tracker-export-${format(new Date(), 'yyyy-MM-dd')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);

        if (typeof data !== 'object' || data === null) {
          throw new Error('Nieprawidłowy format pliku JSON.');
        }

        // Basic structural validation: check if at least app_settings exists or some daily_ keys
        const keys = Object.keys(data);
        const hasValidKeys = keys.some(k => k === 'app_settings' || k.startsWith('daily_'));

        if (!hasValidKeys) {
          throw new Error('Plik nie zawiera prawidłowych danych aplikacji DailyTracker.');
        }

        if (confirm('Czy na pewno chcesz zaimportować dane? Wszystkie obecne dane zostaną nadpisane. Aplikacja zostanie odświeżona.')) {
          // Clear current local storage for relevant keys
          for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key && (key.startsWith('daily_') || key === 'app_settings' || key === 'theme')) {
              localStorage.removeItem(key);
            }
          }

          // Import new data
          Object.entries(data).forEach(([key, value]) => {
            localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
          });

          window.location.reload();
        }
      } catch (err) {
        alert('Błąd podczas importu: ' + (err instanceof Error ? err.message : 'Wystąpił nieoczekiwany błąd'));
      }
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
      <h3 className="font-bold flex items-center gap-2">
        <Download className="text-slate-500" size={20} />
        Dane i kopia zapasowa
      </h3>

      <p className="text-sm text-slate-500 dark:text-slate-400">
        Eksportuj swoje dane do pliku JSON lub zaimportuj je z powrotem.
        Wszystkie dane są przechowywane lokalnie w Twojej przeglądarce.
      </p>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          onClick={exportData}
          className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-2.5 rounded-xl transition-colors text-sm"
        >
          <Download size={18} />
          Eksportuj
        </button>
        <button
          onClick={handleImportClick}
          className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-2.5 rounded-xl transition-colors text-sm"
        >
          <Upload size={18} />
          Importuj
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={importData}
        accept=".json"
        className="hidden"
      />

      <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800/30">
        <AlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0" />
        <p className="text-[11px] text-amber-700 dark:text-amber-400 leading-tight">
          Uwaga: Importowanie danych zastąpi wszystkie Twoje obecne postępy i ustawienia.
        </p>
      </div>
    </div>
  );
};
