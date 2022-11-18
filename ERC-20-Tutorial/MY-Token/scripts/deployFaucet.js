// We require the Hardhat Runtime 
const hre = require("hardhat");

async function main() {
  const Faucet  = await hre.ethers.getContractFactory("Faucet");
  const faucet = await Faucet.deploy("0x5391B56506efb3450Ed1d32413b4f3a51856231b");
  await faucet.deployed();
  console.log("Faucet contract deployed: ", faucet.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
