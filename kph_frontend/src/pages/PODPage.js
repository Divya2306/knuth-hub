import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PODPage.css';

function PODPage() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    axios.get('/api/pod').then((res) => setProblems(res.data));
  }, []);

  return (
    <div className="pod-page">
      <h1>Problem of the Day</h1>
      <div className="problem-list">
        {problems.map((problem) => (
          <div key={problem.id} className="problem-card">
            <h2>{problem.title}</h2>
            <p>{problem.description}</p>
            <a href={problem.link} target="_blank" rel="noopener noreferrer">
              Solve this problem
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PODPage;
