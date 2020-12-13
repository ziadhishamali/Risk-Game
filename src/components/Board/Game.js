import React, { useState } from 'react'
import Board from './components/Board'

import './Game.css'

const Game = ({ isEgypt, player1Agent, player2Agent }) => {
    const [turn, setTurn] = useState(0)
    const [numTurns, setNumTurns] = useState(0)

    return (
        <div className="game-wrapper">
            <Board isEgypt={isEgypt} turn={turn} numTurns={numTurns} />
        </div>
    )
}
 
export default Game
