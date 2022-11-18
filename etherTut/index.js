const express = require("express");
const app = express();
const port = 4000;
const etherApis = require('./etherApis')


app.get("/createWallet", etherApis.createWallet);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
