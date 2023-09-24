import React, { useState } from 'react';
//import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from "./Register";
import Login from "./Login";

function Welcome() {
  const [log, setlog] = useState(false);
  const [reg, setreg] = useState(false);
  //const [isLogged, setIsLogged] =useState(false);
const gotologin = () => {
 
      setlog(true);
   
};
const gotoregister = () => {
 
    setreg(true);
 
};
  return (
    <div style={{ 
     // backgroundImage:  "url('https://mdbcdn.b-cdn.net/img/new/slides/041.webp')",
      backgroundImage: "url('https://cdn.shopify.com/s/files/1/0248/2729/7885/files/1_87f06501-1208-438a-84f2-4c583c56b1ed_600x600.png?v=1634967766')",
      backgroundSize: 'cover',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
     // backgroundColor: 'pink' 
    }} >
    
    <div className="jumbotron" style={{ 
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center'
      }}>
        <h1 className="display-4">21 DAYS CHALLENGE!</h1>
        <p>Build any habit</p>
      </div>
    {log ? (
      <Login />
    ) : reg ? (
      <Register />
    ) : (
      <div >
        
     <> <button className="btn btn-secondary btn-lg" onClick={gotologin}>Login</button></>
        <>  <button className="btn btn-secondary btn-lg" onClick={gotoregister}>Register</button> </>
     
      </div>
    )}
  </div>
  );
}
export default Welcome;