const videoDatabase = require("../models/videoModel");
const userDatabase = require("../models/userModel");
const moment = require("moment");
const axios = require("axios");
const videoAdditionDate = `${moment().format("DD/MM/YYYY").split("/")[0]}-${moment().format("DD/MM/YYYY").split("/")[1]}-${moment().format("DD/MM/YYYY").split("/")[2]}`;

function youtube_parser(url){
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}
exports.addVideo = async (req,res)=>{
    const videoID = youtube_parser(req.body.videoURL) ;
    const youtubeAPIResponse = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoID}&key=${process.env.YOUTUBE_KEY}`);

    const video = {
        videoID ,
        videoURL : `https://www.youtube.com/watch?v=${videoID}` ,
        videoTitle : youtubeAPIResponse.data.items[0].snippet.title,
        videoUploadedBy : youtubeAPIResponse.data.items[0].snippet.channelTitle ,
        videoUploadedAt : youtubeAPIResponse.data.items[0].snippet.publishedAt,
        videoThumbnailURL : `https://img.youtube.com/vi/${videoID}/0.jpg`,
        videoCategory : req.body.videoCategory.toLowerCase() ,
        videoTopic : req.body.videoTopic.toLowerCase() ,
        videoDescription : req.body.videoDescription ,
        videoLanguage : req.body.videoLanguage.toLowerCase() ,
        videoAddedToWebAppBy : req.body.videoAddedToWebAppBy,
        videoAddedToWebApp : videoAdditionDate
    }
    try{
        const user = await userDatabase.findById(req.user);
        const data = {
            videoID , addedOn : Date.now()
        }
        user.coursesAdded.push(data);
        await userDatabase.findOneAndUpdate({_id: req.user},user);
        await videoDatabase.create(video);
    }catch (e){
        console.log(e);
        return res.status(400).json({
            videoDataAdded : false ,
            errorCode : "duplication",
            message : "Video Couldn't be added as there was already a same videoURL present"
        });
    }
    return res.status(201).json({
        videoDataAdded : true ,
        errorCode : null ,
        message : "Video Data added successfully"
    });
}
exports.changeRatings= async (req,res)=>{
    const videoRatingToBeChanged = await videoDatabase.findOne({videoID : req.body.videoID});
    const userChangingRatingDetail = {
        ratingsReceivedBy : req.body.ratingsReceivedBy,
        ratingValue : req.body.ratingValue
    }

    videoRatingToBeChanged.ratingsReceived.push(userChangingRatingDetail);
    let rating = 0;
    videoRatingToBeChanged.ratingsReceived.forEach(data=>{
        rating = rating + data.ratingValue ;
    });
    videoRatingToBeChanged.videoRating = rating/videoRatingToBeChanged.ratingsReceived.length;
    const newData = await videoDatabase.updateOne({videoID : req.body.videoID},{$set : videoRatingToBeChanged},{new : true});
    const user = await userDatabase.findById(req.user);

    const data = {
        videoID : req.body.videoID ,
        ratingGiven : req.body.ratingValue ,
        ratingAddedOn : Date.now()
    }
    user.coursesRated.push(data);
    await userDatabase.findByIdAndUpdate(req.user , user , {new : true});
    return res.status(200).json(newData);
}

exports.deleteVideoInfo = async (req,res)=>{
    const user = await userDatabase.findById(req.user);
    user.coursesAdded = user.coursesAdded.filter(value => value.videoID !== req.params.videoID);
    //This isn't the proper logic to delete the video , as we would have to remove video ID from the coursesRated array of users who have rated the video
    try{
        await videoDatabase.deleteOne({videoID : req.params.videoID});
        await userDatabase.findByIdAndUpdate(req.user,user);
        return res.send(req.params.videoID);
    }catch (e) {
        return res.status(400).send("An error occured while deleting the video");
    }
}

exports.fetchVideoInfo = async (req,res)=>{
    const videoData = await videoDatabase.findOne({videoID : req.params.videoID});
    if(videoData){
        return res.status(200).json(videoData);
    }else{
        return res.status(400).send("Not found");
    }
}

exports.fetchViaQueries = async (req,res)=>{
    //search via title
    if(req.query.title && req.query.rating && req.query.topic) {
        const data = await videoDatabase.find({
            videoTitle : {
                "$regex" : req.query.title,
                "$options":"i"
            },
            videoRating : {
                "$gte":req.query.rating
            },
            videoTopic : {
                "$regex":req.query.topic ,
                "$options": "i"
            }
        });
        return res.status(200).json(data);
    }else if(req.query.title && !req.query.rating && req.query.topic){
        const data = await videoDatabase.find({
            videoTitle : {
                "$regex" : req.query.title,
                "$options":"i"
            },
            videoTopic : {
                "$regex":req.query.topic ,
                "$options": "i"
            }
        });
        return res.status(200).json(data);
    }else if(req.query.title && req.query.rating && !req.query.topic){
        const data = await videoDatabase.find({
            videoTitle : {
                "$regex" : req.query.title,
                "$options":"i"
            },
            videoRating : {
                "$gte":req.query.rating
            }
        });
        return res.status(200).json(data);
    }else if(req.query.title && !req.query.rating && !req.query.topic) {
        const data = await videoDatabase.find({
            videoTitle : {
                "$regex" : req.query.title,
                "$options":"i"
            }
        });
        return res.status(200).json(data);
    }else if(!req.query.title && !req.query.rating && req.query.topic){
        const data = await videoDatabase.find({
            videoTopic : {
                "$regex":req.query.topic,"$options":"i"
            }
        });
        return res.status(200).json(data);
    }else if(!req.query.title && req.query.rating && req.query.topic){
        const data = await videoDatabase.find({
            videoRating : {
                "$gte":req.query.rating
            },
            videoTopic : {
                "$regex":req.query.topic,"$options":"i"
            }
        });
        return res.status(200).json(data);
    }else{
        return res.status(400).json({
            errorCode : "WrongQueryParam",
            message : "Required query params are not present"
        });
    }
}

exports.youtubeInfo = async (req,res)=>{
    const youtubeAPIResponse = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${req.query.vid}&key=${process.env.YOUTUBE_KEY}`);
    return res.status(201).json({
        dataFetched : true ,
        youtubeInfo : {
            videoTitle : youtubeAPIResponse.data.items[0].snippet.title,
            videoUploadedBy : youtubeAPIResponse.data.items[0].snippet.channelTitle ,
            videoUploadedAt : youtubeAPIResponse.data.items[0].snippet.publishedAt,
            videoThumbnailURL : `https://img.youtube.com/vi/${req.query.vid}/0.jpg`
        }
    })
}

exports.checkVideoAvailabilty = async (req,res)=>{
    const videoDetailsPresent = await videoDatabase.findOne({videoID : req.query.vid});
    if(videoDetailsPresent){
        return res.status(200).json({
            isVideoPresent : true ,
            errorCode : "VIDEO_PRESENT",
            message : "Video information is already present in Database"
        });
    }else{
        return res.status(200).json({
            isVideoPresent : false ,
            errorCode : null,
            message : "Video information is not present in Database"
        });
    }
}
