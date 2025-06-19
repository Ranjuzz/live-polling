import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  QuestionContainer,
  QuestionHeader,
  Timer,
  QuestionBox,
  OptionList,
  Option,
  SubmitButton,
  QuestionSection,
} from './QuestionPageStyle';
import Loader from '../../Loader/Loader';
import PollResults from '../../Poll/PollResults';
import { getSocket } from '../../socket';

const socket = getSocket();

const QuestionPage = () => {
  const [selected, setSelected] = useState(null);
  const [pollResults, setPollResults] = useState(null);
  const [question, setQuestion] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const lastQuestionId = useRef(null);
  const name = sessionStorage.getItem('studentName');
  const role = sessionStorage.getItem('role');
  const navigate = useNavigate();


  useEffect(() => {
    if (!name) {
      navigate('/');
    }
  }, [name, navigate]);

 
  useEffect(() => {
    if (name && role) {
      socket.emit('join_chat', { name, role });
    }

    const handleNewQuestion = (q) => {
      if (lastQuestionId.current === q.id) return;
      lastQuestionId.current = q.id;

      setQuestion(q);
      setTimeLeft(q.timer || 60);
      setHasSubmitted(false);
      setSelected(null);
      setPollResults(null);
    };

    const handlePollResults = (results) => {
      setPollResults(results);
    };

    socket.on('new_question', handleNewQuestion);
    socket.on('poll_results', handlePollResults);

    return () => {
      socket.off('new_question', handleNewQuestion);
      socket.off('poll_results', handlePollResults);
    };
  }, [name, role]);


  useEffect(() => {
    if (timeLeft === 0 && !hasSubmitted && question) {
      handleSubmit(true); // Auto-submit as null
    }

    if (timeLeft <= 0 || hasSubmitted) return;

    const interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, hasSubmitted, question]);

  // 📤 Submit answer
  const handleSubmit = (auto = false) => {
    if (hasSubmitted || !question) return;

    if (!socket.connected) {
      socket.connect(); 
    }

    socket.emit('submit_answer', {
      name,
      answer: auto ? null : question.options[selected],
      questionId: question.id,
    });

    setHasSubmitted(true);
  };

  if (!question) return <Loader />;

  if (pollResults && hasSubmitted) {
    return (
      <PollResults
        questionText={pollResults.text}
        options={pollResults.options}
        percentages={pollResults.percentages}
        votes={pollResults.votes}
        timeLeft={timeLeft}
        correctIndex={pollResults.correctIndex}
      />
    );
  }

  return (
    <QuestionContainer>
      <QuestionHeader>
        <div>{question.title || 'Question'}</div>
        <Timer>
          <span>⏱️</span>
          <span>{timeLeft.toString().padStart(2, '0')}s</span>
        </Timer>
      </QuestionHeader>

      <QuestionSection>
        <QuestionBox>{question.text}</QuestionBox>

        <OptionList>
          {question.options.map((opt, idx) => (
            <Option
              key={idx}
              selected={selected === idx}
              onClick={() =>
                !hasSubmitted && timeLeft > 0 && setSelected(idx)
              }
            >
              <span>{idx + 1}</span> {opt}
            </Option>
          ))}
        </OptionList>
      </QuestionSection>

      <SubmitButton
        type="button"
        onClick={() => handleSubmit(false)}
        disabled={selected === null || hasSubmitted || timeLeft <= 0}
      >
        Submit
      </SubmitButton>

      {hasSubmitted && (
        <p style={{ marginTop: '10px' }}>You’ve submitted your answer!</p>
      )}
    </QuestionContainer>
  );
};

export default QuestionPage;
