import React from 'react';

/**
 * The node representation of each city
 * @param {owner} param0 the owner of the city, num of armies, posX and posY
 * @param {armies} param1 num of armies
 * @param {posX} param2 x position relative to the map
 * @param {posY} param2 y position relative to the map
 */
const Node = ({ owner, armies, posX, posY }) => {
    return (
        <div className="node-wrapper" style={{ backgroundColor: owner % 2 === 0 ? "#c60203" : "#1c92d2", top: posY, left: posX }}>
            <span>{armies}</span>
        </div>
    );
}
 
export default Node;