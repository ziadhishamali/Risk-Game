import { useEffect, useState } from 'react'

const Controller = ({ isStart, isGameFinished, player1Agent, player2Agent, player1, player2, turn, setTurn, cities, setCities, setMessage, neighbours, setIsGameOverDialogOpened, setIsGameFinished }) => {
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const [isPlayer1Playing, setIsPlayer1Playing] = useState(false)
    const [isPlayer2Playing, setIsPlayer2Playing] = useState(false)
    const [t, setT] = useState(0)
    const [tt, setTT] = useState(0)

    useEffect(() => {
        console.log("########### Player 1 ##########");
        [1, 100, 10000].forEach(f => {
            console.log(`P(f=${f}) = ${f*turn + t}`);
        })
    }, [t])
    
    useEffect(() => {
        console.log("########## Player 2 ##########");
        [1, 100, 10000].forEach(f => {
            console.log(`P(f=${f}) = ${f*turn + tt}`);
        })
    },[tt])

    useEffect(() => {
        // console.log({ turn, isStart })
        if (isGameFinished) {
            return
        }

        if (!isStart) {
            return
        }

        if (isPlayer1Playing || isPlayer2Playing) {
            return
        }

        if (!cities || !cities.length) {
            return
        }

        const getExtraArmies = () => {
            let counter = 0
            for (let city in cities) {
                if (city.owner === turn % 2) {
                    counter++
                }
            }
            return Math.max(3, parseInt(counter / 3))
        }

        // check if game over
        let flag = true
        // console.log("cities: ", cities)
        for (let i = 1; i < cities.length; i++) {
            let city = cities[i]
            let previousCity = cities[i - 1]

            // console.log(cities, previousCity)

            if (city.owner !== previousCity.owner) {
                flag = false
                break;
            }
        }

        if (flag) {
            setIsGameFinished(true)
            setIsGameOverDialogOpened(true)
            return
        }

        let extraArmies = getExtraArmies()
        if (turn % 2 === 0 && player1Agent !== 'human agent') {
            setIsPlayer1Playing(true)
            // console.log(`player 1: deploying ${extraArmies} armies ...`)
            let [message, citiesNew] = player1.deploy(cities, extraArmies, neighbours, t, setT)
            setCities(citiesNew)
            setMessage(message)
            sleep(2000).then(() => {
                // console.log(`player 1: attacking ...`)
                let [message2, citiesNew2] = player1.attack(cities, neighbours, 0)
                setMessage(message2)

                sleep(2000).then(() => {
                    setTurn(turn + 1)
                    setCities(citiesNew2)
                    setIsPlayer1Playing(false)
                })
            })
        } else if (turn % 2 === 1 && player2Agent !== 'human agent') {
            setIsPlayer2Playing(true)
            // console.log(`player 2: deploying ${extraArmies} armies ...`)
            let [message, citiesNew] = player2.deploy(cities, extraArmies, neighbours, tt, setTT)
            setCities(citiesNew)
            setMessage(message)
            sleep(2000).then(() => {
                // console.log(`player 2: attacking ...`)
                let [message2, citiesNew2] = player2.attack(cities, neighbours, 1)
                setMessage(message2)

                sleep(2000).then(() => {
                    setTurn(turn + 1)
                    setCities(citiesNew2)
                    setIsPlayer2Playing(false)
                })
            })
        }
    }, [cities, isGameFinished, isPlayer1Playing, isPlayer2Playing, isStart, neighbours, player1, player1Agent, player2, player2Agent, setCities, setIsGameFinished, setIsGameOverDialogOpened, setMessage, setTurn, t, tt, turn])

    return (
        ""
    )
}

export default Controller
