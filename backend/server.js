// import app module
const path = require("path");
const app = require("./app");

const dotenv = require("dotenv");

// config
dotenv.config({path:"backend/config/config.env"})

// create a server

app.listen(process.env.PORT,() => {
    console.log('server is on http://localhost:${process.env.PORT}')
})