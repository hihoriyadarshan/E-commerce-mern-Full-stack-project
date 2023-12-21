const ErrorHandler = require("../utils/errorhander");

module.exports = (err,req,res,next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error"

    // wrong mongodb Id error
    if(err.name === "CastError"){
        const message = `Id is not found.Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
   
    
    //mongoose duplicate key error
    if(err.code == 11000){
       const message =`Duplicate ${Object.keys(err.keyValue)} Entered`
       err = new ErrorHandler(message, 400);
    }

    //wrong jwt error
    if(err.name === "JsonWebToken"){
        const message = `Json web Token is Invalid,Try again`;
        err = new ErrorHandler(message, 400);
    }

    //jwt Expire Error
    if(err.name === "TokenExpiredError"){
        const message = `Json web Token is Expired ,Try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message : err.message,
        // message : err.stack,
        // error : err.stack,
    
    })

    
}