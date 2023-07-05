const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema ({
    posted: {
        type: Date,
        default: new Date()
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: false
    },
    complete: {
        type: Boolean,
        default: false
    },
    finishBy: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, {timestamps: true})

module.exports = Task = mongoose.model('tasks', TaskSchema)