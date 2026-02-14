import { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { DateNav } from './components/DateNav';
import { HabitsSection } from './components/HabitsSection';
import { TodoSection } from './components/TodoSection';
import { HistorySection } from './components/HistorySection';
import { StatisticsSection } from './components/StatisticsSection';
import { Settings } from './components/Settings';
import { SuccessCelebration } from './components/SuccessCelebration';
import { Navigation } from './components/Navigation';
import type { Tab } from './components/Navigation';
import { DailyNote } from './components/DailyNote';
import { useAppSettings, useDailyData } from './hooks/useLocalStorage';
import { ShareDayPage } from './components/ShareDayPage';
import { DailyShare } from './components/DailyShare';
import { SummaryCard } from './components/SummaryCard';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import type { SupplementsState } from './types';

function MainApp() {
  const [activeTab, setActiveTab] = useState<Tab>('today');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [settings, setSettings] = useAppSettings();
  const [dailyData, updateDailyData] = useDailyData(currentDate);

  const customHabitsDone = settings.customHabits.every(h => {
    const habitVal = dailyData.habits?.find(dh => dh.habitId === h.id);
    if (h.type === 'checkbox') return habitVal?.value === true;
    if (h.type === 'number') return typeof habitVal?.value === 'number' && habitVal.value > 0;
    return true;
  });

  const supplements = dailyData.supplementsTaken as SupplementsState;
  const morningSupps = settings.supplementsSettings.morning.enabled;
  const afternoonSupps = settings.supplementsSettings.afternoon.enabled;
  const eveningSupps = settings.supplementsSettings.evening.enabled;

  const areSuppsDone = (
    (!morningSupps || supplements.morning) &&
    (!afternoonSupps || supplements.afternoon) &&
    (!eveningSupps || supplements.evening)
  );

  const isAllDone =
    dailyData.waterLiters >= settings.dailyWaterGoalLiters &&
    dailyData.creatineTaken &&
    dailyData.collagenTaken &&
    areSuppsDone &&
    (dailyData.todos.length > 0 ? dailyData.todos.every(t => t.done) : true) &&
    customHabitsDone;

  return (
    <Layout>
      {activeTab === 'today' && (
        <div className="space-y-6">
          <SuccessCelebration isAllDone={isAllDone} />
          <DateNav
            currentDate={currentDate}
            onDateChange={setCurrentDate}
          />

          <HabitsSection
            data={dailyData}
            settings={settings}
            onUpdate={updateDailyData}
          />

          <TodoSection
            data={dailyData}
            onUpdate={updateDailyData}
          />

          <DailyNote
            note={dailyData.note || ''}
            onUpdate={(note) => updateDailyData({ note })}
          />

          <DailyShare
            currentDate={currentDate}
          />

          {/* Hidden card for PNG generation */}
          <div className="fixed -left-[9999px] top-0 pointer-events-none" aria-hidden="true">
            <SummaryCard
              data={dailyData}
              settings={settings}
              dateLabel={format(currentDate, 'd MMMM yyyy', { locale: pl })}
            />
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div>
          <HistorySection />
        </div>
      )}

      {activeTab === 'stats' && (
        <div>
          <StatisticsSection settings={settings} />
        </div>
      )}

      {activeTab === 'settings' && (
        <div>
          <Settings
            settings={settings}
            onUpdate={setSettings}
          />
        </div>
      )}
      
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-400 text-sm mb-20">
        <p>Aplikacja Todo + Daily Habits Tracker</p>
        <p className="mt-1">Działa lokalnie w Twojej przeglądarce</p>
      </footer>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/share/:date" element={<ShareDayPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
