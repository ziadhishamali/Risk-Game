import { useEffect, useState } from 'react'

const Controller = ({ isStart, player1Agent, player2Agent, player1, player2, turn, setTurn, cities, setCities, setMessage, neighbours }) => {
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const [isPlayer1Playing, setIsPlayer1Playing] = useState(false)
    const [isPlayer2Playing, setIsPlayer2Playing] = useState(false)

    useEffect(() => {
        console.log({ turn })

        if (!isStart) {
            return
        }

        if (isPlayer1Playing || isPlayer2Playing) {
            return
        }

        const getExtraArmies = () => {
            let counter = 0
            for (let city in cities)
                if (city.owner === turn % 2)
                    counter++
            return Math.max(3, parseInt(counter / 3))
        }

        let extraArmies = getExtraArmies()
        if (turn % 2 === 0 && player1Agent !== 'human agent') {
            setIsPlayer1Playing(true)
            // console.log(`player 1: deploying ${extraArmies} armies ...`)
            let [message, citiesNew] = player1.deploy(cities, extraArmies, neighbours)
            setCities(citiesNew)
            setMessage(message)
            sleep(2000).then(() => {
                // console.log(`player 1: attacking ...`)
                [message, citiesNew] = player1.attack(cities, neighbours, 0)
                setMessage(message)
                sleep(2000).then(() => {
                    setTurn(turn + 1)
                    setCities(citiesNew)
                    setIsPlayer1Playing(false)
                })
            })
        } else if (turn % 2 === 1 && player2Agent !== 'human agent') {
            setIsPlayer2Playing(true)
            // console.log(`player 2: deploying ${extraArmies} armies ...`)
            let [message, citiesNew] = player2.deploy(cities, extraArmies, neighbours)
            setCities(citiesNew)
            setMessage(message)
            sleep(2000).then(() => {
                // console.log(`player 2: attacking ...`)
                [message, citiesNew] = player2.attack(cities, neighbours , 1)
                setMessage(message)
                sleep(2000).then(() => {
                    setTurn(turn + 1)
                    setCities(citiesNew)
                    setIsPlayer2Playing(false)
                })
            })
        }
    }, [cities, isPlayer1Playing, isPlayer2Playing, isStart, neighbours, player1, player1Agent, player2, player2Agent, setCities, setMessage, setTurn, turn])

    return (
        ""
    )
}

export default Controller
