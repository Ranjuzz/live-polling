import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PollResults from '../Poll/PollResults';
import { getSocket } from '../socket';
import styled from 'styled-components';
import { AskButton } from './Question/QuestionCreationPageStyle';

const socket = getSocket();

const TeacherLiveResults = () => {
  const [pollResults, setPollResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = sessionStorage.getItem('role');
    if (!role || role !== 'teacher') navigate('/');

    socket.on('poll_results', setPollResults);

    socket.on('poll_ended_due_to_time', () => {
       navigate('/teacher')
       setPollResults(null);
    });

    socket.on('poll_completed_by_all', () => {
      setPollResults(null);
    });

    return () => {
      socket.off('poll_results');
      socket.off('poll_ended_due_to_time');
      socket.off('poll_completed_by_all');
    };
  }, []);

  return (
    <Wrapper>
      <h2>📊 Live Poll Results</h2>

      {pollResults ? (
        <PollResults
          questionText={pollResults.text}
          options={pollResults.options}
          percentages={pollResults.percentages}
          votes={pollResults.votes}
          correctIndex={pollResults.correctIndex}
          timeLeft={0}
          showMeta={false}
        />
      ) : (
        <p>No Poll data</p>
      )}

      <AskButton onClick={() => navigate('/teacher')}>
        + Ask New Question
      </AskButton>
    </Wrapper>
  );
};

export default TeacherLiveResults;

const Wrapper = styled.div`
  padding: 2rem;
`;

const AskBtn = styled.button`
  margin-top: 2rem;
  padding: 10px 20px;
  font-size: 1rem;
  background: #0077ff;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background: #005edc;
  }
`;
