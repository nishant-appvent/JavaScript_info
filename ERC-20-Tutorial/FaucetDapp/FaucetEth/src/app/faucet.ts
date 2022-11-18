import {ethers} from "ethers";

const faucetAbi  = require("../../../../MY-Token/artifacts/contracts/Faucet.sol/Faucet.json").abi;;

const faucetContract = (provider:any)=>{
    return new ethers.Contract("0x3e887BFFfAd2F969C5CAFC8B7196CbA70AcC8ac2",faucetAbi,provider);
};


export default faucetContract;