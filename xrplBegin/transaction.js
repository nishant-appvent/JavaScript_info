// Example credentials
const xrpl = require("xrpl");

async function sendXRP() {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const wallet = xrpl.Wallet.fromSeed("sEd7iPKi8FyYxiiFioFaZHyEjaPwsSn");
  console.log(wallet.address); // rMCcNuTcajgw7YTgBy1sys3b89QqjUrMpH

  // Prepare transaction -------------------------------------------------------
  const prepared = await client.autofill({
    "TransactionType": "Payment",
    "Account": wallet.address,
    "Amount": xrpl.xrpToDrops("22"),
    "Destination": "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe"
  })
  const max_ledger = prepared.LastLedgerSequence
  console.log("Prepared transaction instructions:", prepared)
  console.log("Transaction cost:", xrpl.dropsToXrp(prepared.Fee), "XRP")
  console.log("Transaction expires after ledger:", max_ledger)

  // Sign prepared instructions ------------------------------------------------
  const signed = wallet.sign(prepared);
  console.log("Identifying hash:", signed.hash);
  console.log("Signed blob:", signed.tx_blob);

  // Submit signed blob --------------------------------------------------------
  const tx = await client.submitAndWait(signed.tx_blob);

  // Check transaction results -------------------------------------------------
  console.log("Transaction result:", tx.result.meta.TransactionResult);
  console.log(
    "Balance changes:",
    JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2)
  );
  client.disconnect();
}
sendXRP();