import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import EnterName from './Components/Student/EnterName/EnterName'
import QuestionPage from './Components/Student/QuestionPage/QuestionPage'
import KickedOutPage from './Components/Student/KickedOutPage/KickedOutPage'
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path= "/" element={<Home />} />
        <Route path= "/home" element={<Home />} />
        <Route path= "/enter-name" element={<EnterName />} />
        <Route path= "/questions" element={<QuestionPage />} />
        <Route path= "/kicked" element={<KickedOutPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
