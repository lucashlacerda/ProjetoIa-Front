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
          <li key={candidate.id} className="candidate-card">
            <p><strong>ID:</strong> {candidate.id}</p>
            <p><strong>Cidade ID:</strong> {candidate.cidade_id}</p>
            <p><strong>Gênero:</strong> {candidate.genero}</p>
            <p><strong>Experiência Relevante:</strong> {candidate.experienciaRelevante ? 'Sim' : 'Não'}</p>
            <p><strong>Matriculado na Faculdade:</strong> {candidate.matriculadoFaculdade}</p>
            <p><strong>Escolaridade:</strong> {candidate.escolaridade}</p>
            <p><strong>Tempo de Experiência:</strong> {candidate.tempoDeExperiencia} meses</p>
            <p><strong>Tempo no Último Emprego:</strong> {candidate.tempoNoUltimoEmprego} meses</p>
            <p><strong>Horas de Treinamento:</strong> {candidate.horasDeTreinamento}</p>
            <p><strong>Último Salário:</strong> R${candidate.ultimoSalario}</p>
            <p><strong>Percentual de Compatibilidade:</strong> {candidate.percentualCompatibilidade}%</p>
          </li>
        ))}
      </ul>
      <button onClick={onRestart}>Tentar Novamente</button>
    </div>
  );
};

export default FinalScreen;
