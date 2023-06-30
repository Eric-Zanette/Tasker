const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const passport = require('passport')
const Task = require('../../models/Task')
const User = require('../../models/User')
const validateTaskInput = require('../../validation/tasks')


/* @Route       POST /api/tasks/test */
/* @desc        create new task  */
/* @access      Private  */

router.post('/', passport.authenticate('jwt', {session: false}), (req,res) => {
    const {errors, isValid} = validateTaskInput(req.body)

    if(isValid) {
        newTask = new Task ({
            posted: new Date(),
            title: req.body.title,
            description: req.body.description,
            complete: false,
            finishBy: req.body.finishBy,
            user: req.user.id,
        })
    newTask.save().then(task => res.json(task))
    } else{
        res.status(400).json(errors)
    }
})

/* @Route       GET /api/tasks */
/* @desc        get user's tasks  */
/* @access      Private  */
router.get('/', passport.authenticate('jwt', {session: false}), (req,res) => {
    Task.find({user: req.user.id})
        .then(posts => {
            if(posts.length === 0) {
                return res.status(404).json('noposts: No posts found')
            }
            res.json(posts)
        })
        .catch(err => res.status(500).json(err))
})

module.exports = router