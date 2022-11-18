// const abi = require("../../../backend/build/contracts/vendingMachine.json").abi
const abi = require("../../../../MY-Token/artifacts/contracts/Faucet.sol/Faucet.json").abi;

// const vmContract = new web3.eth.Contract(abi, "0xCB050d0813432C1962c90769B46e162dCaE70827")

const faucetContract = (web3:any) => {
    return new web3.eth.Contract(
        abi,
        "0x3e887BFFfAd2F969C5CAFC8B7196CbA70AcC8ac2"
    )
}

export default faucetContract;