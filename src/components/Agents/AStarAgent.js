import PriorityQueue from 'js-priority-queue'

import { calculateBonus, calculateHeuristic, giveBirth, isGoalState, updateMap } from './components/Helper'

class AStarAgent {
    constructor(color, setCities, setMessage) {
        this.color = color
        this.setCities = setCities
        this.setMessage = setMessage
    }

    comparator = (a, b) => {
        return a.heuristic - b.heuristic
    }

    deploy = (map, armies) => {
        // TODO: fill in the deploy logic
        let PQueue = new PriorityQueue(this.comparator)
        let visited = {}
        let cost = 0

        // Generate next level of states
        let children = giveBirth(map, this.color, armies)

        for (let child in children) {
            let heuristic = calculateHeuristic(child["state"], this.color)
            PQueue.queue({ heuristic, state: child["state"], child })
        }

        while(PQueue.length) {
            let queueItem = PQueue.dequeue()
            let state = queueItem['state']

            // Force termination if stuck in infinite loop
            if (cost >= 1000) {
                this.newMap = queueItem['child']
                this.setCities(this.newMap["parent"])
                this.setMessage(`player ${this.color + 1} is deploying ...`)
                return `player ${this.color + 1} is deploying ...`
            }

            let stateKey = JSON.stringify(state)
            
            // Visited before
            if (stateKey in Object.keys(visited)) {
                console.log("already visited")
                continue
            }
                

            visited[stateKey] = 1

            if (isGoalState(state, this.color)) {
                this.newMap = queueItem['child']
                console.log("old cities: ", map)
                console.log("new cities: ", this.newMap["parent"])
                this.setCities(this.newMap["parent"])
                this.setMessage(`player ${this.color + 1} is deploying ...`)
                return `player ${this.color + 1} is deploying ...`
            }

            let newArmies = calculateBonus(state, this.color)
            let children = giveBirth(state, this.color, newArmies)
            cost += 1
            for (let child in children) {
                let heuristic = calculateHeuristic(child["state"], this.color)
                PQueue.put({heuristic: heuristic + cost, state: child["state"], child: queueItem["child"]})
            }
        }

        return "deploying now"
    }

    attack = (map) => {
        // TODO: fill in the attack logic
        this.setCities(this.newMap["state"])
        this.setMessage(`player ${this.color + 1} is attacking ...`)
        return "attacking now"
    }
}

export default AStarAgent
