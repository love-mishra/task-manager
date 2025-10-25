import React from 'react';
import type { TaskItem } from '../types';

interface Props {
  tasks: TaskItem[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onToggle, onDelete }: Props) {
  return (
    <div className="space-y-2">
      {tasks.map(task => (
        <div 
          key={task.id} 
          className="flex items-center justify-between p-2 border rounded dark:border-gray-700"
        >
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={task.isCompleted} 
              onChange={() => onToggle(task.id)} 
              className="w-4 h-4"
            />
            <span className={`select-none ${task.isCompleted ? 'line-through text-gray-400' : ''}`}>
              {task.description}
            </span>
          </label>

          <button 
            onClick={() => onDelete(task.id)} 
            className="text-red-600 dark:text-red-400 hover:text-red-800"
            aria-label="Delete task"
          >
            🗑
          </button>
        </div>
      ))}
    </div>
  );
}
