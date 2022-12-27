const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
    const hashedPass = await bcrypt.hash(req.body.password, 10);

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPass,
    });
    user
        .save()
        .then((user) => {
            res.json({
                message: "User Added Successfuly",
            });
        })
        .catch((error) => {
            res.json({
                message: "An error occured!",
            });
        });
};

const registrationData = (req, res, next) => {
    User.find()
        .then((response) => {
            res.json({ response });
        })
        .catch((err) => {
            res.json({
                message: "Some error occured",
            });
        });
};

// tag1:
// const login = (req, res, next) => {
//     const username = req.body.username;
//     const password = req.body.password;

//     User.findOne({ $or: [{ email: username }, { phone: username }] })
//         .then((user) => {
//             if (user) {
//                 return user;
//             } else {
//                 console.log("user",user);
//                 res.json({
//                     message: "No user found!",
//                 });
//                 return new Error;
//             }
//         })
//         .then((user) => {
//             console.log("++++++",user);
//             return {user,bdr:bcrypt.compare(password, user.password)};
//         })
//         .then((result) => {
//             console.log("fhkajsdfhaksdfla",result.user.name);
//             console.log(result.bdr);
//             if (result.bdr===true) {
//                 let token = jwt.sign({ name: result.user.name }, "Secret_key", {
//                     expiresIn: "1h",
//                 });
//                 return res.json({
//                     message: "login Successful!",
//                     token,
//                 });
//             } else {
//                 console.log("tada");
//                 return res.json({
//                     message: "Password doesn't match",
//                 });
//             }
//         })
//         .catch((err) => {
//             console.log("rewqr",err);
//             return res.json({
//                 error: err,
//             });
//         });
// };

const login = async (req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({ $or: [{ email: username }, { phone: username }] });
    if(user){
        const passwordMatched = await bcrypt.compare(password, user.password);
        console.log("fda",passwordMatched);
        if (passwordMatched) {
            let token = jwt.sign({ name: user.name }, "Secret_key", {
                expiresIn: "1h",
            });
            return res.json({
                message: "login Successful!",
                token,
            });
        } else {
            console.log("tada");
            return res.json({
                message: "Password doesn't match",
            });
        }

    }else{
        console.log("user",user);
        return res.json({
            message: "No user found!",
        });
    }
}

module.exports = {
    register,
    registrationData,
    login
};
