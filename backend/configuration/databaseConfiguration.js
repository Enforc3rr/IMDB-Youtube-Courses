const mongoose = require("mongoose");

const connect = async ()=>{
    await mongoose.connect(process.env.DB);
}
module.exports= connect;