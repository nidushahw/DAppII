const HC = artifacts.require('HealthCoin');
const BN = require('bn.js');
const truffleAssert = require('truffle-assertions');
const merkleUtil = require('../scripts/merkle-tree-util');

contract("HealthCoin", (accounts) => {
    describe("Test CRT Contract Functionalities", async () => {
        let contractInstance;
        let root;
        let proofOfAccount1;

        before(async () => {
            let addressList = merkleUtil.readAddressesFromFile('scripts/addresses.txt');
            //Add accounts[1] to the addressess list
            addressList.push(accounts[1]);
            root = merkleUtil.calculateMerkleValues('root', addressList);
            proofOfAccount1 = merkleUtil.calculateMerkleValues('proof', addressList, accounts[1]);
        });

        it("should pass deployment", async () => {
            contractInstance = await HC.deployed();
            assert.isTrue(true);
            let tokenPrice = await contractInstance.tokenPrice.call();
            assert.equal(tokenPrice, 10000);
            let signupBonus = await contractInstance.signupBonus.call();
            assert.equal(signupBonus, 50);
        });

        it("should not allow anyone (not-owner) to set signup bonus", async () => {
            // set signup bonusby account 3 
            await truffleAssert.reverts(contractInstance.setSignUpBonus(100, { from: accounts[3] }), 'Ownable: caller is not the owner');
        });

        it("should not allow anyone (not-owner) to token price", async () => {
            // set token price by account 3 
            await truffleAssert.reverts(contractInstance.setTokenPrice(20000, { from: accounts[3] }), 'Ownable: caller is not the owner');
        });

        it("should not allow anyone (not-owner) to set eligibleMembersMerkleRoot", async () => {
            // set token price by account 3 
            await truffleAssert.reverts(contractInstance.setEligibleMembersMerkleRoot("0xf1b80a92f18cc18fbb5ce829d44b1519ccb1b617d35936f587526dc565070120", { from: accounts[3] }), 'Ownable: caller is not the owner');
        });

        it("should allow owner to set signup bonus", async () => {
            // set signup bonusby account 0 
            contractInstance.setSignUpBonus(100, { from: accounts[0] });
            let signupBonus = await contractInstance.signupBonus.call();
            assert.equal(signupBonus, 100);
        });

        it("should allow owner to set token price", async () => {
            // set token price by account 0 
            contractInstance.setTokenPrice(20000, { from: accounts[0] });
            let tokenPrice = await contractInstance.tokenPrice.call();
            assert.equal(tokenPrice, 20000);
        });

        it("should allow owner to set eligibleMembersMerkleRoot", async () => {
            await contractInstance.setEligibleMembersMerkleRoot(root, { from: accounts[0] });
            assert.isTrue(true);
        });

        it("should allow free registration for a eligible member", async () => {
            // account[1] is in the addresses list
            const witnesses = proofOfAccount1.witnesses;
            await contractInstance.registerForFree(proofOfAccount1.path, proofOfAccount1.witnesses, { from: accounts[1] });
            let signupBonus = await contractInstance.balanceOf(accounts[1]);
            assert.equal(signupBonus, 100);
        });

        it("should not allow re-register", async () => {
            // account[1] is in the addresses list
            await truffleAssert.reverts(contractInstance.registerForFree(proofOfAccount1.path, proofOfAccount1.witnesses, { from: accounts[1] }), 'Already registered');
            let signupBonus = await contractInstance.balanceOf(accounts[1]);
            assert.equal(signupBonus, 100);
        });

        it("should not allow to buy additional tokens with insufficient funds", async () => {
            await truffleAssert.reverts(contractInstance.buyTokens(15, { from: accounts[1], value: 10000 * 15 }), 'Not enough funds');
            let balance = await contractInstance.balanceOf(accounts[1]);
            assert.equal(balance, 100);
        });

        it("should allow to buy additional tokens", async () => {
            await contractInstance.buyTokens(15, { from: accounts[1], value: 20000 * 15 });
            let balance = await contractInstance.balanceOf(accounts[1]);
            assert.equal(balance, 115);
        });

        it("should not allow non-member for free registration", async () => {
            // account[2] is not in the addresses list
            await truffleAssert.reverts(contractInstance.registerForFree(proofOfAccount1.path, proofOfAccount1.witnesses, { from: accounts[2] }), 'Not eligible for free registration');
            let balance = await contractInstance.balanceOf(accounts[2]);
            assert.equal(balance, 0);
        });

        it("should not allow to buy tokens without registering", async () => {
            await truffleAssert.reverts(contractInstance.buyTokens(15, { from: accounts[2], value: 20000 * 15 }), 'Not registered');
            let balance = await contractInstance.balanceOf(accounts[2]);
            assert.equal(balance, 0);
        });

        it("should allow non-member to register with fees", async () => {
            await contractInstance.register({ from: accounts[2], value: 20000 * 100 });
            let signupBonus = await contractInstance.balanceOf(accounts[2]);
            assert.equal(signupBonus, 100);
        });

        it("should allow registered user to buy additional tokens", async () => {
            await contractInstance.buyTokens(25, { from: accounts[2], value: 20000 * 25 });
            let balance = await contractInstance.balanceOf(accounts[2]);
            assert.equal(balance, 125);
        });
    });
});


