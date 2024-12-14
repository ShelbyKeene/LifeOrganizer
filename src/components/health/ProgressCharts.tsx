import React from 'react';
import { HealthMetrics } from '../../types/health';
import { formatDate } from '../../utils/dateUtils';

interface ProgressChartsProps {
  weeklyProgress: HealthMetrics[];
}

export const ProgressCharts: React.FC<ProgressChartsProps> = ({ weeklyProgress }) => {
  const maxWater = Math.max(...weeklyProgress.map(m => m.waterIntake), 2000);
  const maxSteps = Math.max(...weeklyProgress.map(m => m.steps || 0), 10000);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-light text-white">Weekly Progress</h3>

      <div className="space-y-8">
        {/* Water Intake Chart */}
        <div className="space-y-2">
          <h4 className="text-sm font-light text-white/70">Water Intake (ml)</h4>
          <div className="h-32 flex items-end gap-2">
            {weeklyProgress.map((metric) => (
              <div
                key={metric.id}
                className="flex-1 group relative"
              >
                <div
                  className="w-full bg-blue-500/50 rounded-t transition-all duration-500"
                  style={{ height: `${(metric.waterIntake / maxWater) * 100}%` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 px-2 py-1 rounded text-xs text-white whitespace-nowrap">
                    {metric.waterIntake}ml
                  </div>
                </div>
                <div className="text-xs text-white/50 text-center mt-1">
                  {formatDate(metric.date)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Steps Chart */}
        <div className="space-y-2">
          <h4 className="text-sm font-light text-white/70">Daily Steps</h4>
          <div className="h-32 flex items-end gap-2">
            {weeklyProgress.map((metric) => (
              <div
                key={metric.id}
                className="flex-1 group relative"
              >
                <div
                  className="w-full bg-green-500/50 rounded-t transition-all duration-500"
                  style={{ height: `${((metric.steps || 0) / maxSteps) * 100}%` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 px-2 py-1 rounded text-xs text-white whitespace-nowrap">
                    {metric.steps || 0} steps
                  </div>
                </div>
                <div className="text-xs text-white/50 text-center mt-1">
                  {formatDate(metric.date)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};