const jwt = require("jsonwebtoken");
otpJWT = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, "otp_key", (err, decoded) => {
      console.log(err);
      if (err) {
        return res.json({
          status: 404,
          message: `Invalid token or unauthorised access`,
        });
      }
      console.log("id in token  : ", decoded.mail);
      req.jwtEmail = decoded.mail;
      next();
    });
  } else {
    res.json({
      status: 303,
      message: "Please provide token",
    });
  }
};

adminLoginJWT = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, "admin_key", (err, decoded) => {
      console.log(err);
      if (err) {
        return res.json({
          status: 404,
          message: `Invalid token or unauthorised access`,
        });
      }
      console.log("id in token  : ", decoded.id);
      req.id = decoded.id;
      next();
    });
  } else {
    res.json({
      status: 303,
      message: "Please provide token",
    });
  }
};

userLoginJWT = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, "customer_key", (err, decoded) => {
      console.log(err);
      if (err) {
        return res.json({
          status: 404,
          message: `Invalid token or unauthorised access`,
        });
      }
      console.log("id in token  : ", decoded.id);
      req.id = decoded.id;
      next();
    });
  } else {
    res.json({
      status: 303,
      message: "Please provide token",
    });
  }
};


merchantLoginJWT = (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      jwt.verify(token, "merchant_key", (err, decoded) => {
        console.log(err);
        if (err) {
          return res.json({
            status: 404,
            message: `Invalid token or unauthorised access`,
          });
        }
        console.log("id in token  : ", decoded.id);
        req.id = decoded.id;
        next();
      });
    } else {
      res.json({
        status: 303,
        message: "Please provide token",
      });
    }
  };
  

setPasswordJWT = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, "setPassword_key", (err, decoded) => {
      console.log(err);
      if (err) {
        return res.json({
          status: 404,
          message: `Invalid token or unauthorised access`,
        });
      }
      console.log("id in token  : ", decoded.email);
      req.merchantEmail = decoded.email;
      next();
    });
  } else {
    res.json({
      status: 303,
      message: "Please provide token",
    });
  }
};

module.exports = {
  otpJWT,
  adminLoginJWT,
  userLoginJWT,
  setPasswordJWT,
  merchantLoginJWT
};
