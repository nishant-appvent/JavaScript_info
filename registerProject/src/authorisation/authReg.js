
const jwt = require('jsonwebtoken');
const authorize = {
    authentication:(req,res,next)=>{
        let token = req.headers.authorization;
        if(token){
            token = token.split(" ")[1];
            jwt.verify(token,"secret_reg_key",(err,decoded)=>{
                console.log(err);
                if(err){
                    return res.json({
                        status:404,
                        message:`Invalid token or unauthorised access`
                    })
                }
                console.log(decoded.id,'---------------');
                console.log(decoded,'<--------------->');
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