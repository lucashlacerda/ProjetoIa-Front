import React from 'react';
import './FinalScreen.css';

const FinalScreen = ({ candidates, error, onRestart }) => {
  if (error) {
    return (
      <div className="FinalScreen">
        <h2>Erro: {error}</h2>
        <button onClick={onRestart}>Tentar Novamente</button>
      </div>
    );
  }

  return (
    <div className="FinalScreen">
      <h2>Candidatos Encontrados:</h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>
            <p>ID: {candidate.id}</p>
            <p>Cidade ID: {candidate.cidade_id}</p>
            <p>Gênero: {candidate.genero}</p>
            <p>Experiência Relevante: {candidate.experienciaRelevante ? 'Sim' : 'Não'}</p>
            <p>Matriculado na Faculdade: {candidate.matriculadoFaculdade}</p>
            <p>Escolaridade: {candidate.escolaridade}</p>
            <p>Tempo de Experiência: {candidate.tempoDeExperiencia} meses</p>
            <p>Tempo no Último Emprego: {candidate.tempoNoUltimoEmprego} meses</p>
            <p>Horas de Treinamento: {candidate.horasDeTreinamento}</p>
            <p>Último Salário: R${candidate.ultimoSalario}</p>
            <p>Percentual de Compatibilidade: {candidate.percentualCompatibilidade}%</p>
          </li>
        ))}
      </ul>
      <button onClick={onRestart}>Tentar Novamente</button>
    </div>
  );
};

export default FinalScreen;
