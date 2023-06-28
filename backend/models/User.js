const mongoose = require('mongoose')
const Schema = mongoose.Schema

/* Create user schema */

const UserSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
})

module.exports = User = mongoose.model('users', UserSchema)