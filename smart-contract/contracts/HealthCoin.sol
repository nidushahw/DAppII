// SPDX-License-Identifier: MIT

pragma solidity ^0.7.1;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.0/contracts/token/ERC20/IERC20.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.0/contracts/token/ERC20/ERC20.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.0/contracts/access/Ownable.sol";


contract HealthCoin is ERC20, Ownable  {
    uint public tokenPrice;
    uint public signupBonus;
    bytes32 private _eligibleMembersMerkleRoot;
    mapping(address => bool) private _users;
    
    constructor(bytes32 eligibleMembersMerkleRoot_, string memory name_, string memory symbol_, uint tokenPrice_, uint signupBonus_) ERC20(name_, symbol_) {
        _eligibleMembersMerkleRoot = eligibleMembersMerkleRoot_;
        tokenPrice = tokenPrice_;
        signupBonus = signupBonus_;
    }
    
    function setSignUpBonus(uint signupBonus_) public onlyOwner {
       signupBonus = signupBonus_;
    }
    
    function setTokenPrice(uint tokenPrice_) public onlyOwner {
       tokenPrice = tokenPrice_;
    } 

    function setEligibleMembersMerkleRoot(bytes32 eligibleMembersMerkleRoot_) public onlyOwner {
       _eligibleMembersMerkleRoot = eligibleMembersMerkleRoot_;
    } 
    
    function register() public payable returns (uint) {
        require(msg.value >= tokenPrice * signupBonus, "Not enough funds");
        return registerWithSignupBonus(msg.sender);
    }

    function registerForFree(uint256 path, bytes32[] memory witnesses) public returns (uint) {
        verifyEligibility(msg.sender, path, witnesses);
        return registerWithSignupBonus(msg.sender);
    }
    
    function buyTokens(uint _amount) public payable returns (uint) {
        require(_users[msg.sender], "Not registered");
        require(msg.value >= tokenPrice * _amount, "Not enough funds");
        _mint(msg.sender, _amount);
        return balanceOf(msg.sender);
    }

    function registerWithSignupBonus(address sender) private returns (uint) {
        require(!_users[sender], "Already registered");
        _users[sender] = true;
        _mint(sender, signupBonus);
        return signupBonus;
    }

    function verifyEligibility(address sender, uint256 path, bytes32[] memory witnesses) private view {
        bytes32 node = leafHash(sender);
        for (uint16 i = 0; i < witnesses.length; i++) {
            if ((path & 0x01) == 1) {
                node = nodeHash(witnesses[i], node);
            } else {
                node = nodeHash(node, witnesses[i]);
            }
            path /= 2;
        }
        // Check the resolved merkle proof matches our merkle root
        require(node == _eligibleMembersMerkleRoot, "Not eligible for free registration");
    }

    function leafHash(address leaf) private pure returns(bytes32) {
        return keccak256(abi.encodePacked(uint8(0x00), leaf));
    }

    function nodeHash(bytes32 left, bytes32 right) private pure returns(bytes32) {
        return keccak256(abi.encodePacked(uint8(0x01), left, right));
    }
    
    fallback() external payable {}
    
    receive() external payable {}
    
}
    