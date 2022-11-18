const ethers = require("ethers");
const provider = new ethers.providers.InfuraProvider(
  "ropsten",
  "84842078b09946638c03157f83405213"
);

exports.createWallet=async(req,res)=> {
    const ether = require("ethers");
    let wallet = ether.Wallet.createRandom();
   
    console.log(wallet);
    return res.status(200).json({
        status:true,
        privateKey: wallet._signingKey().privateKey,
        address: wallet.address
    })
}

async function balance() {
  try {
    const balance = await provider.getBalance(
      "0x3a0d68d484e77664c5507e7e1c46d090f25930bf"
    );
    const convertToEth = 1e18;
    console.log(
      "account's balance in ether:",
      balance.toString() / convertToEth
    );
    
  } catch (err) {
    console.log(err);
  }
}



async function sendEther(amountInether,receiver){
    let privateKey =
      "0x7c8c6a789a36232bc1912db96dabd96ab55d0a798e0824c6cc9a7f7de4bc2e68";
    let receiverAddress = receiver;
    let wallet = new ethers.Wallet(privateKey, provider);
    // Ether amount to send
    // Create a transaction object
    let tx = {
      to: receiverAddress,
      value: ethers.utils.parseEther(amountInether),
      gasLimit:23000,
      gasPrice: ethers.utils.parseUnits('0.000000009')
    };
  // Send the transaction
  // const signedTx = await wallet.signTransaction(tx,privateKey)
  // console.log(signedTx);
  const transactionObj = await wallet.sendTransaction(tx);
  console.log(transactionObj);

//   const transactionObj = await wallet.sendTransaction(tx);
    // console.log(transactionObj);
  

}


sendEther("1","0xBF14e4082CD321eE3146b0e826931cb87400110A");

// balance();
