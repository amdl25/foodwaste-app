import React from 'react';
import { useNavigate } from 'react-router-dom';
import './stiluri.css'

export default function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="container">
      <div className = "containerHome">
        <h1 className='titlu'>Aplicatie food waste</h1>
      

      <div className = "btnHome">
        <button className="button-home" onClick={handleLogin}>
          Log in
        </button>
        <button className="button-home" onClick={handleSignUp}>
          Sign up
        </button>
      </div>
      </div>
    </div>
  );
}
