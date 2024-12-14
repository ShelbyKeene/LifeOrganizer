import { useState, useCallback } from 'react';
import { Task, FilterType } from '../types';
import { generateId } from '../utils/idUtils';

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  const addTask = useCallback((newTask: Omit<Task, 'id' | 'completed'>) => {
    setTasks(prev => [...prev, {
      ...newTask,
      id: generateId(),
      completed: false,
    }]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return {
    tasks: filteredTasks,
    addTask,
    toggleTask,
    deleteTask,
    filter,
    setFilter,
  };
};