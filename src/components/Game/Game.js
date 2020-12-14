import React, { useState } from 'react'
import Board from './components/Board'

import './Game.css'

/**
* Game class have all the logic of the game itself
* and will send the required data to the board to be displayed
*/
const Game = ({ isEgypt, player1Agent, player2Agent }) => {
    const [turn, setTurn] = useState(0)
    const [numTurns, setNumTurns] = useState(0)
    
    // to be populated with the cities and their respective posX and posY
    const [cities, setCities] = useState([])

    return (
        <div className="game-wrapper">
            <Board isEgypt={isEgypt} turn={turn} numTurns={numTurns} cities={cities} />
        </div>
    )
}
 
export default Game
