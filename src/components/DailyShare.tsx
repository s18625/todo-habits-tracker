import React, { useState } from 'react';
import { Share2, Image as ImageIcon, Check } from 'lucide-react';
import { toPng } from 'html-to-image';
import { format } from 'date-fns';

interface DailyShareProps {
  currentDate: Date;
}

export const DailyShare: React.FC<DailyShareProps> = ({ currentDate }) => {
  const [isCopying, setIsCopying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const dateKey = format(currentDate, 'yyyy-MM-dd');
  const shareUrl = `${window.location.origin}${window.location.pathname}#/share/${dateKey}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopying(true);
      setTimeout(() => setIsCopying(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  const shareAsImage = async () => {
    const node = document.getElementById('summary-card');
    if (!node) return;

    setIsGenerating(true);
    try {
      // Temporarily show the card if it's hidden or just use it from the DOM
      // For this to work well, we might need a hidden version of the card or just render it
      const dataUrl = await toPng(node, {
        cacheBust: true,
        backgroundColor: '#f8fafc', // slate-50
      });

      const link = document.createElement('a');
      link.download = `daily-tracker-${dateKey}.png`;
      link.href = dataUrl;
      link.click();

      if (navigator.share) {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], `daily-tracker-${dateKey}.png`, { type: 'image/png' });
        await navigator.share({
          files: [file],
          title: 'Mój dzień w DailyTracker',
          text: `Podsumowanie dnia ${dateKey}`,
        }).catch(() => {});
      }
    } catch (err) {
      console.error('Failed to generate image!', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-6">
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={copyToClipboard}
          className="flex items-center justify-center gap-2 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors shadow-sm"
        >
          {isCopying ? (
            <>
              <Check size={18} className="text-emerald-500" />
              Skopiowano!
            </>
          ) : (
            <>
              <Share2 size={18} className="text-blue-500" />
              Udostępnij link
            </>
          )}
        </button>

        <button
          onClick={shareAsImage}
          disabled={isGenerating}
          className="flex items-center justify-center gap-2 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors shadow-sm disabled:opacity-50"
        >
          {isGenerating ? (
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <ImageIcon size={18} className="text-purple-500" />
              Zapisz PNG
            </>
          )}
        </button>
      </div>
    </div>
  );
};
