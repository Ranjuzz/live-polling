import React from 'react';
import {
  PageWrapper,
  Title,
  QuestionBlock,
  QuestionTitle,
  OptionsWrapper,
  OptionRow,
  OptionIndex,
  OptionText,
  PercentageBar,
  PercentageValue,
  PollBox
} from './PollHistoryStyles';

const dummyData = [
  {
    question: 'Which planet is known as the Red Planet?',
    options: [
      { text: 'Mars', percent: 75 },
      { text: 'Venus', percent: 5 },
      { text: 'Jupiter', percent: 5 },
      { text: 'Saturn', percent: 15 },
    ]
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: [
      { text: 'Mars', percent: 75 },
      { text: 'Venus', percent: 5 },
      { text: 'Jupiter', percent: 5 },
      { text: 'Saturn', percent: 15 },
    ]
  }
];

const PollHistoryPage = () => {
  return (
    <h1>Hello</h1>
  );
};

export default PollHistoryPage;
