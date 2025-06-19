import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import EnterName from './Components/Student/EnterName/EnterName';
import QuestionPage from './Components/Student/QuestionPage/QuestionPage';
import KickedOutPage from './Components/Student/KickedOutPage/KickedOutPage';
import QuestionCreationPage from './Components/Teacher/Question/QuestionCreationPage';
import ChatLayout from './Components/Chat/ChatLayout'; // path to ChatLayout
import PollHistory from './Components/Poll/PollHistory';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/enter-name" element={<EnterName />} />
        <Route path="/kicked" element={<KickedOutPage />} />

        <Route
          path="/questions"
          element={
            <ChatLayout >
              <QuestionPage />
            </ChatLayout>
          }
        />
        <Route
          path="/teacher"
          element={
            <ChatLayout>
              <QuestionCreationPage />
            </ChatLayout>
          }
        />
        <Route
          path="/history"
          element={
            <ChatLayout>
              <PollHistory /> 
            </ChatLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
