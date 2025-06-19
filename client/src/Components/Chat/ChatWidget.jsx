import React, { useState, useEffect } from 'react';
import {
  ChatContainer, ChatHeader, Tab, TabIndicator,
  ChatContent, ParticipantsList, Participant,
  ChatBox, InputWrapper, TextInput, SendButton,
  ChatToggleButton, MessageContainer, MessageBubble, SenderName
} from './ChatWidgetStyle';
import { FiMessageSquare } from 'react-icons/fi';
import {getSocket} from '../socket'
const socket = getSocket();

const ChatWidget = ({ userName }) => {
  const [activeTab, setActiveTab] = useState('Chat');
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [input, setInput] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    socket.emit('join_chat', userName);
  
    const handleNewMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };
  
    const handleParticipantsUpdate = (list) => {
      setParticipants(list);
    };
  
    socket.off('new_message', handleNewMessage);
    socket.off('participants_update', handleParticipantsUpdate);
  
    socket.on('new_message', handleNewMessage);
    socket.on('participants_update', handleParticipantsUpdate);
  
    return () => {
      socket.emit('leave_chat');
      socket.off('new_message', handleNewMessage);
      socket.off('participants_update', handleParticipantsUpdate);
    };
  }, [userName]);
  

  const handleSend = () => {
    if (input.trim()) {
      const msg = { text: input,sender: userName }
      socket.emit('send_message', input);
      setMessages((prev) => [...prev, msg]);
      setInput('');
    }
  };

  return (
    <>
      <ChatToggleButton onClick={() => setIsVisible(v => !v)}>
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
                  <MessageContainer key={i} isUser={msg.sender === userName}>
                    <SenderName isUser={msg.sender === userName}>
                      {msg.sender}
                    </SenderName>
                    <MessageBubble isUser={msg.sender === userName}>
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
