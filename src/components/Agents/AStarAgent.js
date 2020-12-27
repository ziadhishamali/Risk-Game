import PriorityQueue from 'js-priority-queue'

import { calculateBonus, calculateHeuristic, giveBirth, isGoalState } from './components/Helper'

class AStarAgent {
    constructor(color, setCities, setMessage) {
        this.color = color
        this.setCities = setCities
        this.setMessage = setMessage
    }

    comparator = (a, b) => {
        return a.heuristic - b.heuristic
    }

    deploy = (map, armies, neighbours) => {
        // TODO: fill in the deploy logic
        for (let i = 0; i < map.length; i++) {
            let city = map[i]

            city.neighbours = neighbours[city.name].map(citi => {
                return map.filter(ct => {
                    return ct.name === citi
                })[0]
            });
            city.inside = city.neighbours.find((x) => {
                return x.owner !== city.owner
            }) === undefined
        }

        let PQueue = new PriorityQueue(this.comparator)
        let visited = {}
        let cost = 0

        // Generate next level of states
        let children = giveBirth(map, this.color, armies, neighbours)

        children.map((child, i) => {
            console.log("child: ", child)
            let heuristic = calculateHeuristic(child["state"], this.color)
            PQueue.queue({ heuristic, state: child["state"], child })
        })

        while(PQueue.length) {
            let queueItem = PQueue.dequeue()
            let state = queueItem['state']

            // Force termination if stuck in infinite loop
            if (cost >= 99) {
                this.newMap = queueItem['child']
                // this.setMessage(`player ${this.color + 1} is deploying ...`)
                return [`player ${this.color + 1} is deploying ...`, this.newMap["parent"]]
            }

            console.log(state)
            // let stateKey = JSON.stringify(state)
            
            // Visited before
            console.log(Object.keys(visited))
            if (state in Object.keys(visited)) {
                console.log("already visited")
                continue
            }


            visited[state] = 1

            if (isGoalState(state, this.color)) {
                this.newMap = queueItem['child']
                console.log("old cities: ", map)
                console.log("new cities: ", this.newMap["parent"])
                // this.setMessage(`player ${this.color + 1} is deploying ...`)
                return [`player ${this.color + 1} is deploying ...`, this.newMap["parent"]]
            }

            let newArmies = calculateBonus(state, this.color)
            let children = giveBirth(state, this.color, newArmies, neighbours)
            cost += 1
            children.map((child, i) => {
                let heuristic = calculateHeuristic(child["state"], this.color)
                PQueue.queue({heuristic: heuristic + cost, state: child["state"], child: queueItem["child"]})
            })
        }

        return "deploying now"
    }

    attack = (map) => {
        // TODO: fill in the attack logic
        return [`player ${this.color + 1} is attacking ...`, this.newMap["state"]]
    }
}

export default AStarAgent
