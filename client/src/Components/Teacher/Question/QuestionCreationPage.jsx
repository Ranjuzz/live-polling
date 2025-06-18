import React, { useState } from 'react';
import {
  Badge,
  Header,
} from '../../CommonStyles';

import EditableOptions from '../EditableOptions';
import {  Container2, TeacherContainer, QuestionBox, TimerDropdown, Subtitle,Title, TextArea,  AskButton, CharacterCount, Editing
} from './QuestionCreationPageStyle';
import { QuestionHeader } from '../../Student/QuestionPage/QuestionPageStyle';
import { FixedFooter } from '../EditableOptionsStyle';

const QuestionPage = () => {

  const [timer, setTimer] = useState(60);
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
          you’ll have the ability to create and manage polls, ask questions,
          and monitor your students' responses in real-time.
        </Subtitle>
      </Header>

      <QuestionBox>
        <QuestionHeader>
          Enter your question
          <TimerDropdown>{timer} seconds</TimerDropdown>
        </QuestionHeader>
        <TextArea placeholder="Type" />
        <CharacterCount>0/100</CharacterCount>
      </QuestionBox>

      <Editing>
      <EditableOptions />
      </Editing>
      <FixedFooter>
      <AskButton>Ask Question</AskButton>
      </FixedFooter>
      </Container2>
    </TeacherContainer>
    </>
  );
};

export default QuestionPage;
