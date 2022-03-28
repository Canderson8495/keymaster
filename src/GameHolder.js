import logo from './logo.svg';
import './GameHolder.css';
import Game from './Game';
import React, { useCallback, useEffect, useState } from 'react';
import { NuiProvider } from "fivem-nui-react-lib";
import {
    useNuiEvent,
    useNuiCallback,
    useNuiRequest,
  } from "fivem-nui-react-lib";

function GameHolder() {
    const [totalScore, setTotalScore] = useState(0);
    const [indivScore, setIndivScore] = useState(0);
    const [started, setStarted] = useState(false);

    const arr = ['W', 'A', 'S'];
    const winScore = 50;

    const reportScore = (score) => {
        setIndivScore(score);
    };

    useNuiEvent("keymaster", "start", setStarted);

    useEffect(() => {
        setTotalScore(totalScore + indivScore);
    }, [indivScore]);

    const { send } = useNuiRequest();
    useEffect(() => {
        if (totalScore >= winScore) {
            //success
            send("success");
            setStarted(false);
        }
        //fail
    }, [totalScore]);


    return (
        started && (
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
        )
    );
}

export default GameHolder;
