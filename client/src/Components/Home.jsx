import { RoleCard,RoleDescription,RoleSelection,RoleTitle} from './HomeStyle';
import React, { useState } from 'react';
import { Button, Badge,Container,Header,Title,Subtitle  } from './CommonStyles';

const Home = () => {
  const [selectedRole, setSelectedRole] = useState('student');

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

      <Button>Continue</Button>
    </Container>
  );
};

export default Home;
