// We require the Hardhat Runtime 
const hre = require("hardhat");

async function main() {
  const Mytoken  = await hre.ethers.getContractFactory("Mytoken");
  const myToken = await Mytoken.deploy(100000000, 50);
  await myToken.deployed();
  console.log("Mytoken deployed: ", myToken.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
