import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import { auth } from './firebase';
import { firestore } from './firebase';

import Welcome from './welcomelast';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Welcome />
    
  
  );
}

export default App;

