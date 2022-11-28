import {ethers} from "ethers";
const abi = require("../../../../ERC-20-Tutorial/MY-Token/artifacts/contracts/crowdFunding.sol/crowdFunding.json").abi;

const crowdFundContract = (provider:any)=>{
    return new ethers.Contract("0x7dF3b3671a0b524CeD085f96DFe2Cb4A769B2C0a",abi,provider);
};

export default crowdFundContract;