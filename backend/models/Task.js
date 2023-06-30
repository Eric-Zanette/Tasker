const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema ({
    poster: {
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
})

module.exports = Task = mongoose.model('tasks', TaskSchema)