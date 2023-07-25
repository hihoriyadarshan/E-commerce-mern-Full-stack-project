// import app module
const path = require("path");
const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");


// handling uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log('Error: ${err.message}');
    console.log('shutting down the server due to uncaught Exception')
    process.exit(1);
})

// config
dotenv.config({path:"backend/config/config.env"})

// connecting database
connectDatabase();


// create a server

const server =app.listen(process.env.PORT,() => {
    console.log('server is on http://localhost:${process.env.PORT}')
})



// server rejection error
process.on("unhandledRejection",err=>{
    console.log('Error: ${err.message}');
    console.log('shutting down the server due to unhandle promise rejection')
    server.close(()=>{
        process.exit(1);
    })
});