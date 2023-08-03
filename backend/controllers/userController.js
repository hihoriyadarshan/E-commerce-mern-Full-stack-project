const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")

exports.registerUser = catchAsyncErrors(async (req, res, next) => {

        const { name,email,password} =req.body

        const user = await User.create({
            name,email,password,
            avatar:{
                public_id:"This is a  sample id",
                url:"profilepicurl"
            }
        });

        sendToken(user,201,res);
});

// Login USER

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
  
    // checking if user has given password and email both
  
    if (!email || !password) {
      return next(new ErrorHander("Please Enter Email & Password", 400));
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      return next(new ErrorHander("Invalid email or password", 401));
    }
  
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHander("Invalid email or password", 401));
    }
  
    sendToken(user, 200, res);
  });


  //Logout User

  exports.logout = catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token",null,{
      expires:new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success:true,
      message:"Logout successfully"
    })
  });



  // Forgot password

//   exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{

//   const user = await User.findOne({email:req.body.email})

//   if(!user){
//     return next(new ErrorHander("User Not found",404))
//   }

//   // Get ResetPassword Token

//   const resetToken = user.getResetPasswordToken();

//   await user.save({ validateBeforeSave:false });

//   // const resetPasswordUrl = `http://localhost/api/v1/password/reset/${resetToken}`

//   const resetPasswordUrl = `${req.protocol}://${req.get(
//     "host"
//     )}/api/v1/password/reset/${resetToken}`;

//     const message = `Your Password Reset Token is :- \n\n If you have not requested this email then please ignore it `;

//     try {

//       await sendEmail({
//          email: user.email,
//          subject: `Multi-mart Password Recovery`,
//          message,
//       });

//       res.status(200).json({
//         success:true,
//         message:`Email send to ${user.email} successfully`,
//       });
      
//     } catch (error) {
//       user.resetPasswordToken = undefined;
//       user.resetPasswordExpire = undefined;

//       await user.save({ validateBeforeSave:false });
//       return next(new ErrorHander(error.message, 500));

//     }
// });

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Multi-Mart Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});