import React, { useEffect, useState } from 'react'
import Board from './components/Board'

import './Game.css'
import MapData from './components/MapData'
import Node from './components/Node'

const mapData = new MapData()

/**
* Game class have all the logic of the game itself
* and will send the required data to the board to be displayed
*/
const Game = ({ isEgypt, player1Agent, player2Agent }) => {
    const [turn, setTurn] = useState(0)
    const [numTurns, setNumTurns] = useState(0)
    
    // to be populated with the cities and their respective posX and posY
    const [cities, setCities] = useState([])

    const onClickListner = (e, idx) => {
        console.log("path: " + idx)
    }

    useEffect(() => {
        let elements = window.document.getElementsByTagName("path")
        console.log("hello: ", elements)

        // array of nodes using Node.js
        const limit = isEgypt ? 20 : 40
        let cities = []
        let counts = [limit, limit]
        let total = [0, 0]
        // TODO: fill the cities

        for (let i = 0; i < elements.length; i++) {
            let element = elements[i]
            element.addEventListener('click', (e) => {
                onClickListner(e, i)
            })

            // specify which player to own current city
            let owner = 0
            if (total[0] === limit) {
                owner = 1
            } else if (total[1] === limit) {
                owner = 0
            } else {
                owner = Math.floor(Math.random() * 2)
            }
            total[owner]++

            let node = new Node(owner, 1)
            counts[owner]--

            // styling the map svg according to the owner
            if (owner) {
                element.style.fill = '#1c92d2' // blue
            } else {
                element.style.fill = '#c60203' // red
            }

            // add the node to cities
            cities.push(node)
        }

        // TODO: fill the armies for each city
        for (let i = 0; i < cities.length && (counts[0] > 0 || counts[1] > 0); i = (i + 1) % cities.length) {
            let city = cities[i]
            if (counts[city.owner] === 0) {
                continue;
            }
            let count = Math.floor(Math.random() * (counts[city.owner] - 1) + 1);
            counts[city.owner] -= count
            console.log(counts[0], counts[1], count)
            cities[i].armies += count
        }

        let sum = [0, 0]
        for (let i = 0; i < cities.length; i++) {
            sum[cities[i].owner] += cities[i].armies
        }

        console.log("cities: ", cities, sum)
        setCities(cities)
    }, [isEgypt])

    return (
        <div className="game-wrapper">
            <Board isEgypt={isEgypt} turn={turn} numTurns={numTurns} cities={cities} />
        </div>
    )
}
 
export default Game
