import React, { useContext } from 'react';
import ChatWidget from './ChatWidget';
import { AppContext } from '../AppContext';

const ChatLayout = ({ children }) => {

  const {userName} = useContext(AppContext)
  
  return (
    <>
      {children}
      <ChatWidget userName={userName}/>
    </>
  );
};

export default ChatLayout;
