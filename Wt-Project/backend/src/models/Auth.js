const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    address:{
        type: String
    },
    isAdmin:{
        type: Number,
        default: 2
    },
    // profileImage: {
    //     type: String
    // }
},
{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema)