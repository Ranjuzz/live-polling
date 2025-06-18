import styled from "styled-components";

export const InputWrapper = styled.div`
  margin-bottom: 1.5rem;
  text-align: left;
  font-size: 18px;
  font-weight: 400;
  color: black;
  display: flex;
  flex-direction: column;
  gap: 12px;

  input {
    height: 60px;
    width: 480px;
    border-radius: 2px;
    background-color: #F2F2F2;
    color: black;
    font-size: 18px;
    border: 0;
    padding: 0px 0 0 20px;
    font-weight: 400;
  }

  &:active {
    color: #F2F2F2;
  }
`;