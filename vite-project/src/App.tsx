import Home from './Home';
import Login from './Login'
import { Link, Route, Routes } from 'react-router-dom';
import './App.css'
import Documentation from './Documentation';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/documentation" element={<Documentation />} />
    </Routes>
  )
}

export default App
