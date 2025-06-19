import React, { useState } from 'react';
import {
  Badge,
  Header,
} from '../../CommonStyles';

import EditableOptions from '../EditableOptions';
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
import ChatLayout from '../../Chat/ChatLayout';
import ChatWidget from '../../Chat/ChatWidget';
const socket = getSocket();
const QuestionPage = () => {
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState([{ id: 1, text: '', isCorrect: null }]);
  const [timer, setTimer] = useState(60);

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
    console.log('Question sent to students:', payload);
    setQuestionText('');
    setOptions([{ id: 1, text: '', isCorrect: null }]);
    setTimer(60); // Reset to default if desired
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
                <option value={20}>20 seconds</option>
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
    <AskButton onClick={handleAskQuestion}>Ask Question</AskButton>
    </FixedFooter>
  </>
  );
};

export default QuestionPage;
