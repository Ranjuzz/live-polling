import React, { useState } from 'react';
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

const QuestionPage = () => {
  const [selected, setSelected] = useState(null);
  const options = ['Mars', 'Venus', 'Jupiter', 'Saturn'];

  return (
    <QuestionContainer>
      <QuestionHeader>
        <div>Question 1</div>
        <Timer>
          <span>⏱️</span>
          <span>00:15</span>
        </Timer>
      </QuestionHeader>
    <QuestionSection>
        <QuestionBox>
            Which planet is known as the Red Planet?
        </QuestionBox>

        <OptionList>
            {options.map((opt, idx) => (
            <Option key={idx} selected={selected === idx} onClick={() => setSelected(idx)}>
                <span>{idx + 1}</span> {opt}
            </Option>
            ))}
        </OptionList>
      </QuestionSection>

      <SubmitButton>Submit</SubmitButton>
    </QuestionContainer>
  );
};

export default QuestionPage;
