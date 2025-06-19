import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import {
  QuestionContainer,
  QuestionHeader,
  Timer,
  QuestionBox,
  OptionList,
  Option,
  SubmitButton,
  QuestionSection
} from './QuestionPageStyle';
import Loader from '../../Loader/Loader';
// import Loader from '../../Loader/Loader';

const socket = io('http://localhost:5000'); // Change to your backend URL

const QuestionPage = () => {
  const [selected, setSelected] = useState(null);
  const [question, setQuestion] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const name = sessionStorage.getItem('studentName');

  useEffect(() => {
    socket.on('new_question', (q) => {
      setQuestion(q);
      setTimeLeft(60);
      setHasSubmitted(false);
      setSelected(null);
    });

    return () => {
      socket.off('new_question');
    };
  }, []);

  useEffect(() => {
    if (timeLeft <= 0 || hasSubmitted) return;
    const interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, hasSubmitted]);

  const handleSubmit = () => {
    if (selected !== null && !hasSubmitted) {
      socket.emit('submit_answer', {
        name,
        answer: question.options[selected]
      });
      setHasSubmitted(true);
    }
  };

  if (!question) {
    return (
      <Loader/>
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
              onClick={() => !hasSubmitted && timeLeft > 0 && setSelected(idx)}
            >
              <span>{idx + 1}</span> {opt}
            </Option>
          ))}
        </OptionList>
      </QuestionSection>

      <SubmitButton
        onClick={handleSubmit}
        disabled={selected === null || hasSubmitted || timeLeft <= 0}
      >
        Submit
      </SubmitButton>

      {hasSubmitted && <p style={{ marginTop: '10px' }}>You’ve submitted your answer!</p>}
    </QuestionContainer>
  );
};

export default QuestionPage;
