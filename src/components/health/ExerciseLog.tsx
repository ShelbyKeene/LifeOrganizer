import React, { useState } from 'react';
import { Exercise } from '../../types/health';
import { Dumbbell, Clock, Flame } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

interface ExerciseLogProps {
  exercises: Exercise[];
  onAdd: (exercise: Omit<Exercise, 'id' | 'date'>) => void;
}

export const ExerciseLog: React.FC<ExerciseLogProps> = ({ exercises, onAdd }) => {
  const [newExercise, setNewExercise] = useState({
    type: '',
    duration: '',
    intensity: 'medium' as Exercise['intensity'],
    calories: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExercise.type || !newExercise.duration) return;

    onAdd({
      type: newExercise.type,
      duration: Number(newExercise.duration),
      intensity: newExercise.intensity,
      calories: newExercise.calories ? Number(newExercise.calories) : undefined,
      notes: newExercise.notes || undefined,
    });

    setNewExercise({
      type: '',
      duration: '',
      intensity: 'medium',
      calories: '',
      notes: '',
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-light text-white flex items-center gap-2">
        <Dumbbell className="w-6 h-6" />
        Exercise Log
      </h3>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          value={newExercise.type}
          onChange={(e) => setNewExercise(prev => ({ ...prev, type: e.target.value }))}
          placeholder="Exercise type"
          className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
        />

        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-white/70" />
          <input
            type="number"
            value={newExercise.duration}
            onChange={(e) => setNewExercise(prev => ({ ...prev, duration: e.target.value }))}
            placeholder="Duration (min)"
            className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
          />
        </div>

        <select
          value={newExercise.intensity}
          onChange={(e) => setNewExercise(prev => ({ ...prev, intensity: e.target.value as Exercise['intensity'] }))}
          className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
        >
          <option value="low">Low Intensity</option>
          <option value="medium">Medium Intensity</option>
          <option value="high">High Intensity</option>
        </select>

        <div className="flex items-center space-x-2">
          <Flame className="w-5 h-5 text-white/70" />
          <input
            type="number"
            value={newExercise.calories}
            onChange={(e) => setNewExercise(prev => ({ ...prev, calories: e.target.value }))}
            placeholder="Calories burned"
            className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <textarea
            value={newExercise.notes}
            onChange={(e) => setNewExercise(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Notes (optional)"
            rows={2}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="md:col-span-2 px-4 py-2 rounded-lg bg-white/20 text-white font-light hover:bg-white/30 transition-colors"
        >
          Log Exercise
        </button>
      </form>

      <div className="space-y-3 mt-6">
        {exercises.map(exercise => (
          <div
            key={exercise.id}
            className="p-4 rounded-lg bg-white/10 space-y-2"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-white font-light">{exercise.type}</h4>
              <span className="text-sm text-white/70">{formatDate(exercise.date)}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-white/70">
              <span>{exercise.duration} min</span>
              <span className="capitalize">{exercise.intensity} intensity</span>
              {exercise.calories && <span>{exercise.calories} cal</span>}
            </div>
            {exercise.notes && (
              <p className="text-sm text-white/50 mt-2">{exercise.notes}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};