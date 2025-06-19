import styled from 'styled-components';
import { Container } from '../../CommonStyles';

export const TeacherContainer = styled(Container)`
  width: 100%;
  gap: 8px;
`;

export const Container2 = styled.div`
  display: flex;
  min-height: 90vh;
  flex-direction: column;
  padding: 4vh 5vw;
  justify-content: flex-start;
  width: 80vw;
  background-color: #FFFFFF;
`;

export const TimerSelect = styled.select`
  background: #f2f2f2;
  border: none;
  color: black;
  width: 100%;
  height: 100%;
  padding: 4px 8px;
  font-size: 14px;
  border-radius: 2px;
  font-weight: 400;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  option {
    color: #000;
    background: #fff;
  }

`;


export const Title = styled.div`
  font-size: 40px;
  color: black;
  margin: 0 0 0 0;
  justify-self: left;
  font-weight: 400;
  padding: 16px 8px 16px 0px;
  strong {
    font-weight: 600; 
  }
`;

export const Subtitle = styled.p`
  color: #6E6E6E;
  text-align: left;
  margin: 0 10vw 0 0;
  font-size: 16px;
  strong {
    color: black;
  }
`;

export const QuestionBox = styled.div`
  width: 50vw;
  margin: 35px 10vw 0 0;
`;

export const TimerDropdown = styled.div`
  background: #f2f2f2;
  padding: 10px 18px 10px 1px;
  margin: 0 0 10px 0px;
  font-size: 14px;
  border-radius: 7px;
  gap: 10px;
`;

export const TextArea = styled.textarea`
    max-width: 865px;
    min-width: 100%;
    height: 11vh;
    margin-top: 0.5rem;
    border-radius: 2px;
    resize: none;
    background-color: #F2F2F2;
    color: black;
    font-size: 18px;
    border: 0;
    padding: 10px 0 0 20px;
    font-weight: 400;
`;

export const CharacterCount = styled.div`
  text-align: right;
  font-size: 15px;
  font-weight: 400;
  color: black;
`;

export const OptionRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

export const OptionNumber = styled.div`
  background-color: #7e51ff;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 50%;
  font-size: 14px;
  margin-right: 1rem;
`;

export const InputWrapper = styled.div`
  margin-bottom: 1.5rem;
  text-align: left;
  font-size: 18px;
  font-weight: 400;
  color: black;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &:active {
    color: #F2F2F2;
}
`;

export const Editing = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  font-size: 18px;
`;

export const OptionInput = styled.input`
  background-color: #f4f4f4;
  border: none;
  padding: 0.6rem;
  font-size: 15px;
  flex: 1;
  margin-right: 1rem;
`;

export const RadioWrapper = styled.div`
  display: flex;
  gap: 1rem;

  label {
    font-size: 14px;

    input {
      margin-right: 4px;
    }
  }
`;

export const AddOption = styled.div`
  color: #7e51ff;
  border: 1px solid #7e51ff;
  border-radius: 7px;
  display: inline-block;
  padding: 0.4rem 1rem;
  margin-top: 1.5rem;
  font-size: 14px;
  cursor: pointer;
`;

export const AskButton = styled.button`
  margin: 10px 20px 10px;
  padding: 12px 28px;
  background: linear-gradient(to right, #7765DA, #4F0DCE);
  color: white;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  float: right;
`

