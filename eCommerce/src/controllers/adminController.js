// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const dbConn = require("../../config/db.config") 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Admins = dbConn.admins
const Merchants = dbConn.merchants
const Customers = dbConn.customers
const Products = dbConn.product


let nodemailer = require("nodemailer");
const { category } = require("../../config/db.config");

mailToken= async (token,email)=>{
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
    text: `token for verification : ${token}`,
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


loginAdmin=(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    // console.log(password)
    Admins.findOne({where:{email:email}}).then((adminDet)=>{
        if(!adminDet){
            return res.status(200).json({status:false,message:"This email is not registered"})  
        }
        // console.log(adminDet.password);
        bcrypt.compare(password,adminDet.password,(err,check)=>{
            if(check){
                console.log("Password matched");
                const token = jwt.sign({id:adminDet.id},"admin_key");
                delete adminDet.password;
                res.json({status:true,message:"Login successful",yourData:adminDet,token:token})
            }
            else{
                console.log("Password not matched")
                res.json({status:false,message:"Login failed"})
            }
        })
    })
    // console.log(loginRes)
    

}

showAllMerchant = (req,res)=>{
    const limit = 5;
    const page = req.query.page;
    let offset = 0;
    if(page) {
    offset = (page-1)*limit;}
    Merchants.findAll({limit:limit,offset:offset}).then((merchantData)=>{
        if(merchantData){
            console.log(merchantData);
            res.status(200).json({status:"true",merchantData:merchantData});
    }else{
        res.status(200).json({message:"No merchant registered"})
    }
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({status:"false",message:"Internal Server Error occured"})
    })

}

showAllCustomers = (req,res)=>{
    const limit = 3;
    const page = req.query.page;
    let offset = 0;
    if(page) {
    offset = (page-1)*limit;}
    Customers.findAll({limit:limit,offset:offset}).then((merchantData)=>{
        if(merchantData){
            console.log(merchantData);
            res.status(200).json({status:"true",merchantData:merchantData});
    }else{
        res.status(200).json({message:"No merchant registered"})
    }
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({status:"false",message:"Internal Server Error occured"})
    })

}


verifyMerchant = async( req, res)=>{

        let merchantEmail = req.body.email;
        console.log("_______________")
        Merchants.findOne({where:{email:merchantEmail}}).then((merchantData)=>{     
                let token =  jwt.sign({email:merchantEmail},"setPassword_key")
                console.log(jwt.verify(token,"setPassword_key"));
                console.log("-----------")
                mailToken(token,merchantEmail);
                console.log("---------|||||||")
                Merchants.update({status:1},{where:{email:merchantEmail}}).then(()=>{
                console.log("mail sent");
                res.status(200).json({status:true,message:"Mail sent to merchant",token:token});
            }).catch((err)=>{
                console.log(err);
                res.status(500).json({status:false,message:"Error in updating status of merchant"})
            })
                
            
        }).catch((err)=>{
            console.log(err);
            res.status(500).json({status:false,message:"Internal Server Error"})
        })
}

blockMerchant = (req,res)=>{
    const id = req.body.id;
    console.log(id);
    Merchants.findOne({where:{id:id}}).then((merchantData)=>{
        if(merchantData.status===1){
            Merchants.update({status:-1},{where:{id:id}}).then(()=>{
                res.status(200).json({message:"Merchant Blocked"})
            }).catch((err)=>{
                console.log(err);
                res.status(404).json({message:"Error in changing status"});
            })
        }
        else if (merchantData.status===-1){
            Merchants.update({status:1},{where:{id:id}}).then(()=>{
                res.status(200).json({message:"Merchant unblocked"})
            }).catch((err)=>{
                console.log(err);
                res.status(404).json({message:"Error in changing status"});
            })
        }

        else if (merchantData.status===0){
            res.status(200).json({message:"Merchant isn't verified"})
        }
        else{
            throw err;
        }
    }).catch((err)=>{
        console.log(err);
        res.status(400).json({message:"Error in fetching merchant"})
    })
}


blockCustomer = (req,res)=>{
    const id = req.body.id;
    Customers.findOne({where:{id:id}}).then((customerData)=>{
        if(customerData.status===1){
            Customers.update({status:-1},{where:{id:id}}).then(()=>{
                res.status(200).json({message:"Customer Blocked"})
            }).catch((err)=>{
                console.log(err);
                res.status(404).json({message:"Error in changing status"});
            })
        }
        else if (customerData.status===-1){
            Customers.update({status:1},{where:{id:id}}).then(()=>{
                res.status(200).json({message:"Customer unblocked"})
            }).catch((err)=>{
                console.log(err);
                res.status(404).json({message:"Error in changing status"});
            })
        }
        else{
            throw err;
        }

    }).catch((err)=>{
        console.log(err);
        res.status(400).json({message:"Error in fetching customer"})
    })
}


blockProduct = (req,res)=>{
    const id = req.body.id;
    Products.findOne({where:{id:id}}).then((customerData)=>{
        if(customerData.status===1){
            Products.update({status:-1},{where:{id:id}}).then(()=>{
                res.status(200).json({message:"Product Blocked"})
            }).catch((err)=>{
                console.log(err);
                res.status(404).json({message:"Error in changing status"});
            })
        }
        else if (customerData.status===-1){
            Products.update({status:1},{where:{id:id}}).then(()=>{
                res.status(200).json({message:"Product unblocked"})
            }).catch((err)=>{
                console.log(err);
                res.status(404).json({message:"Error in changing status"});
            })
        }
        else if(customerData.status===0){
            res.status(404).json({message:"Product already been deleted"})
        }
        else{
            throw Error
        }

    }).catch((err)=>{
        console.log(err);
        res.status(400).json({message:"Some error ocurred"})
    })
}


module.exports = {
    loginAdmin,
    showAllMerchant,
    showAllCustomers,
    verifyMerchant,
    blockMerchant,
    blockCustomer,
    blockProduct
}