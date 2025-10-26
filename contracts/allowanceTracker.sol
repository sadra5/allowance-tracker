// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract allowanceTracker {
    address public parent;
    bool public locked;
    // address public kid;

    mapping (address => uint256) public allowance;
    mapping (address => uint256) public lockTime;
    mapping (address => bool) public myKids;

    modifier onlyParent() {
        require (msg.sender == parent, "only parent can call this function");
        _;
    }

    modifier onlyKid() {
        require (myKids[msg.sender] == true, "only kids can call this function");
        _;
    }

    modifier everyTwoMin(){
            require(lockTime[msg.sender] <= block.timestamp, "you can try agian in two minutes honey");
        _;
    }

    modifier nonReentrant() {
        require(!locked, "Reentrant call detected");
        locked = true;                             
        _;                                          
        locked = false;                             
    }

    constructor () {
        parent = msg.sender;
        // kid = _kid;
    }
    
    function setAllowance(uint256 _allowance, address _kid) public onlyParent {
        allowance[_kid] += _allowance;
    }

    function addKid(address _kid) public onlyParent{
        myKids[_kid] = true;
    }

    function getAllowance()public view returns(uint256){
        return allowance[msg.sender];
    }

    function getBalance()public view returns(uint256){
        return address(this).balance;
    }

    function deposit() public payable onlyParent{}
    
    function withraw(uint256 _value) public everyTwoMin nonReentrant onlyKid{
        uint256 currentAllowance = allowance[msg.sender];

        require (currentAllowance >= _value, "The amount is higher than your allowance honey");

        allowance[msg.sender] = currentAllowance - _value;

        (bool sent, ) = msg.sender.call{value: _value}("");
        require(sent, "Failed to send Ether");

        lockTime[msg.sender] = block.timestamp + 2 minutes;
    }

}