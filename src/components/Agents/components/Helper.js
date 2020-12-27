import cloneDeep from 'lodash/cloneDeep';
/*export const sendDeployments = (owner, armies) => {
    let type = "renderDeployments"
    let message = owner + " has " + str(armies) + " to deploy"
    return controller.renderMap(type, message)
}

export const sendTroops = (owner) => {
    let type = "renderAttack"
    let message = owner + " is attacking..."
    return controller.renderMap(type, message)
}*/

export const updateMap = (oldMap, newMap) => {
    for (let i = 0; i < oldMap.length; i++) {
        let city = oldMap[i]
        city.armies = newMap[i].armies
        city.owner = newMap[i].owner
    }
}


export const calculateHeuristic = (map, color) => {
    let counter = 0
    for (let i = 0; i < map.length; i++) {
        let city = map[i]
        if (city.owner !== color) {
            counter += city.armies
        }
    }

    return counter
}

export const calculateBonus = (map, color) => {
    let counter = 0
    for (let i = 0; i < map.length; i++) {
        let city = map[i]
        if (city.owner === color) {
            counter += 1
        }
    }
    return Math.max(3, parseInt(counter / 3))
}

export const isGoalState = (map, color) => {
    let flag = true
    for (let i = 0; i < map.length; i++) {
        let city = map[i]
        if (city.owner !== color) {
            flag = false
        }
    }
    return flag
}

// Generate all children states of given state
export const giveBirth = (map, color, armies, neighbours) => {
    // states generated after deployment only
    let deploymentOffspring = []

    for (let j = 0; j < map.length; j++) {
        let city = map[j]

        if (city.owner === color) { // We can deploy
            // let offspring = [...map] // Copy the data to keep the original map un-touched
            let offspring = cloneDeep(map)
            // console.log(`offspring before ${offspring[j].armies}`)
            offspring[j].armies += armies
            // console.log(`offspring after ${offspring[j].armies}`)
            deploymentOffspring.push(offspring)
        }
    }

    // console.log("deployment offsprings: ", deploymentOffspring)

    let attackingOffspring = [] // states generated after attack
    for (let idx = 0; idx < deploymentOffspring.length; idx++) {
        let state = deploymentOffspring[idx]
        // console.log("state: ", state)
        for (let i = 0; i < state.length; i++) {
            let city = state[i]
            // We can attack by this city

            if (city.owner === color) {
                for (let k = 0; k < city.neighbours.length; k++) {
                    let neighbour = city.neighbours[k]

                    if (neighbour.owner !== color) { // We can attack
                        if (neighbour.armies < city.armies - 1) { // Valid attack
                            // let offspring = [...state] // Copy map by value
                            let offspring = cloneDeep(state)
                            // console.log("offspring: ", offspring)
                            // console.log(`offspring attacking before ${offspring[i].armies}`)
                            offspring[i].neighbours[k].armies = offspring[i].armies - 1
                            offspring[i].armies = 1
                            offspring[i].neighbours[k].owner = color
                            // console.log(`offspring attacking after ${offspring[i].armies}`)
                            attackingOffspring.push({
                                "parent": state, // The state of deployment
                                "state": offspring
                            })
                        }
                    }
                }
            }
        }
    }

    return [attackingOffspring, deploymentOffspring.length + attackingOffspring.length]
}
