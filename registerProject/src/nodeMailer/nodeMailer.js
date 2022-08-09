let nodemailer = require("nodemailer");

exports.senOTP= async (genOtp,email)=>{
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