/**
 * The node representation of each city
 * @param {owner} param0 the owner of the city, num of armies, posX and posY
 * @param {armies} param1 num of armies
 */
class Node {
    constructor(owner, armies, name) {
        this.owner = owner
        this.armies = armies
        this.name = name
    }
    neighbours = []
}
 
export default Node;