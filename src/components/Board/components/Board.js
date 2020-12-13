import React from 'react';

import egyptMap from '../assets/egyptMap.jpg'
import usaMap from '../assets/usaMap.jpg'

const Board = ({ turn, numTurns, isEgypt }) => {
    return (
        <div className="board-wrapper">
            <div className="board-container">
                <img src={isEgypt ? egyptMap : usaMap} className="board-image" alt="board" />
            </div>

            <div className="board-details">
                <div className="board-details-item">
                    <h1>Num of turns</h1>
                    <h2>{numTurns}</h2>
                </div>

                <div className="board-details-item">
                    <h1>Turn</h1>
                    <h2>{turn % 2 === 0 ? "player 1" : "player 2"}</h2>
                    <span style={{ backgroundColor: turn % 2 === 0 ? "#c60203" : "#1c92d2" }}></span>
                </div>
            </div>
        </div>
    );
}

export default Board
