import styled from 'styled-components';

// Wrapper for each result option
export const ResultOptionWrapper = styled.div`
  gap: 1px;
  display: flex;
  flex-direction: column;
  margin: 20px 20px 10px 15px;
`;

// Progress-style filled bar with text inside
export const FilledOptionBar = styled.div`
  background: ${(props) => (props.highlight ? '#8F64E1' : '#f2f2f2')};
  color: ${(props) => (props.highlight ? 'white' : '#222')};
  border: ${(props) => (props.highlight ? '2px solid #8F64E1' : '1px solid #ccc')};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  font-weight: 600;
  position: relative;
  overflow: hidden;
  transition: background 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    color: ${(props) => props.highlight ? 'white' : 'black'};
    width: ${(props) => props.width}%;
    background: ${(props) => (props.highlight ? '#8F64E1' : '#5767D0')};
    z-index: 0;
    transition: width 0.5s ease;
  }

  > * {
    z-index: 1;
  }
`;

// Label inside the option bar
export const OptionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;

  span {
    background: #eee;
    color: #333;
    font-weight: bold;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
`;

// Green badge for correct answer
export const CorrectBadge = styled.span`
  background: #2ecc71;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-left: 10px;
  font-weight: bold;
`;



// Footer note
export const FooterNote = styled.p`
  text-align: center;
  margin-top: 30px;
  font-weight: 600;
  font-size: 15px;
  color: #444;
`;
