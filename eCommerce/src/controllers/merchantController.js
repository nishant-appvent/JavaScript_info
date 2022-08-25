const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbConn = require("../../config/db.config");
const Merchants = dbConn.merchants;
const Categories = dbConn.category;
const Subcategories = dbConn.subCategory;
const Products = dbConn.product;

merchantReg = async (req, res) => {
  console.log("-----------");
  console.log(req.body);
  const email = req.body.email;
  Merchants.findOne({ where: { email: email } })
    .then((checkMerchant) => {
      if (checkMerchant) {
        console.log(checkMerchant.dataValues);
        res.status(404).json({ message: "Merchant Email already exist" });
      } else {
        Merchants.create(Merchant)
          .then((merchantData) => {
            console.log(merchantData.dataValues);
            res
              .status(200)
              .json({
                status: true,
                message:
                  "request sent to admin, wait for password setting mail",
                merchantData: merchantData.dataValues,
              });
          })
          .catch((err) => {
            console.log(
              "Error in inserting merchant registration details " + err
            );
          });
      }
    })
    .catch((err) => {
      console.log("Error -->" + err);
    });
  console.log("-----------");
  const Merchant = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    gstNo: req.body.gstNo,
    status: 0,
    address: req.body.address,
  };
};

setPassword = async (req, res) => {
  const tokenMail = req.merchantEmail;

  const salt = bcrypt.genSaltSync(10);
  const bycryptedPassword = bcrypt.hashSync(req.body.password, salt);
  Merchants.update(
    { password: bycryptedPassword },
    { where: { email: tokenMail } }
  )
    .then(() => {
      console.log("password set successfully");
      res
        .status(200)
        .json({ status: true, message: "Password set successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ status: false, message: "Some error occured" });
    });
};

merchantLogin = async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  Merchants.findOne({ where: { email: email } }).then((merchantData) => {
    if (!merchantData) {
      return res.status(200).json({ message: "Merchant not registered" });
    } else if (!merchantData.password) {
      return res
        .status(404)
        .json({ message: "Merchant verification not complete" });
    }
    else if(merchantData.status===-1){
      console.log("merchant blocked")
      return res.status(404).json({message:"Merchant has been blocked"})
    }

    bcrypt.compare(password, merchantData.password, (err, check) => {
      if (check) {
        console.log("Password matched");
        const token = jwt.sign({ id: merchantData.id }, "merchant_key");
        delete merchantData.password;
        res.json({
          status: true,
          message: "Login successful",
          yourData: merchantData,
          token: token,
        });
      } else {
        console.log("Password not matched");
        res.json({ status: false, message: "Login failed" });
      }
    });
  });
  // console.log(loginRes)
};

addProduct = (req, res) => {
  const category = req.body.category;
  const subCategory = req.body.subCategory;
  const pname = req.body.pname;
  const price = req.body.price;
  let merchantId = 13;
  if (req.merchantId) {
    merchantId = req.merchantId;
  }
  Categories.findOrCreate({ where: { Category: category } })
    .then((categoryData) => {
      const categoryId = categoryData[0].id;
      console.log(categoryId);
      // console.log(categoryData);
      Subcategories.findOrCreate({
        where: { subCategory: subCategory, CategoryId: categoryId },
      })
        .then((subCategoryData) => {
          const subCategoryId = subCategoryData[0].id;
          console.log(subCategoryId);
          const product = {
            pname: pname,
            price: price,
            MerchantId: merchantId,
            CategoryId: categoryId,
            SubCategoryId: subCategoryId,
          };
          Products.findOrCreate({ where: product })
            .then((productData) => {
              console.log("-----product inserted");
              res
                .status(200)
                .json({
                  message: "Product Data Inserted",
                  product: productData[0].dataValues,
                });
            })
            .catch((err) => {
              console.log(err);
              res.status(404).json({ message: "Product not inserted" });
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({ message: "Error in inserting subcategory" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: "Error in inserting category" });
    });
};

updateProduct = (req, res) => {
  const productId = req.body.productId;
  let stock = req.body.stock;
  const price = req.body.price;
  Products.findOne({ where: { id: productId } })
    .then((productData) => {
      stock += productData.stock;
      Products.update(
        { stock: stock, price: price },
        { where: { id: productId } }
      )
        .then(() => {
          console.log("Stock and Price updated Successfully");
          res.status(200).json({message:"Stock and Price updated Successfully"});
        })
        .catch((err) => {
          console.log("error------> " + err);
          res
            .status(404)
            .json({ message: "Error while updating stock and price" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: "Error in finding product" });
    });
};


deleteProduct = (req,res)=>{
  const productId = req.query.id;
  Products.update({status:0},{where:{id:productId}}).then(()=>{
    console.log("Deleted successfully");
    res.status(200).json({message:"Product Deleted"});
  }).catch((err)=>{
    console.log(err);
    res.status(404).json({message:"Some error occured in product deletion"})
  })
}

module.exports = {
  merchantReg,
  setPassword,
  merchantLogin,
  addProduct,
  updateProduct,
  deleteProduct,
};
