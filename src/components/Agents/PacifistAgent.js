class PacifistAgent {
    constructor(color, setCities, setMessage) {
        this.color = color
        this.setCities = setCities
        this.setMessage = setMessage
    }

    deploy = (map, armies) => {
        // TODO: fill in the deploy logic
        let min = Number.MAX_SAFE_INTEGER;
        let target = map.filter(city => {
            if (city.owner === this.color && city.armies < min) {
                min = city.armies;
                return true
            }
            return false
        })[0]
        console.log("chosen city to deploy to", target);
        target.armies += armies
        return [`deploying now to ${target.name}`, map]
    }

    attack = (map, neighbours, owner) => {
        // TODO: fill in the attack logic
        for (let i = 0; i < map.length; i++) {
            let city = map[i];
            city.neighbours = neighbours[city.name].map(citi => {
                return map.filter(ct => {
                    return ct.name === citi
                })[0]
            });
            city.inside = city.neighbours.find((x) => {
                return x.owner !== city.owner
            }) === undefined
        }

        let candidates = map.filter(city => {
            return city.owner === owner && !city.inside
        })

        let [min, j, jj] = [Number.MAX_SAFE_INTEGER, -1, -1];
        for (let i = 0; i < candidates.length; i++) {
            let city = candidates[i];
            for (let ii = 0; ii < city.neighbours.length; ii++) {
                let prey = city.neighbours[ii];
                if (city.armies - 1 > prey.armies && prey.armies < min && prey.owner !== owner) {
                    min = prey.armies;
                    j = i;
                    jj = ii;
                }
            }
        }

        if (j > -1) {

            let attackingArmies = candidates[j].armies - 1;
            let defendingArmies = candidates[j].neighbours[jj].armies

            let idxFirst = map.findIndex(city => city.name === candidates[j].name)
            let idxSecond = map.findIndex(city => city.name === candidates[j].neighbours[jj].name)
            map[idxFirst].armies -= attackingArmies
            map[idxSecond].armies += attackingArmies

            console.log(`attacking = ${attackingArmies}, defending = ${defendingArmies}`)
            if (attackingArmies > defendingArmies) {
                map[idxSecond].owner = owner
            } else {
                map[idxFirst].owner = (owner === 1 ? 0 : 1)
            }


            return [`attacking ${map[idxSecond].name} with ${attackingArmies} armies`, map]

        }

        return [`can't attack`, map]
    }
}

export default PacifistAgent
