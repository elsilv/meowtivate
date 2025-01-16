import axios from 'axios';
import '../styles/index.css';

export const getCompliment = async (userId, taskId, taskName) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/generate-compliment`, { user_id: userId, task_id: taskId, taskName });
    return response.data.compliment;
  } catch (error) {
    console.error('Error fetching compliment:', error);
    return 'Meow-gical! ⭐ Your task has been marked as completed, great job! 🎉';
  }
}