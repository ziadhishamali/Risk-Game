import React, { useEffect, useState } from 'react';

export default function Header({ turn, isEgypt, currentCity, message, cities, isReadyToStart, setIsReadyToStart }) {

    const [cc, setCC] = useState(currentCity);

    useEffect(() => {
        // console.log(currentCity);
        setCC(currentCity)
    }, [currentCity])

    let playerName = (owner) => {
        return isEgypt ? owner === 0 ? "player red" : "player blue" : owner === 0 ? "Trump" : "Biden";
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
                <div className="board-header-item city-details">
                    <div className="board-header-item-info">
                        <h1>{`City: `}</h1>
                        {currentCity && <h2>{currentCity.name}</h2>}
                    </div>

                    <div className="board-header-item-info">
                        <h1>{`Occupied by: `}</h1>
                        {currentCity && <h2>{playerName(currentCity.owner)}</h2>}
                    </div>

                    <div className="board-header-item-info">
                        <h1>{`Army: `}</h1>
                        {currentCity && <h2>{currentCity.armies}</h2>}
                    </div>
                </div>

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
            </div>

            {/*<button onClick={() => setIsReadyToStart(!isReadyToStart)}>{isReadyToStart ? 'Pause' : 'Resume'}</button>*/}
            
        </div>
    )
}