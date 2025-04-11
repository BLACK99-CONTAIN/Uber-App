const captainmodel = require('../models/captainuser.js');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const captainService = require('../services/captain.service');
const { generatetoken } = require('./../jwt');
const blacklisteduser = require('../models/blacklisteduser.js');

module.exports.registercaptainUser = async (req, res, next) => {  
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        console.log("Received Request Body:", req.body);

        const {username,email,password,vehicle}=req.body;
        const {firstname,lastname}=username||{};
        const {color,plate,capacity,vehicleType}=vehicle||{}

        if(!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType){
            console.log("request body:", req.body);
            return res.status(400).json({error:"All fields are required"});
        }
        const isUseralready=await captainmodel.findOne({email});
        if(isUseralready){
            return res.status(400).json({error:"User already exists"});
        }
        console.log("Extracted Values:", {firstname,lastname,email,password,color,plate,capacity,vehicleType});
        const captainuser=await captainmodel.create({
            username:{firstname,lastname},
            email,
            password,
            vehicle:{color,plate,capacity,vehicleType}
        });
        const payload={id:captainuser._id};
        const token=generatetoken(payload);
        res.json({token,captainuser});
    }catch(err){
        console.error("Error in registerUser:", err);
        next(err);
    }
}

module.exports.logincaptainUser=async(req,res,next)=>{
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {email,password}=req.body;
        console.log("Received Request Body:", req.body);

        if(!email || !password){
            return res.status(400).json({error:"All fields are required"});
        }
        const captainuser=await captainmodel.findOne({email});
        if(!captainuser){
            return res.status(400).json({error:"User not found"});
        }
        const isMatch=await bcrypt.compare(password,captainuser.password);
        if(!isMatch){
            return res.status(400).json({error:"Invalid credentials"});
        }
        const payload={id:captainuser._id};
        const token=generatetoken(payload);
        res.json({token,captainuser});
    }catch(err){
        console.error("Error in loginUser:", err);
        next(err);
    }
}

module.exports.getcaptainProfile=async(req,res,next)=>{
    try{
        const error=validationResult(req);
        if(!error.isEmpty){
            return res.status(400).json({Errors:error.array()});
        }
        console.log("Received Request Body:", req.body);
        const captainId=req.user.id;
        if(!captainId){
            return res.status(400).json({error:"Captain id is not found"});
        }
        console.log("captain_id:", captainId);
        const captain=await captainmodel.findById(captainId);
        if(!captain){
            return res.status(404).json({error:"Captain is not found"})
        }
        res.json({captain});
    }catch(err){
        console.error("Error in getcaptainProfile:", err);
        next(err);
    }
}

module.exports.logoutcaptainUser = async (req, res, next) => {
    try {
       
        res.clearCookie("token");
        const token= res.cookies?.token||req.headers.authorization?.split(" ")[1];
        await blacklisteduser.create({token})
    
        res.status(200).json({ message: "Logout successful" });
    }catch(err){
        console.error("Error in userLogout:", err);
        next(err);
    }
}