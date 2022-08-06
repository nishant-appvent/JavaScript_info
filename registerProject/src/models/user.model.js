const dbConn = require("../../config/db.config");

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
    "SELECT id,email,phone,password FROM USERDATA where email=? or phone=?",
    [emailorPhone, emailorPhone],
    (err, res) => {      // console.log(res);
      // console.log(res[0].email);
      // console.log(res[0].phone);
      // console.log(regData.email);
      // console.log(regData.phone);

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
        result(null, res);
      }
    }
  );
};

UserModel.addressDet = (id, addressDetails, result) => {
  console.log(addressDetails);
  let addressStr = "";
  for (let i in addressDetails) {
    addressStr += addressDetails[i] + " | ";
  }
  dbConn.query(
    "UPDATE USERDATA SET address=?, step=3 WHERE id=?",
    [addressStr, id],
    (err, res) => {
      if (err) {
        console.log("Error While inserting address");
        result(null, err);
      } else {
        console.log("Address filled successfully");
        result(null, res);
      }
    }
  );
};

UserModel.degreeDet = (id, degreeDetails, result) => {
  console.log(degreeDetails);
  dbConn.query(
    "UPDATE USERDATA SET degree=?,year=?,step=0 WHERE id=?",
    [degreeDetails.degree, degreeDetails.year, id],
    (err, res) => {
      if (err) {
        console.log("Error While inserting degree details");
        result(null, err);
      } else {
        console.log("Degree details filled successfully");
        result(null, res);
      }
    }
  );
};

UserModel.getUser = (userId,result) => {
  dbConn.query("SELECT step,email,phone,name,age,gender,address,degree,year FROM USERDATA where id=?",userId, (err, res) => {
    if (err) {
      console.log("Error while fetching User's data", err);
      result(null, err);
    } else {
      console.log("User data fetched successfully");
      result(null, res);
    }
  });
};

module.exports = UserModel;
