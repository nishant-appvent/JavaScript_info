// contracts/Faucet.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

interface IERC20{
    function transfer(address to, uint256 amount) external returns (bool);

    function balanceOf(address account) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
}


contract Faucet {
    address payable owner;
    IERC20 public token;
    uint256 public withdrawlAmount = 50 * (10**18);
    uint public lockTime = 1 minutes;
    
    mapping (address => uint256) nextAccessTime;

    event Withdrawl(address indexed to, uint256 indexed amount);
    event Deposit(address indexed from, uint256 indexed amount);

    constructor(address tokenAddress) payable {
        token = IERC20(tokenAddress);
        owner = payable(msg.sender);
    }

    function requestTokens() public {
        require(msg.sender!=address(0),"Request must not originate from a zero account");

        require( token.balanceOf(address(this)) >= withdrawlAmount ,"Insufficient balance in faucet for withrawl request");

        require(block.timestamp >= nextAccessTime[msg.sender],"Insufficient time elapsed since last withdrawl - try again later.");
        nextAccessTime[msg.sender] = block.timestamp + lockTime;
        token.transfer(msg.sender, withdrawlAmount);
    }

    receive() external payable  {
        emit Deposit(msg.sender, msg.value);
    }

    function getBalance() external onlyOwner view returns (uint256){
        return token.balanceOf(address(this));
    }

    function setWithrawAmount(uint256 amount) public onlyOwner{
        withdrawlAmount = amount * (10**18);
    }

    function setLockTime(uint256 time) public onlyOwner{
        lockTime = time * 1 minutes;
    }

    function withdrawl() external onlyOwner{
        emit Withdrawl(msg.sender, token.balanceOf(address(this)));
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }

    modifier onlyOwner(){
        require(msg.sender==owner, "Only the contract owner can call this function");
        _;
    }

}

