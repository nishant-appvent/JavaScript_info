const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { cart } = require("../../config/db.config");
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
            res.status(200).json({
              status: true,
              message: "request sent to admin, wait for password setting mail",
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
    } else if (merchantData.status === -1) {
      console.log("merchant blocked");
      return res.status(404).json({ message: "Merchant has been blocked" });
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

addCategory = async (req, res) => {
  const category = req.body.Category;
  try {
    const categoryData = await Categories.findOrCreate({
      where: { Category: category },
    });
    if (categoryData[1]) {
      res
        .status(200)
        .json({ status: true, message: `${category}-Category Added.` });
    } else {
      res.status(201).json({
        status: true,
        message: "No Need to Add Category. Already Exists!!!",
      });
    }
  } catch (err) {
    console.log(">>>>>>>>>>>>>>>Error in adding Category   ", err);
    res.status(400).json({ status: false, message: "Internal Server Error" });
  }
};

addSubCategory = async (req, res) => {
  const subCategory = req.body.SubCategory;
  const categoryId = req.body.CategoryId;
  const toBeInserted = { subCategory: subCategory, CategoryId: categoryId };
  try {
    const subCategoryData = await Subcategories.findOrCreate({
      where: toBeInserted,
    });
    if (subCategoryData[1]) {
      res.status(200).json({ status: true, message: "Sub-Category Added." });
    } else {
      res.status(201).json({
        status: true,
        message: "No Need to Add Sub-Category. Already Exists!!!",
      });
    }
  } catch (err) {
    console.log(">>>>>>>>>>>>>>>Error in adding Sub Category  ", err);
    res.status(400).json({ status: false, message: "Internal Server Error" });
  }
};

addProduct = async (req, res) => {
  let merchantId = req.id;
  const pname = req.body.pname;
  const price = req.body.price;
  const stock = req.body.stock;
  const discount = req.body.discount;
  const discountedPrice = price - (discount * price) / 100;
  const description = req.body.description;
  const categoryId = req.body.categoryId;
  const subCategoryId = req.body.subCategoryId;

  const categoryData = await Categories.findOne({ where: { id: categoryId } });
  if (!categoryData) {
    return res.status(404).json({
      status: false,
      message:
        "Category you entered doesn't exist. First create the category first.",
    });
  }

  const subCategoryData = await Subcategories.findOne({
    where: { id: subCategoryId, CategoryId: categoryId },
  });
  if (!subCategoryData) {
    return res.status(404).json({
      status: false,
      message:
        "Sub-Category you entered doesn't exist. First create the Sub-Category first.",
    });
  }

  const product = {
    pname: pname,
    price: price,
    MerchantId: merchantId,
    CategoryId: categoryId,
    SubCategoryId: subCategoryId,
    discountedPrice: discountedPrice,
    discount: discount,
    description: description,
    stock: stock,
  };
  Products.findOrCreate({
    where: {
      pname: pname,
      CategoryId: categoryId,
      SubCategoryId: subCategoryId,
      MerchantId: merchantId,
    },
    defaults: product,
  })
    .then((productData) => {
      console.log("-----product inserted", productData[1]);
      if (productData[1]) {
        res.status(200).json({
          message: "Product Data Inserted",
          product: productData[0].dataValues,
        });
      } else {
        res.status(200).json({
          message: "Product Already exists Please update product details",
          product: productData[0].dataValues,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: "Product not inserted" });
    });
};

updateProduct = (req, res) => {
  const merchantId = req.id;
  console.log(merchantId);
  const updatedProduct = req.body;
  const productId = updatedProduct.id;
  Products.findOne({ where: { id: productId, MerchantId: merchantId } })
    .then((productData) => {
      if (!productData) {
        return res.status(404).json({ message: "Product not found" });
      }
      const price = updatedProduct.price || productData.price;
      const discount = updatedProduct.discount || productData.discount;
      if (updatedProduct.price || updatedProduct.discount)
        updatedProduct.discountedPrice = price - (price * discount) / 100;
      updatedProduct.price = price;
      updatedProduct.discount = discount;
      Products.update(updatedProduct, { where: { id: productId } })
        .then(() => {
          console.log("Product updated Successfully");
          res.status(200).json({ message: "Product updated Successfully" });
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

deleteProduct = (req, res) => {
  const merchantId = req.id;
  const productId = req.body.id;
  Products.destroy({ where: { id: productId, MerchantId: merchantId } })
    .then(() => {
      console.log("Deleted successfully");
      res.status(200).json({ message: "Product Deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(404)
        .json({ message: "Some error occured in product deletion" });
    });
};

getMerchantProducts = async (req, res) => {
  const limit = 5;
  const page = req.query.page;
  let offset = 0;
  if (page) {
    offset = (page - 1) * limit;
  }
  let merchantId = req.id;
  if (req.id) {
    merchantId = req.id;
  }
  Products.findAll({
    where: {
      merchantId: merchantId,
      status: 1,
    },
    attributes: ["stock", "price", "pname"],
    limit: limit,
    offset: offset,
    include: [
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
  })
    .then((productData) => {
      res.status(200).json({ message: productData });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: "Error in fetching product" });
    });
};

addBulkProducts =async (req, res) => {
  const productArr = [];
  let count = 1;
  for (let i = 1; i < 11; i++) {
    for (let j = 1; j < 4; j++) {
      for (let k = 1; k < 11; k++) {
        const pname = "Product " + String(count);
        const description = "Desc " + String(count);
        const stock = 20;
        const price = parseFloat((0.5 + Math.random()) * 1000).toFixed(2);
        let min = 5;
        let max = 40;
        const discount = Math.floor(Math.random() * (max - min + 1) + min);
        const discountedPrice = (price - (price * discount) / 100).toFixed(2);
        const MerchantId = i;
        const CategoryId = j;
        let SubCategoryId = 0;
        let m = 0;
        let n = 0;
        if (CategoryId == 1) {
          m = 3;
          n = 1;
        } else if (CategoryId == 2) {
          m = 6;
          n = 4;
        } else if (CategoryId == 3) {
          m = 9;
          n = 7;
        }
        SubCategoryId = Math.floor(Math.random() * (m - n + 1) + n);

        const productObj = {
          pname,
          description,
          stock,
          price,
          discount,
          discountedPrice,
          MerchantId,
          CategoryId,
          SubCategoryId,
        };
        productArr.push(productObj);
        count++;
      }
      // console.log(productArr)
    }
  }
  await Products.bulkCreate(productArr);
};


// addBulkCart();

module.exports = {
  merchantReg,
  setPassword,
  merchantLogin,
  addProduct,
  updateProduct,
  deleteProduct,
  getMerchantProducts,
  addCategory,
  addSubCategory,
};
