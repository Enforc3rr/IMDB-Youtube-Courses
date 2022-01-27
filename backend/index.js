const express = require("express");
const app = express();
const database = require("./configuration/databaseConfiguration");
const dotenv = require("dotenv");
dotenv.config({path : "./configuration/configuration.env"});
const videoRouter = require("./routes/videoRoutes");
const userRouter = require("./routes/userRoutes");

app.use(express.json());
app.use(express.urlencoded({extended : true})); // used for forms like the one I made for smllr ( where I send code and other details under different keys )
app.use("/api/v1/video",videoRouter);
app.use("/api/v1/user",userRouter);


database()
    .then(()=>console.log("Connected To Database"))
    .catch(()=>console.log("An Error occurred While Connecting To Database"));


const PORT = 8000 || process.env.PORT;
app.listen(PORT , ()=>console.log(`Backend Server Started On PORT ${PORT}`));