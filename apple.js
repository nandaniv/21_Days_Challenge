import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Crud from './Crud';
import { auth } from './firebase';
import { firestore } from './firebase';

function Apple() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/crud">CRUD</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/crud" element={<Crud />} />
      </Routes>
    </Router>
  );
}

export default App;
