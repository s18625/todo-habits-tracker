import React, { useState } from 'react';
import type { Todo, DailyData } from '../types';
import { CheckCircle2, Circle, Trash2, Edit3, Plus, X, Check } from 'lucide-react';

interface TodoSectionProps {
  data: DailyData;
  onUpdate: (newData: Partial<DailyData> | ((prev: DailyData) => DailyData)) => void;
}

type FilterType = 'all' | 'active' | 'completed';

export const TodoSection: React.FC<TodoSectionProps> = ({ data, onUpdate }) => {
  const [newTodoText, setNewTodoText] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: newTodoText.trim(),
      done: false,
      createdAt: Date.now(),
    };

    onUpdate((prev) => ({
      ...prev,
      todos: [newTodo, ...prev.todos],
    }));
    setNewTodoText('');
  };

  const toggleTodo = (id: string) => {
    onUpdate((prev) => ({
      ...prev,
      todos: prev.todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    }));
  };

  const deleteTodo = (id: string) => {
    onUpdate((prev) => ({
      ...prev,
      todos: prev.todos.filter((t) => t.id !== id),
    }));
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const saveEdit = () => {
    if (!editingText.trim() || !editingId) return;
    onUpdate((prev) => ({
      ...prev,
      todos: prev.todos.map((t) => (t.id === editingId ? { ...t, text: editingText.trim() } : t)),
    }));
    setEditingId(null);
  };

  const filteredTodos = data.todos.filter((t) => {
    if (filter === 'active') return !t.done;
    if (filter === 'completed') return t.done;
    return true;
  });

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <CheckCircle2 className="text-green-500" size={24} />
          Lista zadań
        </h2>
        <span className="text-sm font-medium bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
          {data.todos.filter(t => t.done).length}/{data.todos.length}
        </span>
      </div>

      <form onSubmit={addTodo} className="flex gap-2">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Dodaj nowe zadanie..."
          className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition-colors"
        >
          <Plus size={24} />
        </button>
      </form>

      <div className="flex gap-2">
        {(['all', 'active', 'completed'] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              filter === f
                ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900'
                : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {f === 'all' ? 'Wszystkie' : f === 'active' ? 'Aktywne' : 'Zrobione'}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredTodos.length === 0 ? (
          <p className="text-center py-10 text-slate-400 dark:text-slate-500 italic">
            Brak zadań do wyświetlenia.
          </p>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`group flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-2xl border transition-all ${
                todo.done ? 'border-slate-100 dark:border-slate-800 opacity-60' : 'border-slate-200 dark:border-slate-700 shadow-sm'
              }`}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`transition-colors ${todo.done ? 'text-green-500' : 'text-slate-300 hover:text-blue-500'}`}
              >
                {todo.done ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </button>

              {editingId === todo.id ? (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1 bg-slate-50 dark:bg-slate-900 border-none focus:ring-0 p-0 font-medium"
                    autoFocus
                  />
                  <button onClick={saveEdit} className="text-green-500"><Check size={20} /></button>
                  <button onClick={() => setEditingId(null)} className="text-red-500"><X size={20} /></button>
                </div>
              ) : (
                <span
                  className={`flex-1 font-medium ${todo.done ? 'line-through text-slate-400' : ''}`}
                  onDoubleClick={() => startEditing(todo)}
                >
                  {todo.text}
                </span>
              )}

              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => startEditing(todo)}
                  className="p-1.5 text-slate-400 hover:text-blue-500 transition-colors"
                >
                  <Edit3 size={18} />
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
