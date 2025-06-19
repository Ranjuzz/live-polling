import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PollResults from '../Poll/PollResults';
import { getSocket } from '../socket';
import styled from 'styled-components';
import { AskButton } from './Question/QuestionCreationPageStyle';

const socket = getSocket();

const TeacherLiveResults = () => {
  const [pollResults, setPollResults] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = sessionStorage.getItem('role');
    if (!role || role !== 'teacher') navigate('/');

    const handlePollResults = (results) => {
      setPollResults(results);
    };

    const handleNewQuestion = (question) => {
      setCurrentQuestion(question);
    };

    socket.on('poll_results', handlePollResults);
    socket.on('new_question', handleNewQuestion);

    socket.on('poll_ended_due_to_time', () => {
      setPollResults(null);
      setCurrentQuestion(null);
      navigate('/teacher');
    });

    socket.on('poll_completed_by_all', () => {
        setCurrentQuestion(null);
    });

    return () => {
      socket.off('poll_results', handlePollResults);
      socket.off('new_question', handleNewQuestion);
      socket.off('poll_ended_due_to_time');
      socket.off('poll_completed_by_all');
    };
  }, [navigate]);

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
      ) : currentQuestion ? (
        <QuestionDisplay>
          <h3>Question: {currentQuestion.text}</h3>
          <ul>
            {currentQuestion.options.map((opt, idx) => (
              <li key={idx}>
                <strong>{idx + 1}.</strong> {opt}
              </li>
            ))}
          </ul>
          <p><strong>Timer:</strong> {currentQuestion.timer} seconds</p>
        </QuestionDisplay>
      ) : (
        <p>Waiting for question...</p>
      )}

      <AskButton onClick={() => navigate('/teacher')}>
        + Ask New Question
      </AskButton>
    </Wrapper>
  );
};

export default TeacherLiveResults;

// Styled components
const Wrapper = styled.div`
  padding: 2rem;
`;

const QuestionDisplay = styled.div`
  padding: 1.5rem;
  background: #f8f8f8;
  border-radius: 10px;
  margin-bottom: 2rem;

  h3 {
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding-left: 0;
    margin-bottom: 1rem;
  }

  li {
    padding: 0.25rem 0;
  }
`;
