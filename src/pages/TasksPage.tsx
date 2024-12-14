import React from 'react';
import { SectionHeader } from '../components/Typography';
import { TaskList } from '../components/tasks/TaskList';
import { AddTaskForm } from '../components/tasks/AddTaskForm';
import { TaskFilters } from '../components/tasks/TaskFilters';
import { GlassCard } from '../components/GlassCard';
import { useTaskManager } from '../hooks/useTaskManager';

export const TasksPage: React.FC = () => {
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