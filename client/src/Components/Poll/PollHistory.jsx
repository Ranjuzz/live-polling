import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PollResults from '../Poll/PollResults'; 
import { Header } from '../CommonStyles';
import {Title1} from './PollResultsStyle'
import { useNavigate } from 'react-router-dom';

const PollHistory = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const role = sessionStorage.getItem('role');
  if(role==null || role!='teacher')
    navigate('/home');
  useEffect(() => {
    axios.get('http://localhost:5000/poll-history') 
      .then(res => setHistory(res.data))
      .catch(err => console.error('Error loading poll history:', err));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
        <Title1>
            View <strong> Polling History</strong>
        </Title1>
      {history.length === 0 ? (
        <p>No poll history available yet.</p>
      ) : (
        history.map((poll, index) => (
            <>
            <div key={index} style={{ marginBottom: '2rem' }}>
                <PollResults
                questionText={poll.text}
                options={poll.options}
                percentages={poll.percentages}
                correctIndex={poll.correctIndex}
                showMeta={false}
                index={index+1}
                />
            </div>
          </>
        ))
      )}
    </div>
  );
};

export default PollHistory;
