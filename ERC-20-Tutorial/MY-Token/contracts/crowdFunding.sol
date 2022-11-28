
// // SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
contract crowdFunding{

    mapping(address=>uint) public contributors;
    address[] public contributorsArr;
    address public manager;
    address payable public receipent;
    string public  description;
    bool public active;
    uint public noOfVoters;
    mapping(address=>bool) public voters;
    uint public target;
    uint public fundDeadline;
    uint public voteDeadline;
    uint public minContribution;
    uint public contributorsCount;
    uint public raisedContribution;

    constructor() {
        active = false;
        minContribution = 1 * (10**15);
        manager = msg.sender;
    }

    modifier onlyManager(){
        require(msg.sender == manager,"only manager can access this function");
        _;
    }

    modifier isNotCompleted(){
        require(active==true,"Campaign not in run.");
        _;
    }

    function contractSetter(uint _target,uint _fundDeadline,uint _voteDeadline, address _add,string memory _desc)public onlyManager {
        require(address(this).balance==0,"Contract still in use.");
        require(active == false, "contract already in use");
        active = true;
        target = _target;
        fundDeadline = block.timestamp + (_fundDeadline*1 minutes) ;
        voteDeadline = fundDeadline + (_voteDeadline*1 minutes);
        description = _desc;
        receipent = payable(_add);
        noOfVoters = 0;
        contributorsCount = 0;
        delete contributorsArr;
        raisedContribution = 0;
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    function getContributorsArr() public view returns (address[] memory){
        return contributorsArr;
    }

    function sendEther() public payable isNotCompleted {
        require(msg.value >= minContribution,"minimum requirement didn't met");
        require(block.timestamp < fundDeadline,"Deadline reached for sending fund.");
        if(contributors[msg.sender]==0){
            contributorsCount++;
        }
        raisedContribution+=msg.value;
        bool flag=true;
        for(uint i; i<contributorsArr.length;i++){
            if(contributorsArr[i]==msg.sender){
                flag =false;
                break;
            }
        }
        if(flag){
            contributorsArr.push(msg.sender);
        }
        contributors[msg.sender]+=msg.value;
    }

    function adminRefund() public onlyManager isNotCompleted{
        // require(block.timestamp>deadline,"Deadline not over yet.");
        for(uint i=0; i<contributorsCount;i++){
            uint amount = contributors[contributorsArr[i]];
            contributors[contributorsArr[i]] = 0;
            voters[contributorsArr[i]] = false;
            if(amount!=0){
            payable(contributorsArr[i]).transfer(amount);
            }
        }
        active = false;
        noOfVoters = 0;
        contributorsCount = 0;
        delete contributorsArr;
        raisedContribution = 0;
        target = 0;
        voteDeadline = 0 ;
        fundDeadline = 0 ;
        description = "";
        receipent = payable(address(0));
    }

    function voteRequest () public isNotCompleted{
        require(contributors[msg.sender]>0,"You must be a contributor");
        require(block.timestamp > fundDeadline,"Voting hasn't started yet.");
        require(voters[msg.sender] == false,"You have already voted");
        require(block.timestamp < voteDeadline,"Voting is over.");
        require(raisedContribution>=target,"Insufficient fund, Voting can't proceed.");
        voters[msg.sender] = true;
        noOfVoters++;
    }

    function makePayment () public payable onlyManager isNotCompleted{
        require(block.timestamp > voteDeadline,"Deadline of campaign isn't over yet.");
        require(raisedContribution >= target,"Current balance is less than target balance");
        require(noOfVoters >contributorsCount/2,"Insuffiecient Votes.");
        require(receipent!=(address(0)),"Receipent address is not valid.");
        for(uint i; i<contributorsCount;i++){
            contributors[contributorsArr[i]] = 0;
            voters[contributorsArr[i]] = false;
        }
        receipent.transfer(address(this).balance);
        active = false;
        noOfVoters = 0;
        contributorsCount = 0;
        delete contributorsArr;
        raisedContribution = 0;
        target = 0;
        voteDeadline = 0 ;
        fundDeadline = 0 ;
        description = "";
        receipent = payable(address(0));
    }
}