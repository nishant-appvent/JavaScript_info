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
const Orders = dbConn.order;
const OrderItems = dbConn.orderItem;

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
    const currentTime = Math.floor(Date.now() / 1000);
    console.log(currentTime);
    if (checkEmail) {
      await otpTable.update(
        { otp: genOtp, setAt: currentTime },
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
    res.status(200).json({
      message: "provide your mail. this email doesn't belong to you.",
    });
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
  const limit = 3;
  const page = req.query.page;
  let offset = 0;
  if (page) {
    offset = (page - 1) * limit;
  }

  Products.findAll({
    attributes: ["pname", "price", "discountedPrice", "stock"],
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
      productData.forEach((element) => {
        if (element.stock === 0) {
          element.stock = `Out of Stock`;
        } else if (element.stock < 10) {
          element.stock = `${element.stock} left`;
        } else {
          element.stock = ``;
        }
      });
      res.status(200).json({ message: productData });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: "Error in getting products" });
    });
};

addToCart = async (req, res) => {
  const customerId = req.id;
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  try {
    const productData = await Products.findOne({ where: { id: productId } });
    if (!productData) {
      return res
        .status(404)
        .json({ status: false, message: "No Such Product Found" });
    }
    const stock = productData.stock;
    if (!productData || productData.status !== 1) {
      return res
        .status(404)
        .json({ status: false, message: "Product not available at this time" });
    }
    const cartFetchedData = await Cart.findOne({
      where: { ProductId: productId, CustomerId: customerId },
    });
    let cartQuantity = 0;
    if (cartFetchedData) {
      cartQuantity = cartFetchedData.quantity;
      const totalQuantity = cartQuantity + quantity;
      if (stock > totalQuantity) {
        await Cart.update(
          { quantity: totalQuantity },
          { where: { id: cartFetchedData.id } }
        );
        return res.status(200).json({
          status: true,
          message: "Product added to cart successfully",
        });
      } else {
        console.log("Out of stock");
        return res.status(404).json({
          status: false,
          message: `Order quantity more than available stock`,
          availableStock: stock,
        });
      }
    } else {
      if (stock > quantity) {
        const cartData = {
          CustomerId: customerId,
          ProductId: productId,
          quantity: quantity,
        };
        console.log(cartData);
        const cartInsertedData = await Cart.create(cartData);
        return res.status(200).json({
          status: true,
          message: "Product added to Cart successfully",
        });
      } else {
        console.log("Out of stock");
        return res.status(404).json({
          status: false,
          message: `Order quantity more than available stock`,
          availableStock: stock,
        });
      }
    }
  } catch (err) {
    console.log(">>>>>>>>>>>>>ADDING to cart error", err);
    res.status(500).json({ status: false, message: "Internal server Error" });
  }
};

getCartDetails = async (req, res) => {
  const customerId = req.id;
  const cartData = await Cart.findAll({
    attributes: ["quantity"],
    include: [
      {
        model: Products,
        as: "Product",
        attributes: ["pname", "price","discountedPrice"],
        include: [
          {
            model: Merchants,
            as: "Merchant",
            attributes: ["name", "email"],
          },
        ],
      },
    ],
    where: { CustomerId: customerId },
  });
  let totalPrice = 0;
  let totalDiscountedPrice = 0;
  cartData.forEach((element) => {
    let quantity = element.dataValues.quantity;
    let discountedPrice = element.dataValues.Product.discountedPrice;
    // console.log(discountedPrice)
    let price = element.dataValues.Product.price;
    totalPrice += price * quantity;
    totalDiscountedPrice += discountedPrice * quantity;
    element.dataValues.price = price * quantity;
    element.dataValues.discountedPrice = discountedPrice * quantity;
  });

  res.status(200).json({
    totalPrice: totalPrice,
    totalDiscountedPrice: totalDiscountedPrice,
    cartData: cartData,
  });
};

removeFromCart = async (req, res) => {
  const customerId = req.id;

  const productId = req.body.productId;
  try {
    await Cart.destroy({
      where: { CustomerId: customerId, ProductId: productId },
    });
    res.status(200).json({ message: "Deleted From Cart." });
  } catch (err) {
    console.log(">>>>>>>>>>>>Error in removing From Cart");
    res.status(404).json({ message: "Internal Server Error" });
  }
};

orderProducts = async (req, res) => {
  const customerId = req.id;
  const addressId = req.body.addressId;
  try {
    const addressObj = await addressTable.findOne({
      where: { id: addressId, CustomerId: customerId },
    });
    if (!addressObj) {
      return res.status(404).json({ message: "Please Fill address details" });
    }
    let address =
      "Locality : " +
      addressObj.locality +
      " | City : " +
      addressObj.city +
      " | State : " +
      addressObj.state +
      " | Zipcode : " +
      addressObj.zipcode;

    const cartData = await Cart.findAll({
      attributes: ["quantity", "ProductId"],
      include: [
        {
          model: Products,
          as: "Product",
          attributes: ["pname", "price", "discountedPrice", "discount"],
          include: [
            {
              model: Merchants,
              as: "Merchant",
              attributes: ["id", "name", "email"],
            },
          ],
        },
      ],
      where: { CustomerId: customerId },
    });
    if (cartData.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "Please add products to your cart" });
    }

    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let productCount = 0;
    let productIdList = [];
    cartData.forEach((element) => {
      let quantity = element.dataValues.quantity;
      let discountedPrice = element.dataValues.Product.discountedPrice;
      let price = element.dataValues.Product.price;
      let productId = element.dataValues.ProductId;
      totalPrice += price * quantity;
      totalDiscountedPrice += discountedPrice * quantity;
      element.dataValues.price = price * quantity;
      element.dataValues.discountedPrice = discountedPrice * quantity;
      productIdList.push(productId);
      productCount++;
    });
    console.log(productIdList);

    const productList = await Products.findAll({
      where: {
        id: productIdList,
      },
      raw: true,
    });
    if (productIdList.length !== cartData.length) {
      return res.status(404).json({
        status: false,
        message: "Some Product from your cart is not available now.",
      });
    }

    productList.forEach((element, index, arr) => {
      const cartQuantity = cartData[index].dataValues.quantity;
      if (element.status !== 1) {
        return res.status(404).json({
          status: false,
          message: `${element.pname} is not is available now.`,
        });
      } else if (element.stock < cartQuantity) {
        return res.status(404).json({
          status: false,
          message: `${element.pname} is not is stock now.Available stock is ${element.stock}`,
        });
      } else {
        element.stock -= cartQuantity;
      }
    });

    let shippingCharge = 0;
    const shippingLimitCharge = 1000;
    if (totalDiscountedPrice < shippingLimitCharge) {
      shippingCharge = 100;
    }

    const orderData = await Orders.create({
      CustomerId: customerId,
      productCount: productCount,
      grandTotal: totalDiscountedPrice,
      shippingCharge: shippingCharge,
      paymentStatus: 1,
    });

    const orderId = orderData.id;
    const paymentStatus = orderData.paymentStatus;
    if (!paymentStatus) {
      return res
        .status(404)
        .json({ status: false, message: "Payment not done yet" });
    }

    const orderItemsList = [];
    cartData.forEach((element, index, arr) => {
      const orderItemObj = {
        CustomerId: customerId,
        OrderId: orderId,
        ProductId: element.dataValues.ProductId,
        quantity: element.dataValues.quantity,
        price: element.dataValues.price,
        discountPercent: element.dataValues.Product.discount,
        discountedPrice: element.dataValues.discountedPrice,
        MerchantId: element.dataValues.Product.Merchant.id,
        address: address,
      };
      orderItemsList.push(orderItemObj);
    });

    console.log(orderItemsList);
    const orderItemsDetails = await OrderItems.bulkCreate(orderItemsList);
    console.log();
    await Products.bulkCreate(productList, {
      updateOnDuplicate: ["stock"],
    });
    await Cart.destroy({ where: { CustomerId: customerId } });

    console.log(orderItemsList);

    res
      .status(200)
      .json({ status: true, message: "Order Placed Successfully" });
  } catch (err) {
    console.log(">>>>>>>>>>>>Error in placing order", err);
    return res.status(404).json({ message: "Internal Server Error" });
  }
};

orderDetails = async (req, res) => {
  const customerId = req.id;
  try {
    const orderDet = await OrderItems.findAll({
      attributes: [
        "OrderId",
        "price",
        "quantity",
        "discountPercent",
        "discountedPrice",
        "address",
      ],
      include: [
        {
          model: Merchants,
          as: "Merchant",
          attributes: ["name", "email", "phone"],
        },
        { model: Products, as: "Product", attributes: ["pname", "price"] },
      ],
      where: { CustomerId: customerId },
    });
    if(orderDet.length===0){
      return res.status(200).json({status:true, message:"You haven't placed any order yet"});
    }
    return res.status(200).json({ status: true, orderDet });
  } catch (err) {
    console.log(">>>>>>>>>>>Error in fetching Order details", err);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
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
  getCartDetails,
  orderProducts,
  removeFromCart,
};
