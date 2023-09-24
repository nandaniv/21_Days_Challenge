import React, { useState } from 'react';
import { auth } from './firebase';
import Login from './Login';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [additionalContent, setAdditionalContent] = useState('');
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      setAdditionalContent('You are registered :)) Please go back and log in.');
      console.log('User registered:', user);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button><br/>
        <p>{additionalContent}</p>
    
      </form>
    </div>
  );
};

export default Register;
