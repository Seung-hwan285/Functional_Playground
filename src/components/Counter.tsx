import React, { useState } from 'react';
import { option } from 'fp-ts';
import { fold } from 'fp-ts/lib/Option';
import {increment, pipe} from "fp-ts/function";

type GameState = {
    start: number;
    maxRange: number;
    currentNumber: number;
    gameOver: boolean;
};


function Counter(){
    const [gameState, setGameState] = useState<GameState>({
        start:1,
        maxRange:100,
        currentNumber:1,
        gameOver:false,
    });


    const handleNumberClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const number = parseInt(value);

        setGameState((prevState => ({
            ...prevState,
            currentNumber : number
        })));
    };

    const handleNextClick = () => {
        setGameState((prevGameState) =>
            pipe(
                prevGameState.currentNumber,
                increment,
                option.fromPredicate((nextNumber :number) => nextNumber <= prevGameState.maxRange),
                fold(
                    () => prevGameState,
                    (nextNumber: number) => ({
                        ...prevGameState,
                        currentNumber: nextNumber,
                        gameOver: nextNumber > prevGameState.maxRange,
                    })
                )
            )
        );
    };

    return (
        <div>
            <h1>숫자</h1>
                <div>
                    <p>시작: {gameState.start}</p>
                    <p>최대값: {gameState.maxRange}</p>
                    <p>현재 값: {gameState.currentNumber}</p>
                    <input
                        type="number"
                        value={gameState.currentNumber}
                        onChange={handleNumberClick}
                    />
                    <button onClick={handleNextClick}>Next Number</button>
                </div>
        </div>
    );
};

export default Counter;