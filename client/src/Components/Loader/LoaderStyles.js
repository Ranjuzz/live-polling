import styled, { keyframes } from 'styled-components';

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoaderWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;


export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 5px solid #e0d8f9;
  border-top: 5px solid #6a0dad;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 10px;
`;

export const Message = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #111;
  text-align: center;
`;