![logo](./Others/Logo.png)
# Youtube Courses IMDB
 This Application can be accessed using this [link](https://youtubecoursesimdb.netlify.app)   

## About 
- As we know Youtube  has removed dislike buttons counter from their site , as a result we often come across the courses which are not really worth our time.So , This Web App Aims to solve that issue by solving that problem by allowing users to provide a proper rating to youtube courses.
- There are many small youtubers who make excellent content but lack of exposure makes it difficult for them to get proper audience , down side for consumers is that we miss out on their well made content.

## Tech Stack Used 
### - Frontend : ReactJS , MDBootstrap 
### - Backend  : Nodejs/ExpressJs 
### - Database : MongoDB 

 **Please Note** : I am not a very creative person when it comes to styling , designing and other stuff. So If you find this web app lack-lustrous that's actually the main reason.

 **To Test Out This Web App without making an account use the following details** 
 ```
 username : DemoUser (case sensitive)
 password : password
 ```

## End Points 
- Video (/api/v1/video) 
    -  /addvideo = To Add Video*
    - /getvideo/:videoID = To fetch video details
    - /ratings = To change video ratings*
    - /delvideo/:videoID = To Delete The Video*
    - /fetchquery?title=Title&rating=4&topic=Topic  = To Fetch Video using different queries.
    - /videocheck = To check availabilty of video in database*
    - /youtubeinfo = To get youtube related Information of a particular video* .
- User (/api/v1/user)
    - /usersignup = For user signup
    - /userlogin  = For user login 
    - /userdetails = To Fetch userdetails (like videos added by that user , videos rated by the user).

## Different Models 
### - User 
```
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
```


### - Video 
```
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
```

## Future Work 
- To make API error response more particular than what it is right now .
- To improve certain UI elements.
