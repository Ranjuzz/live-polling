import React from 'react';
import ChatWidget from './ChatWidget';

const ChatLayout = ({ children }) => {
  return (
    <>
      {children}
      <ChatWidget />
    </>
  );
};

export default ChatLayout;
