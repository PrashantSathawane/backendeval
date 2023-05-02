const express = require("express");
const { UserModel } = require("../model/User.model");
var  jwt  = require("jsonwebtoken");
const userRouter = express.Router();
const bcrypt=require("bcrypt")

userRouter.post("/register",(req,res)=>{
    const {name,email,gender,password}=req.body;
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            const user= new UserModel({name,email,gender,password:hash})
            await user.save()
            res.status(200).send({"msg":"New user has been added"})
        })

    }catch(err){
        res.status(200).send({"err":err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user= await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    token=jwt.sign({deviceID:user._id }, 'device');
                    res.status(200).send({"msg":"Login successful","token":token})
                }
                else{
                    res.status(200).send({"msg":"Wrong Credintials!!!"})
                }
            })
        }
        else{
            res.status(200).send({"msg":"Please Signup!!"})
        }
    }catch(err){
        res.status(200).send({"msg":"Wrong Credintials!!!"})
    }

})

module.exports={
  userRouter
}