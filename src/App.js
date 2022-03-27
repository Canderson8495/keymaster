import logo from './logo.svg';
import './App.css';
import Game from './Game';
import React, { useCallback, useEffect, useState } from 'react';

function App() {
  const [totalScore, setTotalScore] = useState(0);
  const [indivScore, setIndivScore] = useState(0);

  const arr = ['W','A','S'];

  const reportScore = (score) => {
    setIndivScore(score);
  };

  useEffect(() => {
    setTotalScore(totalScore + indivScore);
  }, [indivScore]);


  return (
    <div className="App">
      <div className = "Container">
        <h1> {Math.round(totalScore)} </h1>
        <div className="GameHolder">
          {
            arr.map(letter => (
            <Game
              letter={letter}
              speed={75}
              reportScore={reportScore}
              currScore={totalScore}
            />
            ))
          } 
        </div>
      </div>
    </div>
  );
}

export default App;
