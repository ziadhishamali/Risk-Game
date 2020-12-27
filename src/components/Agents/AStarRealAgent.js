import { calculateHeuristic, giveBirth } from './components/Helper'

class AStarRealAgent {
    constructor(color, setCities, setMessage) {
        this.color = color
        this.setCities = setCities
        this.setMessage = setMessage
        this.cost = 0
    }

    deploy = (map, armies, neighbours) => {
        // TODO: fill in the deploy logic
        // Generate next level of states
        let children = giveBirth(map, this.color, armies, neighbours)
        let minHeuristic = 999999
        this.cost += 1 // Cost represents number of turns
        children.map(child => {
            let childHeuristic = calculateHeuristic(child["state"], this.color)
            console.log("heuristic: ", childHeuristic)
            if (childHeuristic + this.cost < minHeuristic) {
                console.log("here heuristic")
                minHeuristic = childHeuristic + this.cost
                this.newMap = child
            }
        })

        return [`player ${this.color + 1} is deploying ...`, this.newMap["parent"]]
    }

    attack = (map) => {
        // TODO: fill in the attack logic
        return [`player ${this.color + 1} is attacking ...`, this.newMap["state"]]
    }
}

export default AStarRealAgent
