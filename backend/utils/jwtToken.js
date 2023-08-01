const sendToken = (user,statusCode,res)=>{  //creating token and saving in cookie

    const token = user.getJWTToken();

    //option for cookies
    const options = {
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60*60*1000 //7 day expire
        ),
        httpOnly:true,
    };
    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        user,
        token,
    });
};

module.exports = sendToken;