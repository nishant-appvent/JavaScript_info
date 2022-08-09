const Joi = require("joi");
const validationReg =(req, res, next)=>{
    const schema = Joi.object().keys({
        email:Joi.string().required().email({
            minDomainSegments:2,
            tlds:{allow:["com","in"]}
        }),
        password: Joi.string().required(),
        phone:Joi.number().required()
    })
    const {error} = schema.validate(req.body ,{abortEarly: false});
    if(error){
        res.status(200).json(error.message);
        console.log(error);
    }
    else{
        console.log("next");
        next();
    }
}


const validationPer =(req,res,next)=>{
    const schema = Joi.object().keys({
        name:Joi.string().required(),
        age: Joi.number().greater(0).less(150).required(),
        gender:Joi.string().required().valid('male','female','Female','Male','M','F')
    })
    const {error} = schema.validate(req.body ,{abortEarly: false});
    if(error){
        res.status(200).json(error.message);
        console.log(error);
    }
    else{
        console.log("validation successful");
        next();
    }
}
const validationAddress =(req,res,next)=>{
    const schema = Joi.object().keys({
        city:Joi.string().required(),
        state: Joi.string().required(),
        country:Joi.string().required()
    })
    const {error} = schema.validate(req.body ,{abortEarly: false});
    if(error){
        res.status(200).json(error.message);
        console.log(error);
    }
    else{
        console.log("validation successful");
        next();
    }
}
const validationDegree =(req,res,next)=>{
    const schema = Joi.object().keys({
        degree:Joi.string().required()
    })
    const {error} = schema.validate(req.body ,{abortEarly: false});
    if(error){
        res.status(200).json(error.message);
        console.log(error);
    }
    else{
        console.log("validation successful");
        next();
    }
}
module.exports = {validationReg,
    validationAddress,validationDegree,validationPer};

