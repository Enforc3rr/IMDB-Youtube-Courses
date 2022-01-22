const express = require("express");
const app = express();
const database = require("./configuration/databaseConfiguration");
const dotenv = require("dotenv");
dotenv.config({path : "./configuration/configuration.env"});


database()
    .then(()=>console.log("Connected To Database"))
    .catch((error)=>console.log("An Error occurred While Connecting To Database"));


const PORT = 8000 || process.env.PORT;
app.listen(PORT , ()=>console.log(`Backend Server Started On PORT ${PORT}`));