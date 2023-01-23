const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const executiveSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Fullname is required"],
        trim: true,
        minlength: [3, "Fullname must be at least 3 characters long"],
        maxlength: [50, "Fullname must be less than 50 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: "Email is invalid"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        minlength: [8, "Password must be at least 8 characters long"],
        maxlength: [50, "Password must be less than 50 characters long"]
    }
});


executiveSchema.pre('save', async function (next) {
    if(!this.isModified("password")){
        next(); 
    }
    this.password = await bcrypt.hash(this.password, 10);
    console.log("updated", this.password);
    next();
});


executiveSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({id: this._id, role: this.role}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN 
    });
    return token;
}

executiveSchema.methods.comparePassword = async function(executivePassword) {
    return await bcrypt.compare(executivePassword, this.password);
}

module.exports = mongoose.model('User', executiveSchema);