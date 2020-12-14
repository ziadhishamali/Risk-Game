/**
 * The node representation of each city
 * @param {owner} param0 the owner of the city, num of armies, posX and posY
 * @param {armies} param1 num of armies
 */
class Node {
    constructor(owner, armies) {
        this.owner = owner
        this.armies = armies
    }
    neighbours = []
}
 
export default Node;