const User=require("../models/authModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {registerValidation}=require("../validation/authValidation")
//register
const register=async(req,res)=>{
    const data=req.body;
    const{email,password}=data;
   const{error}=registerValidation.validate({email,password})
   if (error) {
       return res.status(400).send({ message: error.message });
   }
    try {
        const hashPassword=await bcrypt.hash(password,10);
        const savedData=await User.create({email,password:hashPassword})
        res.status(201).send({message:"Successfully saved Data:",savedData})
    } catch (error) {
        console.log("error:",error);
        res.status(500).send({message:"Internal server Error:",error})
    }
}

//login
const login=async(req,res)=>{
    const data=req.body;
    const{email,password}=data;
    try {
      const existUser=await User.findOne({email})
      if(!existUser){
        res.status(401).send({message:"Invalid user"})
      }
       const matchedPass= await bcrypt.compare(password,existUser.password);
       if(!matchedPass){
        res.status(401).send({message:"Invalid user credential"})
       }
       const token=jwt.sign({email:email},process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
       res.setHeader("auth",token)
       res.status(200).send({message:"successfully Login:"})
    } catch (error) {
        console.log("error:",error);
        res.status(500).send({message:"Internal Server Error:",error})
    }
}

module.exports={register,login}