import Home from './Home';
import { Route, Routes } from 'react-router-dom';
import './App.css'
function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
