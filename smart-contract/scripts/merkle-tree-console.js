const merkleUtil = require('./merkle-tree-util');


if (process.argv.length < 4) {
    console.error("CRT-Registered-List merkle tree calculator v1.0.0");
    console.error("    node scripts/merkle-tree.js root <addresses-file>");
    console.error("    node scripts/merkle-tree.js proof <addresses-file> <address-to-prove>");
    process.exit(1);
}

let mode = process.argv[2];
let addressesFile = process.argv[3];
let addresses = merkleUtil.readAddressesFromFile(addressesFile);

if (mode === 'root') {
    merkleUtil.calculateMerkleValues(mode, addresses); 
} else if (mode === 'proof') {
    if (process.argv.length < 5) throw ("must pass in address to prove");
    merkleUtil.calculateMerkleValues(mode, addresses, process.argv[4]); 
}


