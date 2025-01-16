import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/index.css';
import { useMeowtivate } from '../context/MeowtivateContext';

const ComplimentCollection = () => {
  const { state: { userId } } = useMeowtivate();
  const [compliments, setCompliments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const complimentsPerPage = 5;
  const totalPages = Math.ceil(compliments.length / complimentsPerPage);
  const startIndex = (currentPage - 1) * complimentsPerPage;
  const currentCompliments = compliments.slice(startIndex, startIndex + complimentsPerPage);

  useEffect(() => {
    fetchCompliments()
  }, [userId]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const fetchCompliments = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/generate-compliment/compliments/${userId}`, {
        params: { user_id: userId }
      })
      .then(response => {
        setCompliments(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the rewards!', error);
      });
  }

  return (
    <div className='task-content'>
    <div className="compliment-collection">
      <h3 className="collection-title">Compliment Collection</h3>
      {compliments.length > 0 ? (
        <div className="compliment-list">
          {currentCompliments.map((compliment) => (
            <div key={compliment.id} className="compliment-card">
              <p className="compliment-text">{compliment.compliment_text}</p>
              <p className="compliment-date">
                Earned on: {new Date(compliment.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
          <div className="pagination-controls">
            <button
              className="pagination-btn"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-btn"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-collection">
          <p className="empty-message">
            🐱 You haven’t received any compliments yet! Complete tasks to earn your first one! 🎉
          </p>
        </div>
      )}
    </div>
    </div>
  )
};

export default ComplimentCollection;