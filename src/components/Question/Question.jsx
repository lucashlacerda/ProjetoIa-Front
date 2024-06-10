import React, { useState } from 'react';
import './Question.css';

const Question = ({ question, options, type, handleResponse }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    handleResponse(inputValue);
    setInputValue('');
  };

  return (
    <div className="Question-container">
      <p>{question}</p>
      {type === 'number' ? (
        <div>
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Digite um número"
          />
          <button onClick={handleButtonClick} disabled={!inputValue}>
            Enviar
          </button>
        </div>
      ) : (
        options.map((option, index) => (
          <button key={index} onClick={() => handleResponse(option)}>
            {option}
          </button>
        ))
      )}
    </div>
  );
};

export default Question;
