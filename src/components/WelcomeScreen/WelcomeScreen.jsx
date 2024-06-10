import React from 'react';
import './WelcomeScreen.css';

const WelcomeScreen = ({ handleStart }) => {
  return (
    <div className="WelcomeScreen">
      <div className="WelcomeScreen-content">
        <h2>Bem-vindo ao Chatbot de RH</h2>
        <p>Este chatbot irá ajudá-lo a selecionar candidatos com base em critérios específicos.</p>
        <button onClick={handleStart}>Começar</button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
