import React, { useState } from 'react';
import { auth } from './firebase';

//import TodoList from './todo';
//import TodoList from './todowtabledeco';
import TodoList from './tadaa';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error('Error logging in:', error);
      });
  };
//here experiment with normal c or java return later
  return (
    <div>
      {isLoggedIn ? (
        <TodoList />
      ) : (
        

        <>
          <h1>Login</h1>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLogin} className="btn btn-secondary rounded">Login</button>

        </>

      )
      
      }
    </div>
  );
}

export default Login;
