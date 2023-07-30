const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");


exports.registerUser = catchAsyncErrors(async (req, res, next) => {

        const { name,email,password} =req.body

        const user = await User.create({
            name,email,password,
            avatar:{
                public_id:"This is a  sample id",
                url:"profilepicurl"
            }
        });

        const token = user.getJWTToken();

        res.status(201).json({
            success:true,
            user,
            token,

        });
});

// Login USER

exports.loginUser = catchAsyncErrors(async(req,res,next) => {

    const{email,password} = req.body;

    // checking if user has given password and email both

    if(!email || !password){
        return next(new ErrorHander("Please Enter Email & Password", 400))

    }

    const user = await User.findOne({email}).select("+ password");

    if(!user){
        return next(new ErrorHander("Invalid email or Password",401)); //email not match
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email or Password",401)); // password not match
    }

    const token = user.getJWTToken();

        res.status(201).json({
            success:true,
            user,
            token,
    });
}); 