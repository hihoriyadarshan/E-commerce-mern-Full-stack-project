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

        res.status(201).json({
            success:true,
            user,
        });
});