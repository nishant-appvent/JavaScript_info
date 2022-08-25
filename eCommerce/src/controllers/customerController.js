const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbConn = require("../../config/db.config");
const Customers = dbConn.customers;
const otpTable = dbConn.otpTable;
const addressTable = dbConn.address;

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
    if (checkEmail) {
      await otpTable.update(
        { otp: genOtp, updatedAt: Math.floor(Date.now() / 1000) },
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
    const otpExpireTime = 120; //in seconds
    const timeDiff = currentTime - otpData.updatedAt;
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
    }
    else if(loginRes.status===-1){
        console.log("User is blocked");
        return res.status(400).json({ message: "User Blocked" })
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
  const customerId = req.customerId;
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
      res
        .status(200)
        .json({
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

module.exports = {
  registerCustomer,
  sendOtp,
  verifyOtp,
  loginCustomer,
  customerAddress,
};
