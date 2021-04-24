const fs = require('fs');
const ethers = require('ethers');


function calculateMerkleValues(mode, addressList, address) {
    if (mode === 'root') {
        const root = merkleRoot(addressList);
        console.log('root: ' + root);
        return root;
    } else if (mode === 'proof') {
        let proof = merkleProof(addressList, address);

        console.log('path: ' + proof.path);
        console.log('witnesses: ' + JSON.stringify(proof.witnesses));
        return proof;
    } else {
        throw ("unrecognized mode: " + mode);
    }
}

function readAddressesFromFile(addressesFile) {
    return fs.readFileSync(addressesFile, 'utf-8')
    .split('\n')
    .map(a => a.replace(/#.*/, '').trim())
    .filter(a => a.length > 0);
}


// interface functions

function merkleRoot(items) {
    if (items.length === 0) throw ("can't build merkle tree with empty items");

    let level = items.map(leafHash);

    while (level.length > 1) {
        level = hashLevel(level);
    }

    return level[0];
}

function merkleProof(items, item) {
    let index = items.findIndex((i) => i === item);
    if (index === -1) throw ("item not found in items: " + item);

    let path = [];
    let witnesses = [];

    let level = items.map(leafHash);

    while (level.length > 1) {
        // Get proof for this level

        let nextIndex = Math.floor(index / 2);

        if (nextIndex * 2 === index) { // left side
            if (index < level.length - 1) { // only if we're not the last in a level with odd number of nodes
                path.push(0);
                witnesses.push(level[index + 1]);
            }
        } else { // right side
            path.push(1);
            witnesses.push(level[index - 1]);
        }

        index = nextIndex;
        level = hashLevel(level);
    }

    return {
        path: path.reduceRight((a, b) => (a << 1) | b, 0),
        witnesses,
    };
}

// internal utility functions

function hashLevel(level) {
    let nextLevel = [];

    for (let i = 0; i < level.length; i += 2) {
        if (i === level.length - 1) nextLevel.push(level[i]); // odd number of nodes at this level
        else nextLevel.push(nodeHash(level[i], level[i + 1]));
    }

    return nextLevel;
}

function leafHash(leaf) {
    return ethers.utils.keccak256(ethers.utils.concat(['0x00', leaf]));
}

function nodeHash(left, right) {
    return ethers.utils.keccak256(ethers.utils.concat(['0x01', left, right]));
}


module.exports = {
    calculateMerkleValues,
    readAddressesFromFile
}

