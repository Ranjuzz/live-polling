import React, { useState } from 'react';
import {
  ChatContainer,
  ChatHeader,
  Tab,
  TabIndicator,
  ChatContent,
  ParticipantsList,
  Participant,
  ChatBox,
  InputWrapper,
  TextInput,
  SendButton,
  ChatToggleButton,
  MessageBubble,
  MessageContainer,
  SenderName
} from './ChatWidgetStyle';
import { FiMessageSquare } from 'react-icons/fi';

const ChatWidget = () => {
  const [activeTab, setActiveTab] = useState('Participants');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'You' }]);
      setInput('');
    }
  };

  const participants = ['Rahul', 'Nadeem', 'Pushpender'];

  return (
    <>
      <ChatToggleButton onClick={() => setIsVisible(!isVisible)}>
        <FiMessageSquare />
      </ChatToggleButton>

      {isVisible && (
        <ChatContainer>
          <ChatHeader>
            <Tab active={activeTab === 'Chat'} onClick={() => setActiveTab('Chat')}>Chat</Tab>
            <Tab active={activeTab === 'Participants'} onClick={() => setActiveTab('Participants')}>Participants</Tab>
            <TabIndicator activeTab={activeTab} />
          </ChatHeader>

          <ChatContent>
            {activeTab === 'Chat' ? (
              <ChatBox>
                {messages.map((msg, i) => (
                  <MessageContainer key={i} isUser={msg.sender === 'You'}>
                    <SenderName isUser={msg.sender === 'You'}>
                      {msg.sender}
                    </SenderName>
                    <MessageBubble isUser={msg.sender === 'You'}>
                      {msg.text}
                    </MessageBubble>
                  </MessageContainer>
                ))}
              </ChatBox>
            ) : (
              <ParticipantsList>
                {participants.map((name, i) => (
                  <Participant key={i}>{name}</Participant>
                ))}
              </ParticipantsList>
            )}
          </ChatContent>

          {activeTab === 'Chat' && (
            <InputWrapper>
              <TextInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <SendButton onClick={handleSend}>➤</SendButton>
            </InputWrapper>
          )}
        </ChatContainer>
      )}
    </>
  );
};

export default ChatWidget;
