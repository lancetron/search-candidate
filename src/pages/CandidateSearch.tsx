import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(
    JSON.parse(localStorage.getItem('savedCandidates') || '[]')
  );

  const fetchCandidate = async () => {
    setLoading(true);
    const candidates = await searchGithub();
    if (candidates.length > 0) {
      const user = await searchGithubUser(candidates[0].login);
      setCandidate(user);
    } else {
      setCandidate(null);
    }
    setLoading(false);
  };

  const saveCandidate = () => {
    if (candidate) {
      const updatedCandidates = [...savedCandidates, candidate];
      setSavedCandidates(updatedCandidates);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    }
    fetchCandidate();
  };

  const rejectCandidate = () => {
    fetchCandidate();
  };

  useEffect(() => {
    fetchCandidate();
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (!candidate) return <h2>No more candidates available</h2>;

  return (
    <div>
      <h1>Candidate Search</h1>
      <img src={candidate.avatar_url} alt={`${candidate.login}'s avatar`} width="150" />
      <h2>{candidate.name || 'Name not available'}</h2>
      <p>Username: {candidate.login}</p>
      <p>Location: {candidate.location || 'Not available'}</p>
      <p>Email: {candidate.email || 'Not available'}</p>
      <p>Company: {candidate.company || 'Not available'}</p>
      <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
        GitHub Profile
      </a>
      <div>
        <button onClick={saveCandidate}>+</button>
        <button onClick={rejectCandidate}>-</button>
      </div>
    </div>
  );
};

export default CandidateSearch;
