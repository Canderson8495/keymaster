import logo from './logo.svg';
import './App.css';
import Game from './Game';
import React, { useCallback, useEffect, useState } from 'react';

function App() {
  const [totalScore, setTotalScore] = useState(0);
  const [indivScore, setIndivScore] = useState(0);

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
          <Game
            letter="A"
            speed={25}
            reportScore={reportScore}
            currScore={totalScore}
          />
          <Game
            letter="G"
            speed={50}
            reportScore={reportScore}
            currScore={totalScore}
          />
          <Game
            letter="F"
            speed={50}
            reportScore={reportScore}
            currScore={totalScore}
          />
          <Game
            letter="Z"
            speed={50}
            reportScore={reportScore}
            currScore={totalScore}
          />
          <Game
            letter="Q"
            speed={50}
            reportScore={reportScore}
            currScore={totalScore}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
