const e = require("express");
const jwt = require("jsonwebtoken");
// const { response } = require("express");
const dbConn = require("../../config/db.config");
const nodeMailer = require("../nodeMailer/nodeMailer");


let OTP = function generateOtp() {
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

var UserModel = function () {};

UserModel.registerUser = (regData, result) => {
  dbConn.query(
    "SELECT email,phone FROM USERDATA where email=? or phone=?",
    [regData.email, regData.phone],
    (err, res) => {
      console.log("-----------------", res);
      if (res.length === 0) {
        dbConn.query(
          " INSERT INTO USERDATA SET ?,step=1 ",
          regData,
          (err, res) => {
            if (err) {
              console.log("Error while inserting data");
              result(null, err);
            } else {
              console.log("User added successfully");
              result(null, res);
            }
          }
        );
      } else {
        let alreadyExistMes = "";
        if (res[0].email === regData.email)
          alreadyExistMes = "Email Already Exists";
        else if (res[0].phone === regData.phone)
          alreadyExistMes = "Phone Already Exists";
        console.log(alreadyExistMes, "==========");
        res[0].message = alreadyExistMes;
        console.log(res);
        result(null, res);
      }
    }
  );
};

UserModel.loginUser = (loginData, result) => {
  let emailorPhone = loginData.email;
  dbConn.query(
    "SELECT * FROM USERDATA where email=? or phone=?",
    [emailorPhone, emailorPhone],
    (err, res) => {
      console.log(res);
      if (res.length === 0) {
        result(null, "Not Found");
      } else {
        const loginRes = res[0];
        if (err) {
          result(null, err);
        } else {
          result(null, loginRes);
        }
      }
    }
  );
};

UserModel.personalDet = (id, personalDetails, result) => {
  console.log(personalDetails);
  dbConn.query(
    "UPDATE USERDATA SET NAME=?,AGE=?,gender=?,step=2 WHERE id=?",
    [personalDetails.name, personalDetails.age, personalDetails.gender, id],
    (err, res) => {
      if (err) {
        console.log("Error While inserting data");
        result(null, err);
      } else {
        console.log("Personal details filled successfully");
        dbConn.query(
          "SELECT * FROM USERDATA where id=?",
          id,
          (err, response) => {
            if (err) {
              console.log("Error While Selecting data");
              result(null, err);
            } else {
              console.log("Details fetched successfully.");
              result(null, response);
            }
          }
        );
      }
    }
  );
};

UserModel.addressDet = (id, addressDetails) => {
  console.log(addressDetails);
  let addressStr = "";
  for (let i in addressDetails) {
    addressStr += addressDetails[i] + " | ";
  }
  return new Promise((resolve, reject) => {
    dbConn.query(
      "UPDATE USERDATA SET address=?, step=3 WHERE id=?",
      [addressStr, id],
      (err, res) => {
        if (err) {
          console.log("Error While inserting address");
          reject(err);
        } else {
          console.log("Address filled successfully");
          dbConn.query(
            "SELECT * FROM USERDATA where id=?",
            id,
            (err, response) => {
              if (err) {
                console.log("Error While fetching address");
                reject(err);
              } else {
                console.log("Details fetched successfully.");
                resolve(response);
              }
            }
          );
        }
      }
    );
  });
};

UserModel.degreeDet = (id, degreeDetails) => {
  console.log(degreeDetails);
  return new Promise((resolve, reject) => {
    dbConn.query(
      "SELECT id FROM degreeoptions where degree=?",
      [degreeDetails.degree],
      (err, response) => {
        console.log("response----->", response[0], "----", response[0].id);
        if (err) {
          console.log("Error while matching degree");
          reject(err);
        } else {
          dbConn.query(
            "UPDATE USERDATA SET degree=?,step=0 WHERE id=?",
            [response[0].id, id],
            (err, res) => {
              if (err) {
                console.log("Error While inserting degree details");
                reject(err);
              } else {
                dbConn.query(
                  "SELECT * FROM USERDATA where id = ?",
                  id,
                  (err, finalres) => {
                    if (err) {
                      console.log("error while fetching details.");
                      reject(err);
                    } else {
                      console.log("Degree details filled successfully");
                      resolve(finalres);
                    }
                  }
                );
                // console.log(res);
              }
            }
          );
        }
      }
    );
  });
};

UserModel.getUser = (userId, result) => {
  dbConn.query(
    "SELECT step,email,phone,name,age,gender,address,degree,year FROM USERDATA where id=?",
    userId,
    (err, res) => {
      if (err) {
        console.log("Error while fetching User's data", err);
        result(null, err);
      } else {
        console.log("User data fetched successfully");
        result(null, res);
      }
    }
  );
};

UserModel.getAllUsers = (adminId) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      "SELECT usertype FROM USERDATA where id=?",
      adminId,
      (err, response) => {
        if (err) {
          console.log("Error while fetching admin id");
          reject(err);
        } else {
          if (response[0].usertype == "Admin") {
            dbConn.query(
              "SELECT * FROM USERDATA where id!=?",
              adminId,
              (err, finalres) => {
                console.log("inside query", finalres);
                if (err) {
                  console.log("error while fetching details.");
                  reject(err);
                } else {
                  console.log("All details fetched successfully");
                  resolve(finalres);
                }
              }
            );
          } else {
            resolve("NotAdmin");
          }
        }
      }
    );
  });
};

UserModel.saveOtp = (passedEmail) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      "SELECT step FROM USERDATA where email=?",
      passedEmail.email,
      (err, response) => {
        if (err) {
          console.log(err);
          console.log("Error while fetching data");
          reject(err);
        } else {
          // console.log(response);
          if (response[0].step !== 0) {
            let message = "Provide your all details to generate otp";
            console.log("Provide your all details to generate otp");
            resolve(message);
          } else {
            let genOTP = OTP();
            resolve(genOTP);
            nodeMailer.senOTP(genOTP,passedEmail.email);
            const token = jwt.sign({otp:genOTP},"OTP_key",
            {expiresIn:"120s"});
            dbConn.query(
              "UPDATE USERDATA SET otp=? where email=?",
              [token, passedEmail.email],
              (err, finalRes) => {
                if (err) {
                  console.log(err);
                  console.log("Error saving otp");
                  reject(err);
                } else {
                  console.log("Email sent");
                  resolve("Sent successfully");
                }
              }
            );
          }
        }
      }
    );
  });
};

UserModel.verifyOtp = (userId, receivedOtp) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      "SELECT otp FROM USERDATA where id=?",
      userId,
      (err, response) => {
        if (err) {
          console.log("Error while fetching data");
          reject(err);
        } else {
          let token = response[0].otp;
          try{
          jwt.verify(token,"OTP_key",(err,decoded)=>{
            console.log(err);
            if(err){
              console.log("Error in decoding token");
              resolve(err);
            }
            else{
            console.log(receivedOtp);
            console.log("otp in token  : ", decoded.otp)
            if( receivedOtp!==decoded.otp){
              let message = "Wrong Otp";
              console.log("Wrong Otp");
              resolve(message);
            }
            else{
              console.log("Verfied sent");
              resolve("otp Verified");          
              }
            
          }
        })
      }catch(err){
        console
        resolve()
      }
      }
    })})}
          // console.log("_______----",response[0].otp);
          // console.log("_______----",receivedOtp.otp);
          // if (response[0].otp !== receivedOtp.otp) {
          //   let message = "Wrong Otp";
          //   console.log("Wrong Otp");
          //   resolve(message);
          // } else {
          //   dbConn.query(
          //     "UPDATE USERDATA SET status=1,otp=-1 where id=?",
          //     [userId],
          //     (err, finalRes) => {
          //       if (err) {
          //         console.log("Error changin status");
          //         reject(err);
          //       } else {
          //         console.log("Verfied sent");
          //         resolve("otp Verified");
          //       }
          // })
  

module.exports = UserModel;
