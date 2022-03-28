import logo from './logo.svg';
import './App.css';
import Game from './Game';
import React, { useCallback, useEffect, useState } from 'react';
import { NuiProvider } from "fivem-nui-react-lib";

function GameHolder() {
    const [totalScore, setTotalScore] = useState(0);
    const [indivScore, setIndivScore] = useState(0);

    const arr = ['W', 'A', 'S'];
    const winScore = 50;

    const reportScore = (score) => {
        setIndivScore(score);
    };

    useEffect(() => {
        setTotalScore(totalScore + indivScore);
    }, [indivScore]);

    useEffect(() => {
        if (totalScore >= winScore) {
            alert('You Win!');
        }
    }, [totalScore]);


    return (
        <div className="Container">
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
    );
}

export default GameHolder;
