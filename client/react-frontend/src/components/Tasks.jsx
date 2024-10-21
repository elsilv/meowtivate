import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/index.css';
import { FiTrash2, FiPlus } from "react-icons/fi";
import { FaHeart } from 'react-icons/fa';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', status: '0', value: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/tasks`)
      .then(response => {
        setTasks(response.data); 
      })
      .catch(error => {
        console.error('There was an error fetching the tasks!', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/api/tasks`, newTask)
      .then(() => {
        fetchTasks();
        setNewTask({ name: '', status: '0', value: '' });
      })
      .catch(error => {
        console.error('There was an error creating the task!', error);
      });
  };

  const handleRemoveTask = (taskId) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}`)
      .then(() => {
        fetchTasks();
      })
      .catch(error => {
        console.error('There was an error removing the task!', error);
      });
  };

  const getStatusText = (status) => {
    switch (String(status)) {
      case '0':
        return 'To do';
      case '1':
        return 'Pending';
      case '2':
        return 'Done';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className='task-content'>
      <h1>Tehtävälista</h1>
    
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
            <th>Task</th>
            <th>Status</th>
            <th>Value</th>
            <th>More Info</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td data-label="Task">{task.name}</td>
              <td data-label="Status">{getStatusText(task.status)}</td>
              <td data-label="Value">{task.value} <FaHeart size={12} color="#FFA9A3" /></td>
              <td data-label="More Info">Details</td>
              <td data-label="Remove task">
                <button className='task-change-status-btn' onClick={() => handleRemoveTask(task.id)}>
                  <FiTrash2 />
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
