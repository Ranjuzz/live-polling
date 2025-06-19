import React from 'react';
import {
  ResultOptionWrapper,
  FilledOptionBar,
  OptionLabel,
  CorrectBadge,
  FooterNote
} from './PollResultsStyle';

import {
  QuestionContainer,
  QuestionHeader,
  Timer,
  QuestionBox,
  QuestionSection,
  OptionList,
  Option
} from '../Student/QuestionPage/QuestionPageStyle';

import ChatWidget from '../Chat/ChatWidget';

const PollResults = ({ questionText, options, percentages, timeLeft, correctIndex }) => {
  return (
    <QuestionContainer>
      <QuestionHeader>
        <div>Question</div>
        <Timer>
          <span>⏱️</span>
          <span>{String(timeLeft).padStart(2, '0')}s</span>
        </Timer>
      </QuestionHeader>

      <QuestionSection>
        <QuestionBox>{questionText}</QuestionBox>
        <OptionList>
        {options.map((opt, idx) => (
          <ResultOptionWrapper key={idx}>
            <FilledOptionBar
              width={percentages?.[idx] || 0}
              highlight={idx === correctIndex}
            >
              <OptionLabel>
                <span>{idx + 1}</span> {opt}
                {idx === correctIndex && <CorrectBadge>✔</CorrectBadge>}
              </OptionLabel>
              <p>{(percentages?.[idx] || 0)}%</p>
            </FilledOptionBar>
          </ResultOptionWrapper>
        ))}
        </OptionList>
      </QuestionSection>

      <FooterNote>Wait for the teacher to ask a new question..</FooterNote>
      <ChatWidget />
    </QuestionContainer>
  );
};

export default PollResults;
