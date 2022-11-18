const Razorpay = require('razorpay');
var instance = new Razorpay({ key_id: 'rzp_test_bucnIiS8qdO3Jl', key_secret: '7w93TO6NQh7nTjvkUgEq1Fho' })

var options = {
  amount: 50000,  // amount in the smallest currency unit
  currency: "INR",
  receipt: "order_rcptid_11"
};
instance.orders.create(options, function(err, order) {
  console.log(order);
});