
const jwt = require('jsonwebtoken');
const authorize = {
    authorization:(req,res,next)=>{
        if(token){
            token = token.split(" ")[1];
            jwt.verify(token,"secret_key",(err,decoded)=>{
                console.log(err);
                if(err){
                    return res.json({
                        status:404,
                        message:`Invalid token or unauthorised access`
                    })
                }
                console.log("id in token  : ", decoded.id)
                req.id = decoded.id;
                next();
            })
        }else{
            res.json({
                status:303,
                message:'Please provide token'
            });
        }
    }
}
module.exports = authorize;