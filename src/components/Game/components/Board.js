import React from 'react';

import egyptMap from '../assets/egyptMap.jpg'
import usaMap from '../assets/usaMap.jpg'

/**
 * The game board itself
 * @param {turn} param0 whose player turn
 * @param {numTurns} param1 number of turns since start
 * @param {isEgypt} param2 which map Egypt or USA
 * @param {cities} param3 the cities of the map for displaying nodes on the map
 */
const Board = ({ turn, numTurns, isEgypt, cities }) => {
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