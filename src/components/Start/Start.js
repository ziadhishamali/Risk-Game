import React, { useState } from 'react';

import './Start.css'
const Start = ({ submitStart }) => {
    const [isEgypt, setIsEgypt] = useState(true)
    const [mode, setMode] = useState("simulation")
	const [player1Agent, setPlayer1Agent] = useState("human agent")
    const [player2Agent, setPlayer2Agent] = useState("passive agent")

    const options = [
        'passive agent',
        'aggressive agent',
        'pacifist agent',
        'greedy agent',
        'A* agent',
        'real-time A* agent',
        'minimax agent'
    ]

    const renderOptions = (index) => {
        let arr = options.map((option, idx) => (
            <option key={index + '-' + idx}>{option}</option>
        ))

        return arr
    }

    return (
        <div className="start-wrapper">
            <div className="start-container">
                <h1>Choose the map</h1>
                <div className="start-item">
                    <h2 onClick={() => setIsEgypt(true)} className={isEgypt ? "active" : ""}>Egypt</h2>
                    <h2 onClick={() => setIsEgypt(false)} className={!isEgypt ? "active" : ""}>USA</h2>
                </div>

                <h1>Choose the mode</h1>
                <div className="start-item">
                    <h2 onClick={() => {setMode("simulation"); setPlayer1Agent("passive agent")}} className={mode === "simulation" ? "active" : ""}>Simulation mode</h2>
                    <h2 onClick={() => {setMode("playing"); setPlayer1Agent("human agent")}} className={mode !== "simulation" ? "active" : ""}>Playing mode</h2>
                </div>

                <h1>Choose the agent</h1>
                <div className="start-item">
                    <h3>Player 1 agent:</h3>
                    {
                        mode === "simulation" ? (
                            <select value={player1Agent} onChange={(e) => setPlayer1Agent(e.target.value)}>
                                {renderOptions(1)}
                            </select>
                        ) : (
                            <h4>Player agent</h4>
                        )
                    }
                    <h3>Player 1 agent:</h3>
                    <select value={player2Agent} onChange={(e) => setPlayer2Agent(e.target.value)}>
                        {renderOptions(2)}
                    </select>
                </div>

                <button onClick={() => submitStart({ isEgypt, mode, player1Agent, player2Agent })}>Start Game</button>
            </div>
        </div>
    )
}
 
export default Start
