
// const { NOT_EXTENDED } = require("http-status");
const paypal = require("paypal-rest-sdk")
paypal.configure({
      'mode': 'sandbox', //sandbox or live
      'client_id': 'AfZU61H4diL94Ukst0q6s3tjsGD-8GVRj-BYvIo4FfA9WefPdSSf_cwMiZSSGHCBW5FCMQ2ztLk6PmHL',
      'client_secret': 'EN76nmfpxv-T1z3cjtK6Vmy3OEjNlPC1w9848TLrUW-mcFVB60uCDH667Lnf6dHCoWZcn0OuzJ4QSpK1'
});
exports.paypal = (req, res) => {
      try {
            const create_payment_json = {
                  "intent": "sale",
                  "payer": {
                        "payment_method": "paypal"
                  },
                  "redirect_urls": {
                        "return_url": "http://localhost:3000/api/v1/paypal/success",
                        "cancel_url": "http://localhost:3000/api/v1/paypal/cancel"
                  },
                  "transactions": [{
                        "item_list": {
                              "items": [{
                                    "name": "product",
                                    "sku": "001",
                                    "price": "25.00",
                                    "currency": "USD",
                                    "quantity": 1
                              }]
                        },
                        "amount": {
                              "currency": "USD",
                              "total": "25.00"
                        },
                        "description": "This is prodct description"
                  }]
            };
            paypal.payment.create(create_payment_json, function (error, payment) {
                  if (error) {
                        throw error;
                  } else {
                        for (let i = 0; i < payment.links.length; i++) {
                              if (payment.links[i].rel === 'approval_url') {
                                    // res.redirect(payment.links[i].href);
                                    res.json({
                                          message: "Done",
                                          response:
                                                payment.links[i].href
                                    })
                              }
                        }
                  }
            });
      } catch (error) {
            next(error);
      }
};
exports.Success = (req, res) => {
      try {
            const payerId = req.query.PayerID;
            const paymentId = req.query.paymentId;
            const execute_payment_json = {
                  "payer_id": payerId,
                  "transactions": [{
                        "amount": {
                              "currency": "USD",
                              "total": "25.00"
                        }
                  }]
            };
            paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
                  if (error) {
                        console.log(error.response);
                        throw error;
                  } else {
                        // console.log(JSON.stringify(payment));
                        res.send('Success')
                  }
            });
      } catch (error) {
            next(error)
      }
};
exports.Cancel = (req, res) => res.send('Cancelled');