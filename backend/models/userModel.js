const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name : {
        type : String ,
        required : true
    },
    email : {
        type : String ,
        required : true ,
        unique : true
    },
    username : {
        type : String ,
        required : true ,
        unique : true
    },
    password : {
        type : String ,
        required : true
    },
    coursesRated : {
        type : Array ,
        videoID : String ,
        ratingGiven : Number ,
        ratingAddedOn : {
            type : Date ,
            default : Date.now(),
        }
    },
    coursesAdded : {
        type : Array ,
        videoID : String ,
        addedOn : {
            type : Date ,
            default: Date.now()
        }
    },
    dateOfJoining : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model("user",schema);