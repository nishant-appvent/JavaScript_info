require("dotenv").config();
app = require('express')();
// Creation of Web3 class
// Getting JSON for abi and byteCode
// const output = require('./bin/nayaContract.json');
const output = require('./bin/nftContract.json');
// Adding provider in Web3 instance
const ABI = output.abi;
const bytecode = output.bytecode;
const ethers = require("ethers");
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJSDocs = YAML.load('./api.yaml');
const port = process.env.port || 8000;

app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerJSDocs));


app.get("/string",(req,res)=>
    res.status(400).send("This is a string."))

app.get("/user",(req,res)=>
res.status(200).send({id:2, message:"This is an object Example."}))

app.get('/deployWithEthers', async (req, res) => {
    const collectionName = "UsingEthersLibrary-2";
    const collectionUri = "ipfs://QmShBNMnspk8CyDqJ2wvNMMUZtLDbabFy74EzePCo847u1/{id}.json";
    const tokenIdArr = [6, 7, 8, 9, 10, 11, 13];
    const nftAmountArr = [1, 1, 1, 1, 1, 1, 1];
    let contractInstance;
    try {
        const provider = new ethers.providers.AlchemyProvider("goerli", "rF7N_UT4-zBO3a41Y3Gxa5wM-DvUON0L");
        const Wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        const ContractInstance = new ethers.ContractFactory(ABI, bytecode, Wallet);
        contractInstance = await ContractInstance.deploy(collectionName,collectionUri );
        await contractInstance.deployed();
        console.log("Contract Address",contractInstance.address);
    } catch (err) {
        console.log("Error in deploying contract.");
        console.log(err);
        return res.status(400).json({message:"Failure",error:"Error in deploying contract."})
    }

    try {
        const initialRes = await contractInstance.mintBatch(tokenIdArr, nftAmountArr);

        const finalResponse = await initialRes.wait();

        const responseObj = {};
        for (let i = 0; i < tokenIdArr.length; i++) {
            responseObj[tokenIdArr[i]] = `https://testnets.opensea.io/assets/goerli/${contractInstance.address}/` + tokenIdArr[i];
        }
        console.log(responseObj);
        return res.status(200).json({message:"Success",Links:responseObj})
    } catch (error) {
        console.log("Error in minting");
        console.log(error);
        return res.status(400).json({message:"Failure",error:"Error in Minting."})
    }
})

app.get("/estimateCost",async (req, res)=>{
    try{
    const provider = new ethers.providers.AlchemyProvider("goerli", "rF7N_UT4-zBO3a41Y3Gxa5wM-DvUON0L");
    console.log("a");
    const Wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    console.log("b");
    const ContractInstance = new ethers.ContractFactory(ABI, bytecode, Wallet);
    console.log("c");
    const estimatedGas = await provider.estimateGas(ContractInstance.getDeployTransaction(process.env.PUBLIC_KEY,"ipfs://QmShBNMnspk8CyDqJ2wvNMMUZtLDbabFy74EzePCo847u1/{id}.json",[1,2,3,4,5],[1,1,1,1,1]).data);
    console.log("d");
    const val = estimatedGas.toNumber();
    console.log("e");
    return res.status(200).json({message: "Success", val});
}catch(err){
    console.log(err);
    return res.json({err});
}

})

app.listen(port, () => {
    console.log(`Running on ${port}`);
})