import React, { useCallback, useEffect, useState } from 'react'
import Board from './components/Board'

import './Game.css'
import MapData from './components/MapData'
import Node from './components/Node'
import PassiveAgent from '../Agents/PassiveAgent'
import AgressiveAgent from '../Agents/AgressiveAgent'
import PacifistAgent from '../Agents/PacifistAgent'
import GreedyAgent from '../Agents/GreedyAgent'
import AStarAgent from '../Agents/AStarAgent'
import AStarRealAgent from '../Agents/AStarRealAgent'
import MinimaxAgent from '../Agents/MinimaxAgent'
import HumanAgent from '../Agents/HumanAgent'
import Controller from './components/Controller'
import Dialog from '../Dialog/Dialog'

const mapData = new MapData()


const egNeighborhood = {
    [`Matruh`]: ['Al Iskandariyah', 'Al Buhayrah', 'Al Jizah', 'Al Wadi at Jadid'],
    [`Al Iskandariyah`]: ['Matruh', 'Al Buhayrah'],
    [`Al Buhayrah`]: ['Al Iskandariyah', 'Matruh', 'Al Jizah', 'Al Minufiyah',
        'Al Gharbiyah', 'Kafr ash Shaykh'],
    [`Al Jizah`]: ['Al Qahirah', 'Al Buhayrah', 'Al Minya', 'Al Wadi at Jadid',
        'Bani Suwayf', 'Al Fayyum', 'Al Bahr al Ahmar', 'As Suways', 'Al Qalyubiyah', 'Al Minufiyah'],
    [`Al Wadi at Jadid`]: ['Matruh', 'Al Jizah', 'Al Minya', 'Asyut',
        'Suhaj', 'Qina', 'Aswan'],
    ['Al Minufiyah']: [`Al Buhayrah`, `Al Jizah`, 'Al Gharbiyah', 'Ad Daqahliyah', 'Al Qalyubiyah'],
    ['Al Gharbiyah']: ['Al Buhayrah', 'Al Minufiyah', 'Ad Daqahliyah', 'Kafr ash Shaykh'],
    ['Kafr ash Shaykh']: ['Al Buhayrah', 'Al Gharbiyah', 'Ad Daqahliyah'],
    ['Al Qahirah']: ['Al Jizah', 'As Suways', 'Al Isma`iliyah', 'Ash Sharqiyah', 'Al Qalyubiyah'],
    ['Al Minya']: ['Al Jizah', 'Al Wadi at Jadid', 'Bani Suwayf', 'Al Bahr al Ahmar', 'Asyut'],
    ['Bani Suwayf']: ['Al Jizah', 'Al Minya', 'Al Fayyum', 'Al Bahr al Ahmar'],
    ['Al Fayyum']: ['Al Jizah', 'Bani Suwayf'],
    ['Al Bahr al Ahmar']: ['As Suways', `Al Jizah`, 'Bani Suwayf', 'Al Minya', 'Asyut', 'Suhaj', 'Qina', 'Aswan'],
    ['As Suways']: ['Al Jizah', 'Al Qahirah', 'Al Bahr al Ahmar', 'Al Isma`iliyah', 'Janub Sina', 'Shamal Sina'],
    ['Al Qalyubiyah']: ['Al Jizah', 'Al Qahirah', 'Al Minufiyah', 'Al Isma`iliyah', 'Ash Sharqiyah', 'Ad Daqahliyah'],
    ['Asyut']: ['Al Wadi at Jadid', 'Al Minya', 'Al Bahr al Ahmar', 'Suhaj'],
    ['Suhaj']: ['Al Wadi at Jadid', 'Asyut', 'Al Bahr al Ahmar', 'Qina'],
    ['Qina']: ['Al Wadi at Jadid', 'Suhaj', 'Al Bahr al Ahmar', 'Aswan'],
    ['Aswan']: ['Al Wadi at Jadid', 'Qina', 'Al Bahr al Ahmar'],
    ['Ad Daqahliyah']: ['Al Minufiyah', 'Al Gharbiyah', 'Kafr ash Shaykh', 'Al Qalyubiyah', 'Ash Sharqiyah', 'Dumyat'],
    ['Al Isma`iliyah']: ['Al Qahirah', 'As Suways', 'Ash Sharqiyah', 'Shamal Sina', 'Bur Sa`id'],
    ['Ash Sharqiyah']: ['Al Qahirah', 'Al Qalyubiyah', 'Ad Daqahliyah', 'Al Isma`iliyah'],
    ['Janub Sina']: ['As Suways', 'Shamal Sina'],
    ['Dumyat']: ['Ad Daqahliyah'],
    ['Shamal Sina']: ['Al Isma`iliyah', 'Janub Sina', 'As Suways', 'Bur Sa`id'],
    ['Bur Sa`id']: ['Al Isma`iliyah', 'Shamal Sina'],
}



/**
* Game class have all the logic of the game itself
* and will send the required data to the board to be displayed
*/
const Game = ({ isEgypt, player1Agent, player2Agent }) => {
    const [numTurns, setNumTurns] = useState(0)
    const [isListenersAdded, setIsListenersAdded] = useState(false)

    const [showDialog, setShowDialog] = useState(false)
    const [dialogValue, setDialogValue] = useState("")
    const [dialogDone, setDialogDone] = useState(false)
    const [dialogMessage, setDialogMessage] = useState("")

    const [extraArmies, setExtraArmies] = useState("")

    // to be populated with the cities
    const [cities, setCities] = useState([])

    const [currentCity, setCurrentCity] = useState({})
    const [message, setMessage] = useState("")

    const [firstClickCity, setFirstClickCity] = useState(undefined)
    const [secondClickCity, setSecondClickCity] = useState(undefined)
    const [isReadyToStart, setIsReadyToStart] = useState(false)

    const [turnStep, setTurnStep] = useState(0)

    const [player1, setPlayer1] = useState(undefined)
    const [player2, setPlayer2] = useState(undefined)

    const getAgent = (agentName, color) => {
        switch (agentName) {
            case 'passive agent':
                return new PassiveAgent(color)

            case 'aggressive agent':
                return new AgressiveAgent(color)

            case 'pacifist agent':
                return new PacifistAgent(color)

            case 'greedy agent':
                return new GreedyAgent(color)

            case 'A* agent':
                return new AStarAgent(color)

            case 'real-time A* agent':
                return new AStarRealAgent(color)

            case 'minimax agent':
                return new MinimaxAgent(color)
            default:
                return new HumanAgent(color)
        }
    }

    const clickListener = useCallback((e) => {
        let name = e.target.getAttribute('name')
        if ((player1Agent === 'human agent' && numTurns % 2 === 0) || (player2Agent === 'human agent' && numTurns % 2 === 1)) {
            let node = cities.find(city => city.name === name)

            console.log(firstClickCity, secondClickCity)
            if (firstClickCity === undefined) {
                console.log("onclick first city")
                setFirstClickCity({
                    name,
                    ...node
                })
            } else {
                console.log("onclick second city")
                setSecondClickCity({
                    name,
                    ...node
                })
            }
        }
    }, [cities, firstClickCity, numTurns, player1Agent, player2Agent, secondClickCity])

    const hoverListener = useCallback((e) => {
        let name = e.target.getAttribute('name')
        let node = cities.find(city => city.name === name)

        // console.log(node.owner)

        setCurrentCity({
            name,
            ...node
        })
    }, [cities])

    useEffect(() => {
        /*if (isListenersAdded) {
            /* console.log("remove")
            let elements = window.document.getElementsByTagName("path")
            for (let i = 0; i < elements.length; i++) {
                let element = elements[i]

                element.removeEventListener('click', clickListener)
            }

            return;
        }*/

        if (cities.length) {
            // add listeners if there is a human agent playing
            let elements = window.document.getElementsByTagName("path")
            for (let i = 0; i < elements.length; i++) {
                let element = elements[i]

                // styling the map svg according to the owner
                if (cities[i].owner === 1) {
                    element.style.fill = '#1c92d2' // blue
                } else {
                    element.style.fill = '#c60203' // red
                }

                if (player1Agent === 'human agent' || player2Agent === 'human agent') {
                    element.addEventListener('mouseover', hoverListener)
                    element.addEventListener('click', clickListener)
                }
            }

            setIsListenersAdded(true)
            setIsReadyToStart(true)
        }
        // Remove event listener on cleanup
        return () => {
            let elements = window.document.getElementsByTagName("path")
            for (let i = 0; i < elements.length; i++) {
                let element = elements[i]
                element.removeEventListener('click', clickListener)
                element.removeEventListener('mouseover', hoverListener)
            }
        };
    }, [cities, clickListener, firstClickCity, hoverListener, isListenersAdded, numTurns, player1Agent, player2Agent, secondClickCity])

    useEffect(() => {
        // construct the two players
        setPlayer1(getAgent(player1Agent, 'red'))
        setPlayer2(getAgent(player2Agent, 'blue'))

        let elements = window.document.getElementsByTagName("path")

        // array of nodes using Node.js
        const limit = isEgypt ? 20 : 40
        let cities = []
        let counts = [limit, limit]
        let total = [0, 0]

        for (let i = 0; i < elements.length; i++) {
            let element = elements[i]

            // specify which player to own current city
            let owner = 0
            if (total[0] === limit) {
                owner = 1
            } else if (total[1] === limit) {
                owner = 0
            } else {
                owner = Math.round(Math.random())
            }
            total[owner]++

            let node = new Node(owner, 1, element.getAttribute('name'))
            counts[owner]--

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
            // console.log(counts[0], counts[1], count)
            cities[i].armies += count
        }

        let sum = [0, 0]
        for (let i = 0; i < cities.length; i++) {
            sum[cities[i].owner] += cities[i].armies
        }

        // console.log("cities: ", cities, sum)
        setCities(cities)
    }, [isEgypt, player1Agent, player2Agent])

    useEffect(() => {
        console.log("first city changed ...", firstClickCity)
    }, [firstClickCity])

    useEffect(() => {
        console.log("second city changed ...", secondClickCity)
    }, [secondClickCity])

    const submitDialog = (value) => {
        if (value === "") {
            return
        }
        setDialogValue(value)
        setDialogDone(true)
        console.log("submitted dialog")
    }

    useEffect(() => {
        if (!isReadyToStart) {
            console.log("not ready")
            return
        }

        const getExtraArmies = () => {
            let counter = 0
            for (let city in cities)
                if (city.owner === numTurns % 2)
                    counter++
            return Math.max(3, parseInt(counter / 3))
        }

        if (extraArmies === "") setExtraArmies(getExtraArmies())

        if ((numTurns % 2 === 0 && player1Agent === 'human agent') || (numTurns % 2 !== 0 && player2Agent === 'human agent')) {
            console.log(`player ${numTurns % 2 + 1}: deploying ${extraArmies} armies in step ${turnStep} ...`)
            setMessage(`player ${numTurns % 2 + 1}: Choose cities to deploy your armies, (left ${extraArmies} armies)`)
            // let message = player1.deploy()

            // deploying process
            // wait till human player presses next
            if (turnStep === 0 && extraArmies !== 0) {
                if (firstClickCity && firstClickCity.owner === numTurns % 2) {
                    console.log(showDialog, dialogDone)
                    if (!showDialog) {
                        // console.log("opening dialog")
                        setDialogMessage(`Choose number of armies to deploy`)
                        setShowDialog(true)
                    } else if (dialogDone) {
                        // console.log("closing dialog")
                        let idx = cities.findIndex(city => city.name === firstClickCity.name)
                        cities[idx].armies += parseInt(dialogValue)
                        setExtraArmies(extraArmies - parseInt(dialogValue))
                        // setTurnStep(1)
                        setFirstClickCity(undefined)
                        setShowDialog(false)
                        setDialogDone(false)
                    }
                } else {
                    setFirstClickCity(undefined)
                }
            }

            if (extraArmies === 0) {
                setExtraArmies("")
                setTurnStep(1)
            }

            if (turnStep !== 0) {
                // attacking process
                // wait till human player presses next
                setMessage(`player ${numTurns % 2 + 1}: Choose a city from yours to begin the attack`)
                // let attackingArmies = 0
                if (turnStep === 1) {
                    if (firstClickCity && firstClickCity.owner === numTurns % 2) {
                        console.log("first city chosen")
                        if (!secondClickCity) {
                            console.log("second city not chosen")
                            if (!showDialog && !dialogDone) {
                                setDialogMessage(`Choose number of armies to attack with`)
                                setShowDialog(true)
                            } else if (dialogDone) {
                                console.log("number is entered")
                                setMessage(`player ${numTurns % 2 + 1} will attack with ${dialogValue} armies`)
                                setShowDialog(false)
                                // setDialogDone(false)
                            }
                        } else {
                            console.log(firstClickCity, firstClickCity === undefined, secondClickCity)
                            if (secondClickCity && secondClickCity.owner !== numTurns % 2) {
                                console.log("second city chosen")
                                let idxFirst = cities.findIndex(city => city.name === firstClickCity.name)
                                let idxSecond = cities.findIndex(city => city.name === secondClickCity.name)

                                let attackingArmies = parseInt(dialogValue)

                                cities[idxFirst].armies -= attackingArmies
                                let defendingArmies = secondClickCity.armies

                                cities[idxSecond].armies += attackingArmies

                                console.log(`attacking = ${attackingArmies}, defending = ${defendingArmies}`)
                                if (attackingArmies > defendingArmies) {
                                    cities[idxSecond].owner = numTurns % 2
                                } else {
                                    cities[idxFirst].owner = (numTurns % 2 === 1 ? 0 : 1)
                                }

                                setFirstClickCity(undefined)
                                setSecondClickCity(undefined)
                                setDialogDone(false)
                                setNumTurns(numTurns + 1)
                                setTurnStep(0)
                            }
                        }
                    } else {
                        setFirstClickCity(undefined)
                    }
                }
            }
        }
    }, [cities, dialogDone, dialogValue, extraArmies, firstClickCity, isReadyToStart, numTurns, player1, player1Agent, player2, player2Agent, secondClickCity, showDialog, turnStep])

    return (
        <div className="game-wrapper">
            <Board isEgypt={isEgypt} turn={numTurns} cities={cities} currentCity={currentCity} message={message} />
            <Controller cities={cities} isStart={isReadyToStart} player1={player1} player1Agent={player1Agent} player2Agent={player2Agent} player2={player2} turn={numTurns} setTurn={setNumTurns} setMessage={setMessage} />
            <Dialog isOpen={showDialog} onClose={submitDialog} extraArmies={!turnStep ? extraArmies : firstClickCity && firstClickCity.armies - 1} message={dialogMessage} />
        </div>
    )
}

export default Game
