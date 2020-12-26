import React, { useEffect, useState } from 'react';

export default function Header({ turn, isEgypt, currentCity, message }) {

    const [cc, setCC] = useState(currentCity);

    useEffect(() => {
        // console.log(currentCity);
        setCC(currentCity)
    }, [currentCity])

    let playerName = (owner) => {
        let x = owner || turn;
        return isEgypt ? x % 2 === 0 ? "player red" : "player blue" : x % 2 === 0 ? "Trump" : "Biden";
    }

    return (
        <div className="board-header">
            <div className="board-header-item">
                <span style={{ backgroundColor: turn % 2 === 0 ? "#c60203" : "#1c92d2" }}></span>
                <h1>{playerName()}'s Turn</h1>
            </div>

            <div className="board-header-item no-of-turns">
                <h2>{message}</h2>
            </div>

            <div className="board-header-item no-of-turns">
                <h1>Num of turns</h1>
                <h2>{turn}</h2>
            </div>

            <div className="city-details-container">
                {currentCity && currentCity.name && <div className="board-header-item city-details">
                    <h1>{`City: ${currentCity.name}`}</h1>
                    <h1>{`Occupied by: ${playerName(currentCity.owner)}`}</h1>
                    <h1>{`Army: ${currentCity.armies}`}</h1>
                </div>}
            </div>
            
        </div>
    )
}