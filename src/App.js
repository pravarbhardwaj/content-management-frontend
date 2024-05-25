import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorPage from './Pages/ErrorPage';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </Router>
  )  
}

export default App;
