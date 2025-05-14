'use client';

import { UserTask } from '@/types/userTask.types';
import React from 'react';

interface TaskItemProps {
  task: UserTask;
  onToggle: (taskId: number) => void;
}

export default function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <li key={task.id} className={task.completed ? 'completed' : ''}>
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => onToggle(task.id)} 
      />
      <span>{task.title}</span>
    </li>
  );
}