import { useEffect } from 'react'

const Controller = ({ isStart, player1Agent, player2Agent, player1, player2, turn, setTurn, cities, setMessage, neighbours }) => {
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        // console.log({ isStart, player1Agent, player2Agent, player1, player2, turn, setTurn, cities })

        if (!isStart) {
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
            console.log(`player 1: deploying ${extraArmies} armies ...`)
            let message = player1.deploy(cities, extraArmies)
            // setMessage(message)
            sleep(2000).then(() => {
                console.log(`player 1: attacking ...`)
                message = player1.attack(cities, neighbours, 0)
                // setMessage(message)
                sleep(2000).then(() => {
                    setTurn(turn + 1)
                })
            })
        } else if (turn % 2 === 1 && player2Agent !== 'human agent') {
            console.log(`player 2: deploying ${extraArmies} armies ...`)
            let message = player2.deploy(cities, extraArmies)
            // setMessage(message)
            sleep(2000).then(() => {
                console.log(`player 2: attacking ...`)
                message = player2.attack(cities, neighbours , 1)
                // setMessage(message)
                sleep(2000).then(() => {
                    setTurn(turn + 1)
                })
            })
        }
    }, [cities, isStart, player1, player1Agent, player2, player2Agent, setMessage, setTurn, turn])

    return (
        ""
    )
}

export default Controller
