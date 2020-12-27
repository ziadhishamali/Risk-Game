class PassiveAgent {
    constructor(color, setCities, setMessage) {
        this.color = color
        this.setCities = setCities
        this.setMessage = setMessage
    }

    deploy = (map, armies) => {
        // TODO: fill in the deploy logic
        let [min, idx] = [Number.MAX_SAFE_INTEGER, -1];
        for (let i = 0; i < map.length; i++) {
            const city = map[i];
            if (city.owner === this.color && city.armies < min) {
                min = city.armies;
                idx = i;
            }
        }
        // let min = Number.MAX_SAFE_INTEGER;
        // let target = map.filter(city => {
        //     if (city.owner === this.color && city.armies < min) {
        //         min = city.armies;
        //         return true
        //     }
        //     return false
        // })[0]
        console.log("chosen city to deploy to", map[idx]);
        map[idx].armies += armies
        return [`deploying now to ${map[idx].name}`, map]
    }

    attack = (map) => {
        // TODO: fill in the attack logic
        return ["I'm staying at my side", map]
    }
}

export default PassiveAgent
