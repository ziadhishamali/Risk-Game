import React from 'react';

/**
 * The node representation of each city
 * @param {owner, armies, posX, posY} param0 the owner of the city, num of armies, posX and posY
 */
const Node = ({ owner, armies, posX, posY }) => {
    return (
        <div className="node-wrapper" style={{ backgroundColor: owner % 2 === 0 ? "#c60203" : "#1c92d2", top: posY, left: posX }}>
            <span>{armies}</span>
        </div>
    );
}
 
export default Node;