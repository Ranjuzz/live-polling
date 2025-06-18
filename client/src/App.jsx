import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import EnterName from './Components/EnterName/EnterName'
import QuestionPage from './Components/QuestionPage/QuestionPage'
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path= "/" element={<Home />} />
        <Route path= "/home" element={<Home />} />
        <Route path= "/enter-name" element={<EnterName />} />
        <Route path= "/questions" element={<QuestionPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
