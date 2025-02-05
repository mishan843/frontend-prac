import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div>
        <ToastContainer />
        <nav style={{ padding: "20px", marginBottom: "20px", backgroundColor: "#f5f5f5" }}>
          <Link to="/" style={{ marginRight: "20px" }}>Home</Link>
          <Link to="/login" style={{ marginRight: "20px" }}>Login</Link>
          <Link to="/register">Register</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
