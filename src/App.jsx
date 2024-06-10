import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import Chatbot from './components/Chatbot/Chatbot';
import LoadingScreen from './components/Loading/LoadingScreen';
import FinalScreen from './components/FinalScreen/FinalScreen';
import './App.css';

const App = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [candidates, setCandidates] = useState(null);
  const [error, setError] = useState(null);

  const handleStartChat = () => {
    setShowChatbot(true);
  };

  const handleFinish = async (responses) => {
    setShowLoading(true);
    setError(null);

    // Map responses to their corresponding codes
    const escolaridadeMap = {
      "Escola Fundamental Completo": 1,
      "Ensino Medio Completo": 2,
      "Ensino Superior Completo": 3,
      "Mestrado Completo": 4,
      "PHD Completo": 5
    };

    const matriculadoFaculdadeMap = {
      "Nao matriculado": 0,
      "Curso Meio Periodo": 1,
      "Curso Tempo Integral": 2
    };

    const requestBody = {
      escolaridade: escolaridadeMap[responses[0]],
      experienciaRelevante: responses[1] === 'SIM',
      horasDeTreinamento: parseInt(responses[2]),
      matriculadoFaculdade: matriculadoFaculdadeMap[responses[3]],
      tempoNoUltimoEmprego: parseInt(responses[4])
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/selecaoCandidatos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      const data = await response.json();
      setTimeout(() => {
        setCandidates(data);
        setShowLoading(false);
        setShowChatbot(false);
      }, 3000); // Garante que a tela de loading apareça por pelo menos 3 segundos
    } catch (err) {
      setTimeout(() => {
        setError('Ocorreu um erro ao carregar os candidatos.');
        setShowLoading(false);
        setShowChatbot(false);
      }, 3000); // Garante que a tela de loading apareça por pelo menos 3 segundos
    }
  };

  const handleRestart = () => {
    setShowChatbot(false);
    setCandidates(null);
    setError(null);
  };

  return (
    <div className="App">
      {!showChatbot && !showLoading && !candidates && !error && <WelcomeScreen handleStart={handleStartChat} />}
      {showChatbot && !showLoading && !candidates && !error && <Chatbot handleFinish={handleFinish} />}
      {showLoading && <LoadingScreen />}
      {!showLoading && (candidates || error) && <FinalScreen candidates={candidates} error={error} onRestart={handleRestart} />}
    </div>
  );
};

export default App;
