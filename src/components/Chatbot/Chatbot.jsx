import React, { useState, useRef, useEffect } from 'react';
import Question from '../Question/Question';
import LoadingScreen from '../Loading/LoadingScreen';
import './Chatbot.css';

const questions = [
  { text: "Qual é o nível de escolaridade necessário?", options: ["Escola Fundamental Completo", "Ensino Medio Completo", "Ensino Superior Completo", "Mestrado Completo", "PHD Completo"], type: 'options' },
  { text: "A experiência relevante é obrigatória?", options: ["SIM", "NÃO"], type: 'options' },
  { text: "Quantas horas de treinamento são exigidas?", type: 'number' },
  { text: "O candidato precisa estar matriculado na faculdade?", options: ["Nao matriculado", "Curso Meio Periodo", "Curso Tempo Integral"], type: 'options' },
  { text: "Qual é o tempo mínimo de permanência no último emprego? (em meses)", type: 'number' }
];

const Chatbot = ({ handleFinish }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState([{ text: questions[0].text, type: 'bot' }]);
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState([]);
  const messagesEndRef = useRef(null);

  const handleResponse = async (response) => {
    const newMessages = [...messages, { text: response, type: 'user' }];
    setMessages(newMessages);
    setResponses([...responses, response]);

    if (currentStep < questions.length - 1) {
      setMessages([...newMessages, { text: questions[currentStep + 1].text, type: 'bot' }]);
      setCurrentStep(currentStep + 1);
    } else {
      setLoading(true);
      await handleFinish([...responses, response]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="Chatbot-container">
      <div className="Messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`Chatbot-message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {currentStep < questions.length && (
        <Question
          question={questions[currentStep].text}
          options={questions[currentStep].options}
          type={questions[currentStep].type}
          handleResponse={handleResponse}
        />
      )}
    </div>
  );
};

export default Chatbot;
