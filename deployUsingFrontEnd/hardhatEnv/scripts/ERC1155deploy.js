const { ethers } = require("hardhat");

async function main() {
    // getting contract artifacts
    const ERC1155Deploy = await ethers.getContractFactory("ERC1155deploy");
    // contract sent for deployment
    const erc1155Deploy = await ERC1155Deploy.deploy("ipfs://QmUudRxBCyuci2RuCGqiD4D1vSy6btGkseSdegbLnzYJg6/{id}.json","Appvent ERC-1155");
    try {
        // contract deployed
        await erc1155Deploy.deployed();
        console.log(`Contract successfully deployed to : ${erc1155Deploy.address}`);
    } catch (error) {
        console.log("Error in deployment")
        console.log(`Error: ${err.message}`);
    }

    try {
        const tokenIdArr = [1,2,3];
        const nftAmountArr = [1,1,1];
        const initialRes = await erc1155Deploy.mintBatch(tokenIdArr,nftAmountArr);
        console.log("NFTs sent for Minting---------->",initialRes);
        const finalResponse = await initialRes.wait();
        console.log(finalResponse);
        const finalResponseEvent = finalResponse.events[0];
        console.log(finalResponseEvent);
    } catch (err) {
        console.log("Error in minting");
        console.log(err.message);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
