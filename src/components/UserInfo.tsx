import { useUserTasks } from '@/hooks/useUserTasks';
import { useUserStore } from '@/store/userStore';
import { UserTask } from '@/types/userTask.types';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TaskItem from './TaskItem';

const UserInfo = () => {
  const router = useRouter();
  const { selectedUser: user } = useUserStore((state) => state);
  const { data: tasks, isLoading } = useUserTasks(user?.id);
  const [localTasks, setLocalTasks] = useState<UserTask[]>([]);

  console.log({ user });

  useEffect(() => {
    if (tasks) setLocalTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  const handleToggleTask = (taskId: number) => {
    setLocalTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    );
  };

  if (!user) return null;
  if (isLoading) return <p>Cargando...</p>;

  const completedTasks = localTasks.filter((task) => task.completed).length || 0;
  const totalTasks = localTasks.length || 0;

  return (
    <div className="user-info">
      <div className="user-avatar">
        <div className="avatar-placeholder" data-testid="avatar">
          {user.name.slice(0, 2).toUpperCase()}
        </div>
      </div>
      <div className="user-details">
        <h2 data-testid="user-name">{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <p>{user.company.name}</p>
        <div className="tasks-progress">
          <span>
            Tareas completadas: {completedTasks}/{totalTasks}
          </span>
        </div>
      </div>

      <div className="tasks-list">
        <h3>Tareas</h3>
        <ul>
          {localTasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={handleToggleTask} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserInfo;
