import React from 'react';
import { Task } from '../../types';
import { Trash2, CheckCircle, Circle } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div className={`
      flex items-center justify-between p-4 rounded-lg
      transition-all duration-200
      ${task.completed ? 'bg-white/10' : 'bg-white/20'}
    `}>
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggle}
          className="text-white hover:scale-110 transition-transform"
        >
          {task.completed ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </button>
        
        <div>
          <p className={`
            font-light
            ${task.completed ? 'line-through text-white/50' : 'text-white'}
          `}>
            {task.title}
          </p>
          <p className="text-sm text-white/50">
            Due: {formatDate(task.dueDate)}
            {task.recurring && ` (${task.recurring})`}
          </p>
        </div>
      </div>

      <button
        onClick={onDelete}
        className="text-white/50 hover:text-white hover:scale-110 transition-all"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};