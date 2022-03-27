import './Game.css';
import React, { useState, useEffect, useCallback } from 'react';
import useInterval from 'use-interval'
import { selectOptions } from '@testing-library/user-event/dist/select-options';

function Game(props) {
    const [blockLocation, setBlockLocation] = useState(Math.random() * -200);
    const [success, setSuccess] = useState(false);
    const DELAYMAX = 3000;
    const FPS = 30;
    useInterval(() => {
        if (blockLocation < 100) {
            setBlockLocation(blockLocation + props.speed / FPS);
        } else {
            setBlockLocation(Math.floor(Math.random() * -200));
        }
    }, 1000 / FPS, true);


    function checkOverlap(box1, box2){
        return !(
            box1.top > box2.bottom ||
            box1.right < box2.left ||
            box1.bottom < box2.top ||
            box1.left > box2.right
          );
    }

    function calculateScore(box1, box2){
        const top = Math.max(box1.top, box2.top);
        const bottom = Math.min(box1.bottom, box2.bottom);
        const left = Math.max(box1.left, box2.left);
        const right = Math.min(box1.right, box2.right);
        const overlap = (bottom - top) * (right - left);
        const area = (box1.bottom - box1.top) * (box1.right - box1.left);
        const score = overlap / area;
        return score;
    }

    const handleButtonPress = useCallback((event) => {
        if (event.key === props.letter || event.key === props.letter.toLowerCase()) {

            var el1 = document.getElementById(props.letter + " Target");
            var el2 = document.getElementById(props.letter + " IncomingBlock")
            const domTarget = el1.getBoundingClientRect();
            const domIncomingBlock = el2.getBoundingClientRect();
            if(checkOverlap(domTarget, domIncomingBlock)){
                var score = calculateScore(domTarget, domIncomingBlock) * 10;
                props.reportScore(props.currScore + score);
                setSuccess(true);
            }else{
                setSuccess(false);
            }
            setBlockLocation(Math.floor(Math.random() * -200));
        }
    }, [props.currScore]);

    function reportScore(score){
        props.reportScore(props.currScore + score);
    }

    useEffect(() => {
        document.addEventListener("keydown", handleButtonPress, false);

        return () => {
            document.removeEventListener("keydown", handleButtonPress, false);
        };
    }, []);

    return (
        <div id={props.currScore} className="Game">
            <div id={props.letter + " IncomingBlock"} className="IncomingBlock" style={{ top: blockLocation.toString() + "%" }}>
                <p className="BlockText"> {props.letter} </p>
            </div>
            <div id={props.letter + " Target"} className={"Target " + (success ? "win" : "lose")}>
                <p className="BlockText"> {props.letter} </p>
            </div>
        
        </div>
    );
}

export default React.memo(Game);
