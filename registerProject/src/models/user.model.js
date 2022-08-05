const dbConn = require("../../config/db.config");

var UserModel = function () {};

UserModel.registerUser = (regData, result) => {
  dbConn.query(
    "SELECT email FROM USERDATA where email=?",
    [regData.email],
    (err, res) => {
      console.log("-----------------", res);
      if (res.length === 0) {
        dbConn.query(" INSERT INTO USERDATA SET ? ", regData, (err, res) => {
          if (err) {
            console.log("Error while inserting data");
            result(null, err);
          } else {
            console.log("User added successfully");
            result(null, res);
          }
        });
      } else {
        console.log("User already exists");
        result(null, res);
      }
    }
  );
};

UserModel.loginUser = (loginData, result) => {
  let emailOrPhone = null;
  if (loginData.email) emailOrPhone = { email: loginData.email };
  else if (loginData.phone) emailOrPhone = { phone: loginData.phone };
  dbConn.query(
    "SELECT email,phone,password FROM USERDATA where ?",
    emailOrPhone,
    (err, res) => {
      console.log(res);
      if (res.length === 0) {
        result(null, "Not Found");
      } else {
        const dbPassword = res[0].password;
        if (err) {
          result(null, err);
        } else {
          result(null, dbPassword);
        }
      }
    }
  );
};

UserModel.personalDet = (id, personalDetails, result) => {
  console.log(personalDetails);
  dbConn.query(
    "UPDATE USERDATA SET NAME=?,AGE=?,gender=? WHERE id=?",
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
  for(let i in addressDetails){
    addressStr+= " | " + i;
  }
  dbConn.query(
    "UPDATE USERDATA SET address=?, WHERE id=?",
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
    "UPDATE USERDATA SET degree=?,year=? WHERE id=?",
    [degreeDetails.degree,degreeDetails.year, id],
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

module.exports = UserModel;
