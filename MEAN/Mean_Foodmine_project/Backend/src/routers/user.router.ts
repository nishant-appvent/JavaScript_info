import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from 'bcryptjs';

const router = Router();

router.get("/seed", async (req, res) => {
    const foodsCount = await UserModel.countDocuments();
    if (foodsCount > 0) {
      return res.send("Seed is already done!");
    }
    await UserModel.create(sample_users);
    res.send("Seed is Done");
  });


router.post("/login",async (req,res)=>{
    const body = req.body;
    const {email, password} = req.body;
    const user = await UserModel.findOne({email,password});

    if(user){
        res.send(generateTokenResponse(user));
    }else{
        res.status(HTTP_BAD_REQUEST).send("User name or password is not valid!");
    }

    
})

router.post('/register', async (req,res)=>{
    const {name,email,password, address} = req.body;
    const user = await UserModel.findOne({email:email.toLowerCase()});
    if(user){
        return res.status(HTTP_BAD_REQUEST).send("User already exists, please login");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
        id:'',
        name,
        email:email.toLowerCase(),
        password:encryptedPassword,
        address,
        isAdmin:false
    }

    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenResponse(dbUser));
     

})


const generateTokenResponse = (user:any)=>{
    const token = jwt.sign({
        id:user.id, email:user.email,isAdmin:user.isAdmin},process.env.JWT_SECRET!,{
        expiresIn:"30d"
    });
    user = user.toObject();
    user.token = token;
    return user;
}

export default router;
