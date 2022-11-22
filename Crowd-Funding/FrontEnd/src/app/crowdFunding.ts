import {ethers} from "ethers";
const abi = require("../../../../ERC-20-Tutorial/MY-Token/artifacts/contracts/crowdFunding.sol/crowdFunding.json").abi;

const crowdFundContract = (provider:any)=>{
    return new ethers.Contract("0x37a30357dA953fC5A6Acfc89c85bAA894F18EA20",abi,provider);
};

export default crowdFundContract;