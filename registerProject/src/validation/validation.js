const Joi = require("joi");
const validationS1 =(req, res, next)=>{
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
module.exports = validationS1;