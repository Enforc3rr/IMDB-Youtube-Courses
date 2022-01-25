const mongoose = require("mongoose");
/*
{
    "videoURL",
    "videoCategory",
    "videoTopic",
    "videoDescription",
    "videoLanguage",
    "videoRating":5
}

 */
const schema = new mongoose.Schema({
    videoID : {
        type : String ,
        unique : true ,
        required : true
    },
    videoURL : String ,
    videoTitle : {
        type : String ,
        required : true
    },
    videoUploadedBy : {
        type : String ,
        required : true
    } ,
    videoUploadedAt : Date,
    videoThumbnailURL : String ,
    videoCategory : {
        type : String ,
        required : true
    },
    videoTopic : {
        type : String ,
        required : true ,
    },
    videoAddedToWebAppBy : {
        type : String ,
        required : true
    },
    videoDescription : String ,
    videoLanguage : String ,
    videoRating: {
        type : Number ,
        default : 0 ,
        max : 5
    },
    ratingsReceived : {
      type : Array ,
      ratingReceivedBy : {
          type : String ,
          required : true
      },
      ratingValue : {
          type : Number ,
          required : true ,
          max : 5
      }
    },
    videoAddedToWebApp : String
});
module.exports = mongoose.model("videoDetails",schema);