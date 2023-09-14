import Home from './Home';
import Login from './Login'
import { Link, Route, Routes } from 'react-router-dom';
import './App.css'
function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
