import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import EnterName from './Components/EnterName'
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path= "/" element={<Home />} />
        <Route path= "/home" element={<Home />} />
        <Route path= "/enter-name" element={<EnterName />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
