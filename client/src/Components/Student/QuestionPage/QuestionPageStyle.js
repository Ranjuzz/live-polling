import styled from 'styled-components';

export const QuestionContainer = styled.div`
  max-width: 600px;
  margin: 80px auto;
  background: #fff;
  padding: 24px;
  border-radius: 10px;
`;

export const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
`;

export const Timer = styled.div`
  color: #ff0000;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const QuestionSection = styled.div`
    margin-top: 16px;
    border: 1px solid #7765DA;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
`;

export const QuestionBox = styled.div`
  
  background: linear-gradient(to right, #444, #777);
  color: white;
  padding: 14px 16px;
  border-radius: 6px;
  font-weight: 400;
`;

export const OptionList = styled.div`
  border-radius: 8px;
  padding: 12px;
`;

export const Option = styled.div`
  display: flex;
  align-items: center;
  background: ${({ selected }) => (selected ? '#ffffff' : '#f2f2f2')};
  border: ${({ selected }) => (selected ? '2px solid #7765DA' : '2px solid #ffffff')};
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    border: 2px solid #7765DA;
    background:  ${({ selected }) => (selected ? '#f2f2f2' : '#ffffff')};
  }

  span {
    background: ${({ selected }) => (selected ? '#7765DA' : '#bbb')};
    color: white;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    font-size: 14px;
  }
`;

export const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 12px 28px;
  background: linear-gradient(to right, #7765DA, #4F0DCE);
  color: white;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  float: right;
`;
