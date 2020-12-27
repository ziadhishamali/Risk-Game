import { calculateHeuristic, giveBirth, calculateBonus, isGoalState } from './components/Helper'

class MinimaxAgent {
    constructor(color, setCities, setMessage) {
        this.color = color
        this.setCities = setCities
        this.setMessage = setMessage
        this.currT = 0
    }

    deploy = (map, armies, neighbours, t, setT) => {
        this.currT = 0
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

        // Generate next level of states
        let [children, T] = giveBirth(map, this.color, armies)
        this.currT += T

        this.isNewMapChanged = false
        for (let i = 0; i < children.length; i++) {
            let child = children[i]
            // console.log("before: ", this.currT)
            let output = this.minmax(child["state"], armies, 1, -999999, 999999, true, child)
            // console.log("after: ", this.currT)
            this.newMap = output[1]
            this.isNewMapChanged = true
        }

        setT(this.currT + t)

        if (!this.isNewMapChanged) {
            return [`player ${this.color + 1} is deploying ${armies} armies ...`, map]
        }

        return [`player ${this.color + 1} is deploying ${armies} armies ...`, this.newMap["parent"]]
    }

    minmax = (state, armies, depth, alpha, beta, isMaximumTurn, toReturn) => {
        // Check for termination
        if (depth === 0 || isGoalState(state, this.color)) {
            let heuristic = calculateHeuristic(state, this.color)
            return [heuristic, toReturn]
        }

        //This player turn
        if (isMaximumTurn) {
            let maximumHeuristic = [-999999, null]
            let [nextStates, T] = giveBirth(state, this.color, armies)
            this.currT += T
            for (let i = 0; i < nextStates.length; i++) {
                let nextState = nextStates[i]
                let newArmies = calculateBonus(nextState["state"], this.color)
                let nextStateResult = this.minmax(nextState["state"], newArmies, depth - 1, alpha, beta, false, toReturn)

                // Compare for maximum heuristic
                if (nextStateResult[0] > maximumHeuristic[0]) {
                    maximumHeuristic = nextStateResult
                }

                // Update alpha
                if (nextStateResult[0] > alpha)
                    alpha = nextStateResult[0]

                // Check for pruning chance
                if (alpha >= beta) {
                    // No hope of a better results
                    break
                }
            }

            return [maximumHeuristic[0], toReturn]
        } else { // Opponent turn
            let minimumHeuristic = [999999, null]
            let [nextStates, T] = giveBirth(state, this.color, armies)
            this.currT += T

            for (let i = 0; i < nextStates.length; i++) {
                let nextState = nextStates[i]
                let newArmies = calculateBonus(nextState["state"], this.color)
                let nextStateResult = this.minmax(nextState["state"], newArmies, depth - 1, alpha, beta, true, toReturn)

                // Compare for minimum heuristic
                if (nextStateResult[0] < minimumHeuristic[0]) {
                    minimumHeuristic = nextStateResult
                }

                // Update beta
                if (nextStateResult[0] < beta) {
                    beta = nextStateResult[0]
                }

                // Check for pruning chance
                if (alpha >= beta) {
                    // No hope of a better results
                    break
                }
            }

            return (minimumHeuristic[0], toReturn)
        }
    }

    attack = (map) => {
        // TODO: fill in the attack logic
        if (!this.isNewMapChanged) {
            return [`player ${this.color + 1} can't attack any city`, map]
        }

        return [`player ${this.color + 1} is attacking ...`, this.newMap["state"]]
    }
}

export default MinimaxAgent
