const xrpl = require("xrpl")

async function createWallet(){
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
  await client.connect()
  const fund_result = await client.fundWallet()
    const test_wallet = fund_result.wallet
    console.log(fund_result)
    console.log(test_wallet);

    const response = await client.request({
      "command": "account_info",
      "account": test_wallet.address,
      "ledger_index": "validated"
    })
    console.log(response)
    console.log("---------");
    client.request({
      "command": "subscribe",
      "streams": ["ledger"]
    })
    client.on("ledgerClosed", async (ledger)=>{
      console.log(`Ledger #${ledger.ledger_index} validated with ${ledger.txn_count} transactions!`)
    })

  client.disconnect()
  
}

  createWallet()

// Create a wallet and fund it with the Testnet faucet:


// Get info from the ledger about the address we just funded
// 'sEd7iPKi8FyYxiiFioFaZHyEjaPwsSn'=====seed