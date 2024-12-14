import React, { useState } from 'react';
import { HealthMetrics } from '../../types/health';
import { Scale, Moon, Footprints, SmilePlus } from 'lucide-react';

interface HealthMetricsFormProps {
  onSubmit: (metrics: Omit<HealthMetrics, 'id' | 'date' | 'waterIntake'>) => void;
}

export const HealthMetricsForm: React.FC<HealthMetricsFormProps> = ({ onSubmit }) => {
  const [metrics, setMetrics] = useState({
    weight: '',
    steps: '',
    sleepHours: '',
    mood: 'good' as HealthMetrics['mood'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      weight: metrics.weight ? Number(metrics.weight) : undefined,
      steps: metrics.steps ? Number(metrics.steps) : undefined,
      sleepHours: metrics.sleepHours ? Number(metrics.sleepHours) : undefined,
      mood: metrics.mood,
    });
    setMetrics({ weight: '', steps: '', sleepHours: '', mood: 'good' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-light text-white mb-4">Daily Health Check</h3>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Scale className="w-5 h-5 text-white/70" />
          <input
            type="number"
            value={metrics.weight}
            onChange={(e) => setMetrics(prev => ({ ...prev, weight: e.target.value }))}
            placeholder="Weight (kg)"
            step="0.1"
            className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-4">
          <Footprints className="w-5 h-5 text-white/70" />
          <input
            type="number"
            value={metrics.steps}
            onChange={(e) => setMetrics(prev => ({ ...prev, steps: e.target.value }))}
            placeholder="Steps"
            className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-4">
          <Moon className="w-5 h-5 text-white/70" />
          <input
            type="number"
            value={metrics.sleepHours}
            onChange={(e) => setMetrics(prev => ({ ...prev, sleepHours: e.target.value }))}
            placeholder="Sleep (hours)"
            step="0.5"
            className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-4">
          <SmilePlus className="w-5 h-5 text-white/70" />
          <select
            value={metrics.mood}
            onChange={(e) => setMetrics(prev => ({ ...prev, mood: e.target.value as HealthMetrics['mood'] }))}
            className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
          >
            <option value="great">Great</option>
            <option value="good">Good</option>
            <option value="okay">Okay</option>
            <option value="poor">Poor</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 rounded-lg bg-white/20 text-white font-light hover:bg-white/30 transition-colors"
      >
        Save Metrics
      </button>
    </form>
  );
};