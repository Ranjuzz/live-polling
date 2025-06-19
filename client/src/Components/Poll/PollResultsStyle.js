import styled from 'styled-components';
import { Title } from '../CommonStyles';

// Wrapper for each result option
export const ResultOptionWrapper = styled.div`
  gap: 1px;
  display: flex;
  flex-direction: column;
  margin: 20px 20px 10px 15px;
`;

// Progress-style filled bar with text inside
export const FilledOptionBar = styled.div`
  box-sizing: border-box;
  background: ${(props) => (props.highlight ? '#8F64E1' : '#f2f2f2')};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  font-weight: 600;
  overflow: hidden;
  transition: background 0.3s ease;
  position: relative;
  color: white;
  width: 100%;
  min-width: 0; 
  
  p {
    color: black;
    margin: 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${(props) => props.width}%;
    background: ${(props) => (props.highlight ? '#f2f2f2' : '#5767D0')};
    z-index: 0;
    transition: width 0.5s ease;
  }

  > * {
    z-index: 1;
  }
`;


export const OptionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;

  span {
    background: white;
    color: black;
    font-weight: bold;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
`;

export const CorrectBadge = styled.span`
  background: #2ecc71;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-left: 10px;
  font-weight: bold;
`;

export const FooterNote = styled.p`
  text-align: center;
  margin-top: 30px;
  font-weight: 600;
  font-size: 15px;
  color: #444;
`;


export const Title1 = styled(Title)`
  justify-self: left;
  padding: 16px 8px 10px 0;
`