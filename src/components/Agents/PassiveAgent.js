class PassiveAgent {
    constructor(color, setCities, setMessage) {
        this.color = color
        this.setCities = setCities
        this.setMessage = setMessage
    }

    deploy = (map, armies) => {
        // TODO: fill in the deploy logic
        let min = Number.MAX_SAFE_INTEGER;
        let target = map.filter(city => {
            if (city.owner === 1 && city.armies < min) {
                min = city.armies;
                return true
            }
            return false
        })[0]
        console.log("chosen city to deploy to", target);
        target.armies += armies
        return `deploying now to ${target.name}`
    }

    attack = (map) => {
        // TODO: fill in the attack logic
        return "attacking now"
    }
}

export default PassiveAgent
