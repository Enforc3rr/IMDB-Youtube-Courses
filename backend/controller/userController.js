const userDatabase = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.userSignup = async (req,res)=>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const userDataToBeSaved = {
        name : req.body.name ,
        email : req.body.email ,
        username : req.body.username ,
        password : hashedPassword
    };
    try{
        await userDatabase.create(userDataToBeSaved);
        return res.status(201).json({
            userDataAdded : true ,
            errorCode : null ,
            message : "User has been successfully added to the web app"
        });
    }catch (e) {
        return res.status(400).json({
           userDataAdded : false ,
           errorCode : "DUPLICATE" , // will change it later to something more specific ,
           message : "Email or username already present"
        });
    }
}

exports.userLogin = async (req,res)=>{
    const user = await userDatabase.findOne({username : req.body.username});
    if(!user){
        return res.status(400).json({
           userLoggedIn : false ,
           errorCode : "NOT_FOUND" ,
           message : "user with such username does not exist"
        });
    }
    const validatePassword = await bcrypt.compare(req.body.password , user.password);
    if(!validatePassword){
        return res.status(400).json({
            userLoggedIn : false ,
            errorCode : "WRONG_PASSWORD",
            message : "user's entered password was wrong"
        });
    }
    const token = await jwt.sign({
        userID : user._id
    },process.env.JWT_KEY , {
        expiresIn : "48h"
    });
    return res.status(200).header({
        "Authorization" : token
    }).json({
        userLoggedIn : true ,
        errorCode : null ,
        message : "User Logged In Successfully"
    });
}