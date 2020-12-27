import React, { useEffect, useState } from 'react';
import './Scoreboard.css'
import Trump from '../assets/trump.png'
import Biden from '../assets/biden.png'

export default function Scoreboard({ cities, isEgypt, playerName }) {

    let renderBasic = () => {
        return (
            <div className="board-header-item city-details board-score-container">
                <div className="board-score-item">
                    <h1>{playerName(0) + ": "}</h1>
                    {
                        cities.map((city, idx) => {
                            if (city.owner === 0) {
                                return <span key={idx} className={(isEgypt ? "is-egypt" : "")}>{/*city.name + " " + city.armies*/}</span>
                            }
                            return ""
                        })
                    }
                </div>

                <div className="board-score-item">
                    <h1>{playerName(1) + ": "}</h1>
                    {
                        cities.map((city, idx) => {
                            if (city.owner === 1) {
                                return <span key={idx} className={"blue-span " + (isEgypt ? "is-egypt" : "")}>{/*city.name + " " + city.armies*/}</span>
                            }
                            return ""
                        })
                    }
                </div>
            </div>
        )
    }

    let renderRace = () => {
        return (
            <div className="board-header-item city-details scoreboard-container">
                <div className="candidate-card trump">
                    <img src={Trump} style={{ width: 150 }} />
                </div>
                <div className="red-bar" style={{ flex: cities.filter(city => { return city.owner === 0 }).length }} />
                <div className="blue-bar" style={{ flex: cities.filter(city => { return city.owner === 1 }).length }} />
                <div className="candidate-card biden">
                    <img src={Biden} style={{ width: 120 }} />
                </div>
            </div>
        )
    }

    return (
        isEgypt ? renderBasic() : renderRace()
    )
}