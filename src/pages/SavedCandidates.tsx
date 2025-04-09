import { useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(
    JSON.parse(localStorage.getItem('savedCandidates') || '[]')
  );

  const removeCandidate = (id: number) => {
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.id !== id);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  if (savedCandidates.length === 0) {
    return <h2>No candidates have been saved</h2>;
  }

  return (
    <div>
      <h1>Potential Candidates</h1>
      <ul>
        {savedCandidates.map((candidate) => (
          <li key={candidate.id}>
            <img src={candidate.avatar_url} alt={`${candidate.login}'s avatar`} width="100" />
            <h2>{candidate.name || 'Name not available'}</h2>
            <p>Username: {candidate.login}</p>
            <p>Location: {candidate.location || 'Not available'}</p>
            <p>Email: {candidate.email || 'Not available'}</p>
            <p>Company: {candidate.company || 'Not available'}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              GitHub Profile
            </a>
            <button onClick={() => removeCandidate(candidate.id)}>-</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedCandidates;
