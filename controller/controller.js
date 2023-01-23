const User = require('../model/userSchema');
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/sendToken');

exports.getHomepage = async(req, res, next) => {
    res.status(200).json({
        messgae: "Welcome to Homepgae"
    })
}



exports.userSignup = catchAsyncError(async (req, res, next) => {
    const {
        fullname,
        email,
        password
    } = req.body;

    const executive = await User.create({
        fullname,
        email,
        password
    })

    sendToken(executive, 201, res)
})