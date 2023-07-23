// import app module
const path = require("path");
const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
// config
dotenv.config({path:"backend/config/config.env"})

// connecting database
connectDatabase();


// create a server

app.listen(process.env.PORT,() => {
    console.log('server is on http://localhost:${process.env.PORT}')
})