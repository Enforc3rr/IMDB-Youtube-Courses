const jwt = require("jsonwebtoken");

exports.verifyJWT = async (req,res,next)=>{
    const token = req.header("Authorization");
    if(!token){
        return res.status(400).json({
            errorCode : "JWT_NOT_FOUND",
            message : "JWT was not present in header"
        });
    }
    if(!token.startsWith("Bearer ")){
        return res.status(401).json({
           errorCode : "JWT_FORMAT_ERROR",
           message : "JWT has not been passed with proper format in header"
        });
    }
    try{
        req.user = jwt.verify(token.substring(7,token.length) , process.env.JWT_KEY).userID;
        next();
    }catch (e) {
        return res.status(401).json({
            errorCode : "INVALID_TOKEN",
            message : "Passed in JWT is invalid"
        });
    }
}