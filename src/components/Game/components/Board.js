import React from 'react';

// import egyptMap from '../assets/eg.svg'
// import usaMap from '../assets/us.svg'
import { ReactComponent as EgyptMap } from '../assets/eg.svg'
import { ReactComponent as UsaMap } from '../assets/us-2.svg'

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
                {
                    isEgypt ? <EgyptMap className="board-image" /> : <UsaMap className="board-image" />
                }
                {/*<img src={isEgypt ? egyptMap : usaMap} className="board-image" alt="board" />*/}
            </div>

            <div className="board-details">
                <div className="board-details-item">
                    <h1>Num of turns</h1>
                    <h2>{numTurns}</h2>
                </div>

                <div className="board-details-item">
                    <h1>Turn</h1>
                    <h2>{isEgypt ? turn % 2 === 0 ? "El Sisi red" : "El Sisi blue" : turn % 2 === 0 ? "Trump" : "Biden"}</h2>
                    <span style={{ backgroundColor: turn % 2 === 0 ? "#c60203" : "#1c92d2" }}></span>
                </div>
            </div>
        </div>
    );
}

export default Board
