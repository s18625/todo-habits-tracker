import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Cell
} from 'recharts';
import { useStatistics } from '../hooks/useStatistics';
import { useTheme } from '../hooks/useTheme';
import type { AppSettings } from '../types';
import {
  TrendingUp, Droplets, CheckCircle, Zap, Sparkles,
  Flame
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';

interface StatisticsSectionProps {
  settings: AppSettings;
}

export const StatisticsSection: React.FC<StatisticsSectionProps> = ({ settings }) => {
  const [range, setRange] = useState<7 | 30>(7);
  const { stats7, stats30, chartData14, streaks } = useStatistics(settings);
  const { theme } = useTheme();

  const stats = range === 7 ? stats7 : stats30;

  const isDarkMode = theme === 'dark';
  const textColor = isDarkMode ? '#94a3b8' : '#64748b';
  const gridColor = isDarkMode ? '#334155' : '#e2e8f0';

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="text-blue-500" size={28} />
          Statystyki
        </h2>
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setRange(7)}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
              range === 7
                ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            7 dni
          </button>
          <button
            onClick={() => setRange(30)}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
              range === 30
                ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            30 dni
          </button>
        </div>
      </div>

      {/* Streaks */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm text-center space-y-1">
          <div className="flex justify-center mb-1 text-blue-500">
            <Flame size={20} className={streaks.water > 0 ? 'fill-blue-500' : ''} />
          </div>
          <div className="text-2xl font-black">{streaks.water}</div>
          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider leading-tight">Woda Streak</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm text-center space-y-1">
          <div className="flex justify-center mb-1 text-amber-500">
            <Flame size={20} className={streaks.creatine > 0 ? 'fill-amber-500' : ''} />
          </div>
          <div className="text-2xl font-black">{streaks.creatine}</div>
          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider leading-tight">Kreatyna</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm text-center space-y-1">
          <div className="flex justify-center mb-1 text-pink-500">
            <Flame size={20} className={streaks.collagen > 0 ? 'fill-pink-500' : ''} />
          </div>
          <div className="text-2xl font-black">{streaks.collagen}</div>
          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider leading-tight">Kolagen</div>
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-5 rounded-3xl text-white shadow-lg shadow-blue-500/20">
          <Droplets className="mb-2 opacity-80" size={24} />
          <div className="text-3xl font-black mb-1">{stats.avgWater.toFixed(2)}L</div>
          <div className="text-xs font-bold opacity-80 uppercase tracking-wide">Średnia woda</div>
          <div className="mt-4 pt-4 border-t border-white/20 text-[10px] font-medium opacity-80">
            Suma: {stats.totalWater.toFixed(1)}L
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-5 rounded-3xl text-white shadow-lg shadow-emerald-500/20">
          <CheckCircle className="mb-2 opacity-80" size={24} />
          <div className="text-3xl font-black mb-1">{Math.round(stats.todoCompletionRate)}%</div>
          <div className="text-xs font-bold opacity-80 uppercase tracking-wide">Zadania</div>
          <div className="mt-4 pt-4 border-t border-white/20 text-[10px] font-medium opacity-80">
            Ostatnie {range} dni
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-xl">
            <Zap size={24} />
          </div>
          <div>
            <div className="text-xl font-black">{stats.creatineDays}</div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Kreatyna</div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-xl">
            <Sparkles size={24} />
          </div>
          <div>
            <div className="text-xl font-black">{stats.collagenDays}</div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Kolagen</div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Droplets className="text-blue-500" size={20} />
            Spożycie wody (14 dni)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData14}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(str) => format(parseISO(str), 'd.MM')}
                  stroke={textColor}
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke={textColor}
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  unit="L"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                    borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: isDarkMode ? '#f1f5f9' : '#0f172a'
                  }}
                  itemStyle={{ color: isDarkMode ? '#f1f5f9' : '#0f172a' }}
                  labelFormatter={(str) => format(parseISO(str), 'EEEE, d MMMM', { locale: pl })}
                />
                <Bar
                  dataKey="waterLiters"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  name="Litry"
                >
                   {chartData14.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.waterLiters >= settings.dailyWaterGoalLiters ? '#3b82f6' : '#94a3b8'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <CheckCircle className="text-emerald-500" size={20} />
            Wykonane zadania (14 dni)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData14}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(str) => format(parseISO(str), 'd.MM')}
                  stroke={textColor}
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke={textColor}
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                    borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: isDarkMode ? '#f1f5f9' : '#0f172a'
                  }}
                  itemStyle={{ color: isDarkMode ? '#f1f5f9' : '#0f172a' }}
                  labelFormatter={(str) => format(parseISO(str), 'EEEE, d MMMM', { locale: pl })}
                />
                <Line
                  type="monotone"
                  dataKey={(d) => (d as { todos: { done: boolean }[] }).todos.filter((t) => t.done).length}
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: isDarkMode ? '#1e293b' : '#fff' }}
                  activeDot={{ r: 6 }}
                  name="Zadania"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
