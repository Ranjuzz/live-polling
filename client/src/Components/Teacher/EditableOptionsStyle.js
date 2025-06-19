import styled from 'styled-components';

export const OptionsWrapper = styled.div`
  margin-top: 0.85rem;
  max-width: 60%;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  min-width: 100%;
`;

export const Title = styled.p`
    
`;

export const OptionRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
  width: 100%;
`;

export const OptionIndex = styled.div`
  background-color: #7e51ff;
  height: 100%;
  color: white;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 50%;
  margin-right: 1rem;
`;

export const OptionInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  background-color: #f2f2f2;
  color: black;
  border: none;
  font-size: 16px;
  margin-right: 1rem;
  border-radius: 2px;

`;

export const RadioWrapper = styled.div`
  display: flex;
  gap: 1rem;

  input[type='radio'] {
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid #8a2be2; /* purple border */
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    position: relative;
    margin-right: 6px;
  }

  input[type='radio']:checked::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 8px;
    height: 8px;
    background-color: #7765da; 
    border-radius: 50%;
  }

  label {
    display: flex;
    align-items: center;
    font-weight: 500;
    cursor: pointer;
  }
`;


export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: red;
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px;
`;

export const AddOptionButton = styled.button`
  color: #7e51ff;
  border: 1px solid #7e51ff;
  background: transparent;
  margin-left: 45px;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: #aaa;
    color: #aaa;
  }

  &:hover {
    background-color: #f9f9f9;
  }
`;

export const FixedFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  border-top: 1px solid #ccc;
  padding: 2vh 20vh 1vh 0;
  display: flex;
  justify-content: flex-end;
  box-shadow: 0 -1px 5px rgba(0,0,0,0.05);
  z-index: 0;
`;
