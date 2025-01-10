import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/index.css';
import { FiTrash2, FiPlus, FiCheck } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useMeowtivate } from '../context/MeowtivateContext';
import { useNotification } from '../context/NotificationContext';

const Tasks = () => {
  const { state: { userId, tasks }, dispatch, fetchTasks } = useMeowtivate();
  const [newTask, setNewTask] = useState({ name: '', status: '0', value: '' });
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const { showNotification } = useNotification();

  useEffect(() => {
    fetchTasks(userId);
  }, [userId, fetchTasks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_API_URL}/api/tasks`, { ...newTask, user_id: userId })
      .then((response) => {
        dispatch({
          type: 'ADD_TASK',
          payload: response.data,
        });
        setNewTask({ name: '', status: '0', value: '' });
        showNotification('Purrfect! Your new task has been added to the list! 🎉', 'success');
      })
      .catch(error => {
        console.error('There was an error creating the task!', error);
        showNotification('Oops! There was an error adding your task. Let’s give it another try! 🐱💔 ', 'error');
      });
  };

  const handleRemoveTask = (taskId) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}`)
      .then(() => {
        dispatch({
          type: 'SET_TASKS',
          payload: tasks.filter(task => task.id !== taskId),
        });
        showNotification('Task removed successfully!', 'success');
      })
      .catch(error => {
        console.error('There was an error removing the task!', error);
        showNotification('Oh no, there was an error removing task. Please try again.', 'error');
      });
  };

  const handleMarkAsDone = (taskId, rewardValue) => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}/mark-done`, { user_id: userId })
      .then(() => {
        dispatch({
          type: 'MARK_TASK_DONE',
          payload: taskId,
          rewardValue: rewardValue,
        });
        showNotification('Meow-gical! ⭐ Your task has been marked as completed, great job! 🎉', 'success');
      })
      .catch(error => {
        console.error('Error marking task as done:', error);
        showNotification('Oh no, looks like we couldn’t mark your task as done. Try again, kitty! 🐱💔', 'success');
      });
  };

  const getStatusText = (status) => {
    switch (String(status)) {
      case '0': return 'To do';
      case '1': return 'Pending';
      case '2': return 'Done';
      default: return 'Unknown';
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  return (
    <div className='task-content'>
      <h1>Tasks</h1>
    
      <div className="form-container">
        <form onSubmit={handleFormSubmit}>
          <div className="form-row">
            <input
              className="add-task-input-field"
              type="text"
              name="name"
              placeholder="Task name"
              value={newTask.name}
              onChange={handleInputChange}
              required
            />
            <select name="status" value={newTask.status} onChange={handleInputChange}>
              <option value="0">To do</option>
              <option value="1">Pending</option>
              <option value="2">Done</option>
            </select>
            <input
              className="add-task-input-field"
              type="number"
              name="value"
              placeholder="Value"
              value={newTask.value}
              onChange={handleInputChange}
            />
            <button type="submit" className="task-change-status-btn">
              <FiPlus />
            </button>
          </div>
        </form>
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Task</th>
            <th onClick={() => handleSort('status')}>Status</th>
            <th onClick={() => handleSort('value')}>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map(task => (
            <tr key={task.id}>
              <td data-label="Task">{task.name}</td>
              <td data-label="Status">{getStatusText(task.status)}</td>
              <td data-label="Value">{task.value} <FaHeart size={12} color="#FAD8D6" /></td>
              <td data-label="Actions">
                <button className='task-change-status-btn tooltip' onClick={() => handleRemoveTask(task.id)}>
                  <FiTrash2 />
                  <span className="tooltiptext">Remove task</span>
                </button>
                <button className='task-change-status-btn tooltip' onClick={() => handleMarkAsDone(task.id, task.value)}>
                  <FiCheck />
                  <span className="tooltiptext">Mark task as done</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
