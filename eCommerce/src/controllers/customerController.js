const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
const dbConn = require("../../config/db.config");
const Customers = dbConn.customers;
const otpTable = dbConn.otpTable;
const addressTable = dbConn.address;
const Products = dbConn.product;
const Merchants = dbConn.merchants;
const Categories = dbConn.category;
const Subcategories = dbConn.subCategory;
const Cart = dbConn.cart;
const orderService = require("../services/orderServices");
const CartDetails = dbConn.cartDetails
const Orders = dbConn.order

let nodemailer = require("nodemailer");

mailOtp = async (genOtp, email) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nishant.rajput@appventurez.com",
      pass: "lsgxyeztdjtfamms",
    },
  });
  let mailOptions = {
    from: "nishant.rajput@appventurez.com",
    to: email,
    subject: "OTP verification",
    text: genOtp,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      //   res.json("Email Sent successfully");
      console.log("Email sent: ");
    }
  });
};

// senOTP(OTP);

let otp = function generateOtp() {
  //   // const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  let n = 4;
  const characters = "1234567890";
  const charCount = characters.length;
  let newStr = "";
  for (let i = 0; i < n; i++) {
    newStr += characters.charAt(Math.floor(Math.random() * charCount));
  }
  return newStr;
};

sendOtp = async (req, res) => {
  console.log("in send otp");
  const email = req.body.email;
  try {
    const verifiedUser = await Customers.findOne({ where: { email: email } });
    if (verifiedUser) {
      res.status(200).json({ message: "User already verified" });
      return;
    }
    const checkEmail = await otpTable.findOne({ where: { email: email } });
    console.log(checkEmail);
    const token = jwt.sign({ mail: email }, "otp_key");
    let genOtp = otp();
    // const salt = bcrypt.genSaltSync(10);
    // const bycryptedOtp = bcrypt.hashSync(genOtp,salt);

    const otpObj = {
      email: email,
      otp: genOtp,
    };
    let otpData = {};
    const currentTime = Math.floor(Date.now() / 1000)
    console.log(currentTime);
    if (checkEmail) {
      await otpTable.update(
        { otp: genOtp, setAt:currentTime  },
        { where: { email: email } }
      );
    } else {
      otpData = await otpTable.create(otpObj);
    }
    mailOtp(genOtp, email);

    console.log(otpData.dataValues);
    res
      .status(200)
      .json({ optData: otpData.dataValues, emailJWT: token, otp: genOtp });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

verifyOtp = async (req, res) => {
  console.log("in vreify otp");
  const otp = req.body.otp;
  const email = req.body.email;
  // console.log(email)
  // console.log(req.jwtEmail);
  if (req.jwtEmail !== email) {
    res.status(200).json({ message: "provide your mail" });
    return;
  }
  const otpData = await otpTable.findOne({ where: { email: email } });
  // console.log(otpData.otp);

  console.log(Math.floor(Date.now() / 1000));
  // console.log(otp);
  if (otp == otpData.otp) {
    const currentTime = Math.floor(Date.now() / 1000);
    const otpExpireTime = 300; //in seconds
    const timeDiff = currentTime - otpData.setAt;
    console.log(timeDiff);
    if (timeDiff > otpExpireTime) {
      console.log("otp expired");
      res.status(200).json({ message: "otp expired" });
      return;
    }
    const Customer = {
      email: req.body.email,
      status: 1,
    };
    console.log("otp Verifed");
    try {
      let customerData = await Customers.create(Customer);
      console.log(customerData.dataValues);
      res
        .status(200)
        .json({ message: "otp matched", data: customerData.dataValues });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(200).json({ message: "OTP didn't match" });
  }
};

registerCustomer = async (req, res) => {
  console.log("-----------");
  console.log(req.body);
  const email = req.body.email;

  const salt = bcrypt.genSaltSync(10);
  const bycryptedPassword = bcrypt.hashSync(req.body.password, salt);
  const Customer = {
    name: req.body.name,
    phone: req.body.phone,
    password: bycryptedPassword,
    step: 1,
  };
  try {
    Customers.update(Customer, { where: { email: email } }).then(() => {
      Customers.findOne({ where: { email: email } }).then((customerData) => {
        // customerData.reload();
        console.log(customerData);
        res.status(200).json(customerData.dataValues);
      });
    });
    console.log(email);

    // customerData.reload();
  } catch (err) {
    // console.log(err)
    res.status(500).json({ message: "Internal Server Error" });
  }
};

loginCustomer = async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  Customers.findOne({ where: { email: email } }).then((loginRes) => {
    // console.log(loginRes)
    if (!loginRes) {
      return res.status(200).json({ message: "User not registered" });
    } else if (loginRes.status === -1) {
      console.log("User is blocked");
      return res.status(400).json({ message: "User Blocked" });
    }
    bcrypt.compare(password, loginRes.password, (err, check) => {
      if (check) {
        console.log("Password matched");

        const token = jwt.sign({ id: loginRes.id }, "customer_key");
        delete loginRes.password;
        res.json({
          status: true,
          message: "Login successful",
          yourData: loginRes,
          token: token,
        });
      } else {
        console.log("Password not matched");
        res.json({ status: false, message: "Login failed" });
      }
    });
  });
};

customerAddress = (req, res) => {
  console.log(req.body);
  const customerId = req.id;
  const addressObj = {          
    locality: req.body.locality,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    CustomerId: customerId,
  };
  addressTable
    .create(addressObj)
    .then((addressData) => {
      console.log(addressData.dataValues);
      Customers.update({ step: 0 }, { where: { id: customerId } })
        .then(() => {
          console.log("step changed in customer table");
        })
        .catch((error) => {
          console.log("error in updating step in customer table " + error);
        });
      res.status(200).json({
        status: true,
        message: "Address inserted successfully",
        details: addressData.dataValues,
      });
    })
    .catch((error) => {
      console.log(error + " Error in inserting address");
      res
        .status(404)
        .json({ status: false, message: "Error in inserting address" });
    });
};


getAllProducts = async (req, res) => {
  const limit = 1;
  const page = req.query.page;
  let offset = 0;
  if (page) {
    offset = (page - 1) * limit;
  }

  Products.findAll({
    attributes: [ "pname", "price","discountedPrice","stock"],
    include: [
      {
        model: Merchants,
        as: "Merchant",
        attributes: ["name", "email", "phone"],
      },
      {
        model: Categories,
        as: "Category",
        attributes: ["Category"],
      },
      {
        model: Subcategories,
        as: "Sub-category",
        attributes: ["subCategory"],
      },
    ],
    limit: limit,
    offset: offset,
    where: { status: 1 },
  })
    .then((productData) => {
        productData.forEach(element => {
        if(element.stock===0){
            element.stock = `Out of Stock`;
        }
        else if(element.stock<10){
            element.stock = `${element.stock} left`;
        }
    });
    //   console.log(productData);
      res.status(200).json({ message: productData });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: "Error in getting products" });
    });
};


addToCart = (req, res) => {
  const customerId = req.id;
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  console.log(req.body);
  Products.findOne({ where: { id: productId } }).then((productData) => {
    if(!productData){
        return res.status(404).json({message:"Product not found."})
    }
    const discount = productData.discount;
    console.log(discount);
    const price = productData.price;
    const discountedPrice = productData.discountedPrice;
    const merchantId = productData.MerchantId;
    const stock = productData.stock;
    const productStatus = productData.status;
    if (productStatus !== 1) {
      return res.status(404).json({ message: "Product not available" });
    }
    let cartQuantity = 0;
    Cart.findOne({ where: { ProductId: productId,CustomerId:customerId } }).then(
      (cartFetchedData) => {
        if (cartFetchedData) {
          cartQuantity = cartFetchedData.quantity;
          console.log("cartQuantity_______", cartQuantity);
          console.log("cart_______", cartFetchedData);
          const totalQuantity = cartQuantity + quantity;
          if (stock > totalQuantity) {
            Cart.update(
              {
                quantity: totalQuantity,
                price: price * totalQuantity,
                discountedPrice: discountedPrice * totalQuantity,
              },
              { where: { id: cartFetchedData.id } }
            ).then(() => {
              Cart.findAndCountAll({
                attributes: [
                  "discountPercent",
                  "discountedPrice",
                  "price",
                  "quantity",
                ],
                include: [
                  {
                    model: Merchants,
                    as: "Merchant",
                    attributes: ["name", "phone", "email"],
                  },    
                  {
                    model: Products,
                    as: "Product",
                    attributes: ["pname", "price"],
                  }
                ],where:{CustomerId:customerId,id:cartFetchedData.id}
              }).then((cartDetails) => {
                for (let k of cartDetails.rows) {
                  console.log(k.dataValues.price);
                }
                res.status(200).json({
                  message: "product added successfully",
                  cartDetails: cartDetails,
                });
              });
            });
          } else {
            console.log("Out of stock");
            res.status(404).json({
              message: `Order quantity more than available stock`,
              availableStock: stock,
            });
          }
        } else {
          if (stock > quantity) {
            const cartData = {
              CustomerId: customerId,
              ProductId: productId,
              MerchantId: merchantId,
              price: price * quantity,
              quantity: quantity,
              discountPercent: discount,
              discountedPrice: discountedPrice * quantity,
            };
            console.log(cartData);
            // console.log(orderData)
            Cart.create(cartData).then((cartInsertedData) => {
              Cart.findAndCountAll({
                attributes: [
                  "discountPercent",
                  "discountedPrice",
                  "price",
                  "quantity",
                ],
                include: [
                  {
                    model: Merchants,
                    as: "Merchant",
                    attributes: ["name", "phone", "email"],
                  },
                  {
                    model: Products,
                    as: "Product",
                    attributes: ["pname", "price"],
                  },
                ],where:{CustomerId:customerId,id:cartInsertedData.id}
              }).then((cartDetails) => {
                console.log(cartDetails);
                res.status(200).json({
                  message: "product added successfully",
                  cartDetails: cartDetails,
                });
              });
            });
          } else {
            console.log("Out of stock");
            res.status(404).json({
              message: `Order quantity more than available stock`,
              availableStock: stock,
            });
          }
        }
      }
    );
  });
};


cartDetails = (req, res) => {
  // const customerId = req.id
  const customerId = req.id;
  console.log(customerId);
  Cart.findAll({
    where:{CustomerId:customerId},
    attributes: [
      [sequelize.fn('sum', sequelize.col("discountedPrice")), "grandTotal"],
      [sequelize.fn('COUNT', sequelize.col("discountedPrice")), "productCount"],
    ],
    group: ["CustomerId"],
    raw:true
  }).then((cartData) => {
    // console.log(cartData)
    // res.json({grandTotal:cartData[0]});
    // console.log(cartData);
    // console.log("\\\\\\\\");
    // console.log(cartData[0]);
    // console.log("--------------");
    // console.log(cartData[1]);
    console.log("------=======-----");
    const sChargeLimit = 10000;
    let shippingCharge = 0;
    // console.log(cartData);
    const grandTotal = parseInt(cartData[0].grandTotal);
    console.log(grandTotal);
    const productCount = cartData[0].productCount;
    // console.log(typeof grandTotal)
    if(grandTotal<sChargeLimit){
        shippingCharge = 100;
    }
    const newCartData = {
        grandTotal:grandTotal,
        CustomerId:customerId,
        shippingCharge:shippingCharge,
        productCount:productCount
    }
    // console.log(newCartData);
    CartDetails.findOrCreate({where:{CustomerId:customerId},defaults:newCartData}).then((dataInserted)=>{
        if(dataInserted[1]){
            res.status(200).json(dataInserted[0]);
        }else{
            CartDetails.update(newCartData,{where:{CustomerId:customerId}}).then(()=>{
                CartDetails.findOne({where:{CustomerId:customerId}}).then((cartDet)=>{
                    Cart.findAndCountAll({
                        attributes: [
                          "discountPercent",
                          "discountedPrice",
                          "price",
                          "quantity",
                        ],
                        include: [
                          {
                            model: Merchants,
                            as: "Merchant",
                            attributes: ["name", "phone", "email"],
                          },    
                          {
                            model: Products,
                            as: "Product",
                            attributes: ["pname", "price"],
                          }
                        ],where:{CustomerId:customerId}
                      }).then((cartDetails) => {
                        for (let k of cartDetails.rows) {
                          console.log(k.dataValues.price);
                        }
                        res.status(200).json({
                          message: "product added successfully",
                          cartDetails: cartDetails,
                          cartDet:cartDet
                        });
                      });
            }
            )
        });
        
    }
    })
  }); 
};


orderProducts = async (req,res)=>{
    const addressId = req.body.addressId;
    const orderId = req.body.orderId;
    const customerId = req.id;
    try{
    const addressObj = await addressTable.findOne({where:{id:addressId,CustomerId:customerId}});
    if(!addressObj){
        return res.status(404).json({message:"Please Fill address details"});
    }
    const orderIdObj = await CartDetails.findOne({where:{id:orderId,status:0}});
    if(!orderIdObj){
        return res.status(404).json({message:"Cart details not found"});
    }
    let productCount = orderIdObj.productCount; 
    // let productCount = 2; 
    const grandTotal = orderIdObj.grandTotal; 
    const shippingCharge = orderIdObj.shippingCharge; 
    let address = "Locality : " + addressObj.locality + " | City : " + addressObj.city + " | State : " + addressObj.state + " | Zipcode : " + addressObj.zipcode;

    console.log(address);
    while(productCount){
        const cartData = await Cart.findOne({where:{Customerid:customerId}});
        cartData.dataValues.address = address;
        cartData.dataValues.orderId = orderId;
        const toBeInserted = cartData.dataValues;
        const orderData = await Orders.create(toBeInserted);
        const productId = orderData.ProductId;
        const quantity = orderData.quantity;
        const productData = await Products.findOne({where:{id:productId}});
        const stock = productData.stock-quantity;
        await Products.update({stock:stock},{where:{id:productId}});

        await Cart.destroy({where:{CustomerId:customerId,ProductId:productId}});

        productCount--;
    }
    await CartDetails.update({status:1},{where:{CustomerId:customerId}});
    res.status(200).json({message:"Order Successfull", TotalAmount:grandTotal,shippingCharge:shippingCharge});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server error occurred"})
    }
}


removeFromCart = async (req,res)=>{
    const customerId = req.id;

    const productId = req.body.productId;
    try{
    await Cart.destroy({where:{CustomerId:customerId,ProductId:productId}});
        res.status(200).json({message:"Deleted From Cart."})
    }
    catch(err){
        res.status(404).json({message:"Error in deleting Product from cart"});
    }
    
}


orderDetails = (req, res) => {
  orderService.orderFindAll().then((data) => {
    console.log(data);
    
    res.status(200).json(data);
  });
};

module.exports = {
  registerCustomer,
  sendOtp,
  verifyOtp,
  loginCustomer,
  customerAddress,
  getAllProducts,
  addToCart,
  orderDetails,
  cartDetails,
  orderProducts,
  removeFromCart
};
