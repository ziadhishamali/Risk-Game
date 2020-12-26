class HumanAgent {
    constructor(color, setCities, setMessage) {
        this.color = color
        this.setCities = setCities
        this.setMessage = setMessage
    }

    deploy = (map, armies) => {
        // TODO: fill in the deploy logic
        return "deploying now"
    }

    attack = (map) => {
        // TODO: fill in the attack logic
        return "attacking now"
    }
}

export default HumanAgent
