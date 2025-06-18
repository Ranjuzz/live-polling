import styled from 'styled-components';

export const OptionsWrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 16px;
  width: 50%;
`;

export const OptionRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
  width: 50%;
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
  border: none;
  font-size: 16px;
  margin-right: 1rem;
  border-radius: 2px;

`;

export const RadioWrapper = styled.div`
  display: flex;
  gap: 1rem;

  label {
    font-size: 14px;
    input {
      margin-right: 6px;
    }
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
  margin-left: 45px;;
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
  padding: 1vh 20vh 2vh 0;
  display: flex;
  justify-content: flex-end;
  box-shadow: 0 -2px 5px rgba(0,0,0,0.05);
  z-index: 1000;
`;
