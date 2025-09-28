const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
    name : String,
    email: {
        type: String,
        unique: true
    },
    password : String,
},{timestamps:true});

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;