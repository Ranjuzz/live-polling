import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Title, Subtitle, Header, Button, Badge } from "../../CommonStyles";
import { InputWrapper } from './EnterNameStyle';

const EnterName = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const existingName = sessionStorage.getItem('studentName');
    if (existingName) {
      navigate('/poll'); 
    }
  }, [navigate]);

  const handleContinue = () => {
    if (name.trim()) {
      sessionStorage.setItem('studentName', name.trim());
      navigate('/questions'); 
    }
  };

  return (
    <Container>
      <Badge>✨ Intervue Poll</Badge>
      <Header>
        <Title>
          Let’s <strong>Get Started</strong>
        </Title>
        <Subtitle>
          If you’re a student, you’ll be able to <strong>submit your answers</strong>, participate in live polls, and see how your responses compare with your classmates.
        </Subtitle>
      </Header>

      <InputWrapper>
        <label htmlFor="name">Enter your Name</label>
        <input
          type="text"
          id="name"
          placeholder="Rahul Bajaj"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </InputWrapper>

      <Button onClick={handleContinue}>Continue</Button>
    </Container>
  );
};

export default EnterName;
