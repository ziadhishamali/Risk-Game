import { calculateHeuristic, giveBirth } from './components/Helper'

class GreedyAgent {
    constructor(color, setCities, setMessage) {
        this.color = color
        this.setCities = setCities
        this.setMessage = setMessage
    }

    deploy = (map, armies, neighbours) => {
        // TODO: fill in the deploy logic
        // Generate next level of states
        let children = giveBirth(map, this.color, armies, neighbours)

        let minHeuristic = Number.MAX_SAFE_INTEGER
        children.map(child => {
            // Find state with best heuristic
            let childHeuristic = calculateHeuristic(child["state"], this.color)
            if (childHeuristic < minHeuristic) {
                minHeuristic = childHeuristic
                this.newMap = child
                console.log("new map: ", this.newMap)
            }
        })

        // updateMap(map, this.newMap)

        // this.setMessage(`player ${this.color + 1} is deploying ...`)
        return [`player ${this.color + 1} is deploying ...`, this.newMap["parent"]]
    }

    attack = (map) => {
        console.log(this.newMap)
        // this.setMessage(`player ${this.color + 1} is attacking ...`)
        return [`player ${this.color + 1} is attacking ...`, this.newMap["state"]]
    }
}

export default GreedyAgent
