import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ChatWidget from './ChatWidget';
import { LayoutWrapper, TopRightButton } from './ChatWidgetStyle';

const ChatLayout = ({ children, userName }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isTeacher = sessionStorage.getItem('role') == 'teacher';
  console.log(isTeacher);
  const handleClick = () => {
    if (location.pathname !== '/history') {
      navigate('/history');
    } else {
      navigate('/teacher');
    }
  };

  return (
    <LayoutWrapper>
      {isTeacher && (
        <TopRightButton onClick={handleClick}>
          {location.pathname === '/history' ? 'Back To Question' : 'View Poll History'}
        </TopRightButton>
      )}
      {children}
      <ChatWidget userName={userName} />
    </LayoutWrapper>
  );
};

export default ChatLayout;
