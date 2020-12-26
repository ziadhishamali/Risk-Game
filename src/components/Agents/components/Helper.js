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
    oldMap.map((city, i) => {
        city.armies = newMap[i].armies
        city.owner = newMap[i].owner
    })
        
}
    

export const calculateHeuristic = (map, color) => {
    let counter = 0
    map.map((city, i) => {
        if (city.owner !== color) {
            counter += city.armies   
        }
    })

    return counter
}

export const calculateBonus = (map, color) => {
    let counter = 0
    map.map((city, i) => {
        if (city.owner === color) {
            counter+=1
        }
    })
    return Math.max(3, parseInt(counter/3))
}

export const isGoalState = (map, color) => {
    let flag = true
    map.map((city, i) => {
        if (city.owner !== color) {
            flag = false
        }
    })
    return flag
}

// Generate all children states of given state
export const giveBirth = (map, color, armies, neighbours) => {
    // states generated after deployment only
    let deploymentOffspring = []

    map.map((city, i) => {
        // console.log(`${city.owner}, color: ${color}`)
        if (city.owner === color) { // We can deploy
            // let offspring = [...map] // Copy the data to keep the original map un-touched
            let offspring = cloneDeep(map)
            console.log("offspring: ", offspring)
            offspring[i].armies += armies
            deploymentOffspring.push(offspring)
        }
    })

    // console.log("deployment offsprings: ", deploymentOffspring)

    let attackingOffspring = [] // states generated after attack
    deploymentOffspring.map((state, idx) => {
        // console.log("state: ", state)
        state.map((city, i) => {
            // We can attack by this city
            city.neighbours = neighbours[city.name].map(citi => {
                return map.filter(ct => {
                    return ct.name === citi
                })[0]
            });
            city.inside = city.neighbours.find((x) => {
                return x.owner !== city.owner
            }) === undefined

            if (city.owner === color) {
                city.neighbours.map((neighbour, k) => {
                    if (neighbour.owner !== color) { // We can attack
                        if (neighbour.armies < city.armies -1) { // Valid attack
                            // let offspring = [...state] // Copy map by value
                            let offspring = cloneDeep(state)
                            console.log("offspring: ", offspring)
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
