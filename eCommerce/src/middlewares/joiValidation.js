
const Joi = require("joi");


const validationSendOtp =(req, res, next)=>{
    const schema = Joi.object().keys({
        email:Joi.string().required().email({
            minDomainSegments:2,
            tlds:{allow: ["com", "net", "in", "co"],}
        }).trim(true).required()
    })
    const {error} = schema.validate(req.body ,{abortEarly: false});
    if(error){
        res.status(200).json(error.message);
        console.log(error);
    }
    else{
        next();
    }
}


const validationVerifyOtp =(req, res, next)=>{
    const schema = Joi.object().keys({
        email:Joi.string().required().email({
            minDomainSegments:2,
            tlds:{allow: ["com", "net", "in", "co"],}
        }).trim(true).required(),
        otp:  Joi.string().pattern(new RegExp("^([0-9]{4})$")).required(),
        
    })
    const {error} = schema.validate(req.body ,{abortEarly: false});
    if(error){
        res.status(200).json(error.message);
        console.log(error);
    }
    else{
        next();
    }
}


const validationOrderProducts = (req , res ,next)=>{
    const schema = Joi.object().keys({
        addressId: Joi.number().min(1).required()
    })
    const {error} = schema.validate(req.body ,{abortEarly: false});
    if(error){
        res.status(200).json({error:error.message});
        console.log(error);
    }
    else{
        console.log("next");
        next();
    }
}

const validationAddtoCart = (req , res ,next)=>{
    const schema = Joi.object().keys({
        productId: Joi.number().min(1).required(),
        quantity:Joi.number().min(1).required()
    })
    const {error} = schema.validate(req.body ,{abortEarly: false});
    if(error){
        res.status(200).json({error:error.message});
        console.log(error);
    }
    else{
        console.log("next");
        next();
    }
}

const loginValidation = (req, res,next)=>{
    const schema = Joi.object().keys({
        email:Joi.string().required().email({
            minDomainSegments:2,
            tlds:{allow:["com","in"]}
        }),
        password: Joi.string().min(8).max(20).required(),
    })
    const {error} = schema.validate(req.body ,{abortEarly: false});
    if(error){
        res.status(200).json(error.message);
    }
    else{
        console.log("next");
        next();
    }
}


const customerRegValidation = (req, res,next)=>{
    const schema = Joi.object().keys({
        email:Joi.string().required().email({
            minDomainSegments:2,
            tlds:{allow:["com","in"]}
        }),
        name:Joi.string().min(3).max(50).required(),
        phone:  Joi.string().pattern(new RegExp("^([7-9][0-9]{9,12})$")).required(),
        password: Joi.string().min(8).max(20).required(),
    })
    const {error} = schema.validate(req.body ,{abortEarly: false});
    if(error){
        res.status(200).json(error.message);
    }
    else{
        console.log("next");
        next();
    }
}


const addressValidation = (req, res,next)=>{
    const schema = Joi.object().keys({
        
        locality:Joi.string().min(3).max(100).required(),
        city:Joi.string().min(3).max(50).required(),
        state:Joi.string().min(3).max(50).required(),
        zipcode: Joi.string().pattern(new RegExp("^^([1-4][0-9]{5,6})$")).required(),
    })
    const {error} = schema.validate(req.body ,{abortEarly: false});
    if(error){
        res.status(200).json(error.message);
    }
    else{
        console.log("next");
        next();
    }
}


module.exports ={validationSendOtp,validationVerifyOtp,validationOrderProducts,validationAddtoCart,loginValidation,customerRegValidation,addressValidation}