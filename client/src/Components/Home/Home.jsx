import { RoleCard,RoleDescription,RoleSelection,RoleTitle} from './HomeStyle';
import React, { useState } from 'react';
import { Button, Badge,Container,Header,Title,Subtitle  } from '../CommonStyles';
import { useNavigate } from 'react-router-dom';
import ChatWidget from '../Chat/ChatWidget';
const Home = () => {
  const [selectedRole, setSelectedRole] = useState('student');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedRole === 'student') {
      navigate('/enter-name');
    } else if (selectedRole === 'teacher') {
      navigate('/teacher');
    }
  };

  return (
    <Container>
      <Badge>✨ Intervue Poll</Badge>
      <Header>
        <Title>
            Welcome to the <strong>Live Polling System</strong>
        </Title>
        <Subtitle>
            Please select the role that best describes you to begin using the live polling system
        </Subtitle>
      </Header>

      <RoleSelection>
        <RoleCard
          selected={selectedRole === 'student'}
          onClick={() => setSelectedRole('student')}
        >
          <RoleTitle>I’m a Student</RoleTitle>
          <RoleDescription>
            Answer and see the results of the poll from your teacher
          </RoleDescription>
        </RoleCard>
        <RoleCard
          selected={selectedRole === 'teacher'}
          onClick={() => setSelectedRole('teacher')}
        >
          <RoleTitle>I’m a Teacher</RoleTitle>
          <RoleDescription>
            Submit answers and view live poll results in real-time.
          </RoleDescription>
        </RoleCard>
      </RoleSelection>
      <Button onClick={handleContinue}>Continue</Button>
    </Container>
  );
};

export default Home;
