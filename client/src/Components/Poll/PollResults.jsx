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

const PollResults = ({ index,  questionText, options, percentages, correctIndex, showMeta = true }) => {
  return (
    <QuestionContainer>
      
      <QuestionHeader>
        <div>Question {index}</div>
        {showMeta && (<Timer>
          <span>⏱️</span>
          <span>Done</span>
        </Timer>)}
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

      {showMeta && (
        <>
          <FooterNote>Wait for the teacher to ask a new question..</FooterNote>
          <ChatWidget />
        </>
      )}
    </QuestionContainer>
  );
};


export default PollResults;
