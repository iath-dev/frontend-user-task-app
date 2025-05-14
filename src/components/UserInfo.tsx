import { useUserTasks } from '@/hooks/useUserTasks';
import { useUserStore } from '@/store/userStore';
import { UserTask } from '@/types/userTask.types';
import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';

const UserInfo = () => {
    const user = useUserStore((state) => state.selectedUser);
    const { data: tasks, isLoading } = useUserTasks(user?.id)
    const [localTasks, setLocalTasks] = useState<UserTask[]>([]);

    useEffect(() => {
      if (tasks) setLocalTasks(tasks);
    }, [tasks])

    const handleToggleTask = (taskId: number) => {
      setLocalTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    };

    if (!user) return <p>Selecciona un usuario</p>
    if (isLoading) return <p>Cargando...</p>

    const completedTasks = localTasks.filter(task => task.completed).length || 0;
    const totalTasks = localTasks.length || 0;

    return (
        <div className="user-info">
            <div className="user-avatar">
                <div className="avatar-placeholder">
                    {user.name.charAt(0).toUpperCase()}
                </div>
            </div>
            <div className="user-details">
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <p>{user.company.name}</p>
                <div className="tasks-progress">
                    <span>Tareas completadas: {completedTasks}/{totalTasks}</span>
                </div>
            </div>
            
            <div className="tasks-list">
                <h3>Tareas</h3>
                <ul>
                    {localTasks.map((task) => (
                        <TaskItem 
                            key={task.id} 
                            task={task} 
                            onToggle={handleToggleTask} 
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default UserInfo