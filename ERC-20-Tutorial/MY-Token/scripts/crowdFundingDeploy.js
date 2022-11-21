// We require the Hardhat Runtime 
const hre = require("hardhat");

async function main() {
  const CrowdFunding  = await hre.ethers.getContractFactory("crowdFunding");
  const crowdFunding = await CrowdFunding.deploy();
  await crowdFunding.deployed();
  console.log("CrowdFunding deployed ", crowdFunding.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
