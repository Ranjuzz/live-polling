import React, { useState,useEffect } from 'react';
import {
  Badge,
  Header,
} from '../../CommonStyles';
import { useNavigate } from 'react-router-dom';
import EditableOptions from '../EditableOptions';
import PollResults from '../../Poll/PollResults';
import {
  Container2,
  TeacherContainer,
  QuestionBox,
  TimerDropdown,
  Subtitle,
  Title,
  TextArea,
  AskButton,
  CharacterCount,
  Editing,
  TimerSelect,
} from './QuestionCreationPageStyle';

import { QuestionHeader } from '../../Student/QuestionPage/QuestionPageStyle';
import { FixedFooter } from '../EditableOptionsStyle';
import {getSocket} from '../../socket'

const QuestionPage = () => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem('role');
  if(role == null || role!='teacher') {
    navigate('/');
  }
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState([{ id: 1, text: '', isCorrect: null }]);
  const [timer, setTimer] = useState(60);
  const [isPollActive, setIsPollActive] = useState(false);

  const socket = getSocket();
  
  useEffect(() => {

    
    socket.on('question_rejected', (msg) => {
      alert(msg); // or show toast
      setIsPollActive(true); // Still active, prevent button
    });

  socket.on('poll_ended_due_to_time', () => {

    setIsPollActive(false); // Allow teacher to ask again
  });

  socket.on('poll_completed_by_all', () => {

    setIsPollActive(false); // All students submitted
  });

  return () => {
    socket.off('question_rejected');
    socket.off('poll_ended_due_to_time');
    socket.off('poll_completed_by_all');
  };
}, []);


  const handleAskQuestion = () => {
    const filledOptions = options.filter(opt => opt.text.trim() !== '');
  
    if (!questionText.trim() || filledOptions.length < 2) {
      alert('Please enter a question and at least 2 options.');
      return;
    }
  
    const payload = {
      text: questionText,
      options: filledOptions.map(opt => opt.text),
      timer,
    };
  
    socket.emit('ask_question', payload);
    setIsPollActive(true); 
    setTimeout(() => {
      navigate('/teacher/live');
    }, 500);

    setQuestionText('');
    setOptions([{ id: 1, text: '', isCorrect: null }]);
    setTimer(60);
  };
  

  return (
    <>
    <TeacherContainer>
      <Container2>
        <Badge>✨ Intervue Poll</Badge>

        <Header>
          <Title>
            Let's <strong>Get Started</strong>
          </Title>
          <Subtitle>
            You’ll be able to create and manage polls, ask questions,
            and monitor your students' responses in real-time.
          </Subtitle>
        </Header>

        <QuestionBox>
          <QuestionHeader>
            Enter your question
            <TimerDropdown>
              <TimerSelect value={timer} onChange={(e) => setTimer(Number(e.target.value))}>
                <option value={15}>15 seconds</option>

                <option value={45}>45 seconds</option>
                <option value={60}>60 seconds</option>
              </TimerSelect>
            </TimerDropdown>
          </QuestionHeader>

          <TextArea
            placeholder="Type your question here"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            maxLength={100}
          />
          <CharacterCount>{questionText.length}/100</CharacterCount>
        </QuestionBox>

        <Editing>
          <EditableOptions options={options} setOptions={setOptions} />
        </Editing>
      </Container2>
    </TeacherContainer>
    <FixedFooter>
    <AskButton
  onClick={handleAskQuestion}
  disabled={isPollActive}
>
  {isPollActive ? 'Waiting for current poll…' : 'Ask Question'}
</AskButton>

    </FixedFooter>
  </>
  );
};

export default QuestionPage;
