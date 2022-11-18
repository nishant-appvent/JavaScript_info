const stripe = require("stripe")(
  "sk_test_51LedZQSHhESo1qAgBhI0MTp7YMAxwTcC3F9MR1jOtfvmmKmMzvbzCePFOnh6U1zE0r7n1pLLuvZ5tQA3crbtyg9B00ztEBEnqR"
);
const dbConn = require("../../config/db.config");
const Payments = dbConn.payment;

paymentFunc = async function (reqBody) {
  const customerDetails = reqBody.customerDetails;
  const cardDetails = reqBody.cardDetails;
  const amount = reqBody.amount
  const OrderId = reqBody.orderId

  
    console.log("_______________============)",customerDetails)
  const stripeCust = await stripe.customers.create(customerDetails);
  console.log("============>>>>>>>>>>>>>>>>>.)")
  const custID = stripeCust.id;

  let paymentMethod = await stripe.paymentMethods.create({
    type: "card",
    card: cardDetails,
  });

  paymentIntent = await stripe.paymentIntents.create({
    payment_method: paymentMethod.id,
    amount: amount*100,
    currency: "inr",
    customer: custID,
    confirm: true,
    off_session: true,
    payment_method_types: ["card"],
  });
  console.log(paymentIntent.id);
  console.log(paymentIntent);
  console.log("amt received ", paymentIntent.amount_received);
  const paymentID = paymentIntent.id;
  const paymentStatus = paymentIntent.charges.data[0].paid;
  
  const transactionID = paymentIntent.charges.data[0].balance_transaction;
  const receiptUrl = paymentIntent.charges.data[0].receipt_url;
  let status = 0;
  if(paymentStatus){
    status = 1;
  }
  const paymentData = {paymentID,transactionID,OrderId,status};
  const paymentDetails = await Payments.create(paymentData);
  paymentData.receiptUrl=receiptUrl;
  return paymentData; 
};

module.exports = {
  paymentFunc,
};
