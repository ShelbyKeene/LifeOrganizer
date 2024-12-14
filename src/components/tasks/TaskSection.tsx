import React from 'react';
import { SectionHeader } from '../Typography';
import { TaskList } from './TaskList';
import { AddTaskForm } from './AddTaskForm';
import { TaskFilters } from './TaskFilters';
import { GlassCard } from '../GlassCard';
import { useTaskManager } from '../../hooks/useTaskManager';

export const TaskSection: React.FC = () => {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    filter,
    setFilter
  } = useTaskManager();

  return (
    <div className="space-y-6">
      <SectionHeader>Tasks & Chores</SectionHeader>
      
      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <GlassCard>
            <TaskFilters currentFilter={filter} onFilterChange={setFilter} />
            <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
          </GlassCard>
        </div>
        
        <div>
          <GlassCard>
            <AddTaskForm onAdd={addTask} />
          </GlassCard>
        </div>
      </div>
    </div>
  );
};