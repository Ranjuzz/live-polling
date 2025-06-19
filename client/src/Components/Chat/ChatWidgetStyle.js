import styled from 'styled-components';
import { Button } from '../CommonStyles';

export const ChatContainer = styled.div`
  position: fixed;
  bottom: 80px;
  right: 30px;
  width: 300px;
  height: 400px;
  background: white;
  border: 2px solid #1e90ff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
`;

export const ChatHeader = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 12px;
  border-bottom: 1px solid #ccc;
  position: relative;
`;

export const Tab = styled.div`
  font-weight: ${(props) => (props.$active ? '600' : '400')};
  color:  ${(props) => (props.$active ? '#000' : '#777')};
  cursor: pointer;
`;

export const TabIndicator = styled.div`
  position: absolute;
  bottom: 0;
  height: 3px;
  width: 50%;
  background-color: #7765DA;
  transition: all 0.3s ease;
  left:  ${(props) => (props.$activeTab === 'Chat' ? '0%' : '50%')};
`;

export const ChatContent = styled.div`
  flex: 1;
  padding: 12px;
  overflow-y: auto;

  p {
    color: blue;
    margin: 0;
  }
`;
// Message bubble styles
export const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isUser ? 'flex-end' : 'flex-start')};
`;

export const SenderName = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => (props.$isUser ? '#7765DA' : '#000')};
  margin-bottom: 3px;
  align-self: ${(props) => (props.$isUser ? 'flex-end' : 'flex-start')};
`;

export const MessageBubble = styled.div`
  background-color: ${(props) => (props.$isUser ? '#7765DA' : '#373737')};
  color: white;
  padding: 10px 14px;
  border-radius: 12px;
  max-width: 75%;
  font-size: 14px;
  line-height: 1.4;
  align-self: ${(props) => (props.$isUser ? 'flex-end' : 'flex-start')};
`;

export const ParticipantsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Participant = styled.div`
  font-weight: 400;
  color: #000;
  display: flex;
  justify-content: space-between;

  p {
    color: #726F6F;
    font-size: 12px;
  }

`;

export const InputWrapper = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #f2f2f2;
`;

export const TextInput = styled.input`
  flex: 1;
  padding: 8px;
  color: black;
  background-color: #f2f2f2;
  border-radius: 8px;
  border: none;
  outline: none;
`;

export const SendButton = styled.button`
  background: #7765da;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  margin-left: 8px;
  cursor: pointer;
  font-size: 16px;
`;

export const ChatToggleButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 30px;
  background-color: #7e51ff;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);

  svg {
    color: white;
    font-size: 26px;
  }
`;

export const LayoutWrapper = styled.div`
  position: relative;
  padding: 1rem;
`;

export const TopRightButton = styled(Button)`
  position: fixed;
  top: 1rem;
  max-width: fit-content;
  right: 1rem;
  color: white;
  border: none;
  font-size: 16px;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  z-index: 1000;
  font-weight: 400;

  &:hover {
    background-color: #45a049;
  }
`;
