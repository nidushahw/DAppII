# Merkle Air Drop for community reward token.

Merkle Air Drop for community Reward Token

### Introduction

When a user from pre defined member list wants to sign up for the developer community, they can use the free registration method. The owner has the option to perform an air drop to distribute the token between wallets at random, in order to improve his visibility. A possible solution is using a Merkle Tree.

There will be a pre defined allow-list of address that will be able to register free and join the developer community.
A Merkle Root will be build based on the pre defined allow-list.
Only the Merkle Root will be stored in the contract so as to verify if the contributor is in the allow-list.


### Community Reward Token Contract

A CRT token has been implemented based on **ERC20** from Open Zeppelin. This token is instantiated with `eligibleMembersMerkleRoot_`, `name_`, `symbol_`, `tockenPrice_` and `signupBonus_`, and the caller becomes the owner. Users who registered with the community is able to purchase tokens if they like and  `mint` function is implemented.

In order to register for free the person's address eligibility must be verified by using Mekle tree witnesses.
The `eligibleMembersMerkleRoot_` must be precomputed so as to deploy the contract and prevent non member addresses registering free.

The contract owner may update the allow-listed addresses, compute a new `eligibleMembersMerkleRoot_`, update it in the contract and the history of users that already redeemed their tokens will not be changed.


## Security

* Only the owner of this contract do the air drop.
* Only owner is capable of update the allow-listed addresses.
* Free registration is available only for the members whoes addresses are in the allow-list.
* Contract verify the eligibility for the free registration users using Merkle proof.

### Tests

To run the tests, execute the following command:

```sh
# Run tests
truffle test
```

To check tests coverage, execute the following command:

```sh
truffle run coverage
```

Or following command:

```sh
npm test
```

### Code Coverage

![Test Coverage](./images/test-coverage.png)


### Calculate Merkle Tree Root
Use the `scripts/merkle-tree-console.js` script to calculate the Merkle Tree Root value as follows;

```sh
node scripts/merkle-tree.js root <addresses-file>
```

This will print the root value to the console. A sample addresses file is available at `scripts\addressess.txt`.

Example:

```sh
node scripts/merkle-tree.js root scripts\addressess.txt
```

### Calculate Merkle Tree Proof
Use the `scripts/merkle-tree-console.js` script to calculate the Merkle Tree Proof values for a given address as follows;

```sh
node scripts/merkle-tree.js proof <addresses-file> <address-to-prove>
```

This will print path and witnesses values to the console. A sample addresses file is available at `scripts\addressess.txt`.

Example:

```sh
node scripts/merkle-tree-console.js proof scripts/addresses.txt 0xa2bf9f535bd73a6a1e19ab1338acbd7672f6636f
```


### Gas optimization

* Variable are initialized in its declaration to reduce construction cost.
* Modifiers are inlined into the functions they are applied to.
* Used remix gas profiler pluging to identify which parts of the code use most gas.

### References
- [Decentralized Storage Systems - Doug Hoyte](https://hoytech.github.io/blockchain-storage/lesson2)
- [Merkle Air-Drops](https://blog.ricmoo.com/merkle-air-drops-e6406945584d)
- [Gas Optimization - Dough Hoyte](https://hoytech.github.io/blockchain-vm/lesson2)
- [Smart Contract Audit - Dhruvin Parikh] (https://github.com/GeorgeBrownCollege-Toronto/Advanced-Smart-Contracts/tree/master/notes/smart-contract-security-audit)
- [Solidity](https://solidity.readthedocs.io/) - smart contract programming language
- [Truffle](https://www.trufflesuite.com/) - dApp environment
- [Truffle-assertions](https://www.npmjs.com/package/truffle-assertions) - additional assertions for truffle
- [Open Zeppelin Contracts](https://www.npmjs.com/package/@openzeppelin/contracts) - a library for secure smart contract development
- [Solium](https://www.npmjs.com/package/solium) - Solidity linter to analyse code for style & security issues
- [Solidity Coverage](https://www.npmjs.com/package/solidity-coverage) - code coverage for Solidity testing
- [Ethers.js](https://docs.ethers.io/) - interact with smart contracts
- [bn.js](https://www.npmjs.com/package/bn.js) - library to handle big numbers

