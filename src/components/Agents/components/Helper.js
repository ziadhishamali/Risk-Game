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

export const calculateHeuristic = (map, color) => {
    let counter = 0
    for (let city in map)
        if (city.owner !== color)
            counter += city.armies
    return counter
}

export const calculateBonus = (map, color) => {
    let counter = 0
    for (let city in map)
        if (city.owner === color)
            counter+=1
    return Math.max(3, parseInt(counter/3))
}

export const isGoalState = (map, color) => {
    for (let city in map)
        if (city.owner !== color)
            return false
    return true
}

// Generate all children states of given state
export const giveBirth = (map, color, armies) => {
    // states generated after deployment only
    let deploymentOffspring = []

    map.forEach((city, i) => {
        console.log(`${city.owner}, color: ${color}`)
        if (city.owner === color) { // We can deploy
            let offspring = [...map] // Copy the data to keep the original map un-touched
            offspring[i].armies += armies
            deploymentOffspring.push(offspring)
        }
    })

    console.log("deployment offsprings: ", deploymentOffspring)

    let attackingOffspring = [] // states generated after attack
    deploymentOffspring.map((state, idx) => {
        console.log("state: ", state)
        state.forEach((city, i) => {
            // We can attack by this city
            if (city.owner === color) {
                city.neighbours.map((neighbour, k) => {
                    if (neighbour.owner !== color) { // We can attack
                        if (neighbour.armies < city.armies -1) { // Valid attack
                            let offspring = [...state] // Copy map by value
                            offspring[i].neighbours[k].armies = offspring[i].armies - 1
                            offspring[i].armies = 1
                            offspring[i].neighbours[k].owner = color
                            attackingOffspring.push({
                                "parent" : state, // The state of deployment
                                "state" : offspring
                            })
                        }
                    }
                })  
            }
        })
    })
        
    return attackingOffspring
}
