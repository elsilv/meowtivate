import React from 'react';
import '../styles/index.css';
import Navbar from '../components/Navbar'
import Tasks from '../components/Tasks';

const TaskPage = () => {
    
  return (
    <div className='shiny-background'>
      <Navbar />
      <Tasks />
    </div>
  );
};

export default TaskPage;
