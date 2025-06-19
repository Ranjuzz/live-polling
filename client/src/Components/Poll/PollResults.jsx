import React from 'react';
import {
  ResultOptionWrapper,
  FilledOptionBar,
  OptionLabel,
  VoterList,
  CorrectBadge,
  FooterNote
} from './PollResultsStyle';

import {
  QuestionContainer,
  QuestionHeader,
  Timer,
  QuestionBox,
  QuestionSection
} from '../Student/QuestionPage/QuestionPageStyle';

const PollResults = ({ questionText, options, percentages, votes, timeLeft, correctIndex }) => {
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
              <div>{(percentages?.[idx] || 0)}%</div>
            </FilledOptionBar>

            {votes?.[idx]?.length > 0 && (
              <VoterList>
                {votes[idx].map((name, i) => (
                  <li key={i}>{name}</li>
                ))}
              </VoterList>
            )}
          </ResultOptionWrapper>
        ))}
      </QuestionSection>

      <FooterNote>Wait for the teacher to ask a new question..</FooterNote>
    </QuestionContainer>
  );
};

export default PollResults;
