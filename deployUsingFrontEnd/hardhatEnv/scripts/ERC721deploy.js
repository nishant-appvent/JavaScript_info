const { ethers } = require("hardhat");

async function main() {
    // getting contract artifacts
    const ERC721Deploy = await ethers.getContractFactory("ERC721deploy");
    // contract sent for deployment
    const erc721Deploy = await ERC721Deploy.deploy("NFT-Name","symb");
    try {
        // contract deployed
        await erc721Deploy.deployed();
        console.log(`Contract successfully deployed to : ${erc721Deploy.address}`);
    } catch (error) {
        console.log("Error in deployment")
        console.log(`Error: ${err.message}`);
    }

    try {
        // this is the array of ipfs metadata of images
        const arr = ["QmNvc5EADNm94CctNBWAARejJ6jL2daYoRdXmGftun1CBu", "QmPX21oRAGbiTajBjeUYGne28ZcTT2s7CGvnniGgLDrGrQ", "QmP7B1Yqe8gDCjKWC4VDAmLnxXVDHDk5TQjDBPdhfzEkd8"];

        const promiseArr = [];
        // minting array in loop
        for (let i = 0; i < arr.length; i++) {
            // initial response of nft sent for minting
            const initialResponse = await erc721Deploy.mint(arr[i]);
            console.log("NFT sent for Minting---------->", initialResponse);
            promiseArr.push(initialResponse.wait());
        }
        Promise.all(promiseArr).then((values) => {
            for (let i = 0; i < values.length; i++) {
                // eventArr on successful minting
                const eventArr = JSON.stringify(values[i].events[0].args);
                // tokenId of the minted image
                const tokenId = JSON.stringify(values[i].events[0].args[2].toNumber());
                console.log(eventArr, "=====", tokenId);
            }
        }
        )
    } catch (err) {
        console.log("Error in minting");
        console.log(err.message);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
