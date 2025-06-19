import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding: 40px 80px;
  background-color: #fff;
`;

export const Title = styled.h2`
  font-size: 32px;
  color: black;
  margin-bottom: 40px;

  strong {
    font-weight: 700;
  }
`;

export const QuestionBlock = styled.div`
  margin-bottom: 40px;
`;

export const PollBox = styled.div`
  background-color: white;
  border-radius: 8px;
  border: 1px solid #b99af7;
  margin-bottom: 50px;
  overflow: hidden;
`;

export const QuestionTitle = styled.div`
  background: linear-gradient(to right, #444, #666);
  color: white;
  padding: 10px 15px;
  font-weight: 600;
`;

export const OptionsWrapper = styled.div`
  padding: 10px 15px;
`;

export const OptionRow = styled.div`
  display: flex;
  align-items: center;
  background: #f6f6f6;
  border-radius: 6px;
  padding: 10px 12px;
  margin: 10px 0;
  position: relative;
`;

export const OptionIndex = styled.div`
  background-color: #7e51ff;
  color: white;
  border-radius: 50%;
  font-size: 14px;
  width: 24px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  font-weight: bold;
  margin-right: 12px;
`;

export const OptionText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #222;
  flex: 1;
`;

export const PercentageBar = styled.div`
  background-color: #7e51ff;
  height: 30px;
  width: ${({ percent }) => percent}%;
  position: absolute;
  left: 50px;
  top: 0;
  bottom: 0;
  border-radius: 6px 0 0 6px;
  z-index: 0;
  opacity: 0.6;
`;

export const PercentageValue = styled.div`
  font-weight: bold;
  margin-left: auto;
  z-index: 1;
`;
