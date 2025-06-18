import styled from 'styled-components';

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
  font-weight: ${({ active }) => (active ? '600' : '400')};
  color: ${({ active }) => (active ? '#000' : '#777')};
  cursor: pointer;
`;

export const TabIndicator = styled.div`
  position: absolute;
  bottom: 0;
  height: 3px;
  width: 50%;
  background-color: #7765DA;
  transition: all 0.3s ease;
  left: ${({ activeTab }) => (activeTab === 'Chat' ? '0%' : '50%')};
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
  align-items: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
`;

export const SenderName = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ isUser }) => (isUser ? '#7765DA' : '#000')};
  margin-bottom: 3px;
  align-self: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
`;

export const MessageBubble = styled.div`
  background-color: ${({ isUser }) => (isUser ? '#7765DA' : '#373737')};
  color: white;
  padding: 10px 14px;
  border-radius: 12px;
  max-width: 75%;
  font-size: 14px;
  line-height: 1.4;
  align-self: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
`;

export const ParticipantsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Participant = styled.div`
  font-weight: 600;
  color: #000;
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
