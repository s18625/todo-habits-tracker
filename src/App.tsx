import { useState } from 'react';
import { Layout } from './components/Layout';
import { DateNav } from './components/DateNav';
import { HabitsSection } from './components/HabitsSection';
import { TodoSection } from './components/TodoSection';
import { HistorySection } from './components/HistorySection';
import { Settings } from './components/Settings';
import { SuccessCelebration } from './components/SuccessCelebration';
import { useAppSettings, useDailyData } from './hooks/useLocalStorage';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [settings, setSettings] = useAppSettings();
  const [dailyData, updateDailyData] = useDailyData(currentDate);

  const isAllDone =
    dailyData.todos.length > 0 && dailyData.todos.every(t => t.done);

  return (
    <Layout>
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
      
      <HistorySection />
      
      <Settings 
        settings={settings} 
        onUpdate={setSettings} 
      />
      
      <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-400 text-sm">
        <p>Aplikacja Todo + Daily Habits Tracker</p>
        <p className="mt-1">Działa lokalnie w Twojej przeglądarce</p>
      </footer>
    </Layout>
  );
}

export default App;
