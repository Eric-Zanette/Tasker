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
                return res.status(404).json('notasks: No tasks found')
            }
            res.json(posts)
        })
        .catch(err => res.status(500).json(err))
})

/* @Route       DELETE /api/tasks/:id */
/* @desc        delete a specific  */
/* @access      Private  */
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req,res) => {
    console.log(req.params.id)
    Task.deleteOne({_id: req.params.id})
        .then(res.json({"msg" : "Task deleted"}))
        .catch(err => res.status(500).json(err))
})

/* @Route       POST /api/tasks/:id */
/* @desc        edit a specific  */
/* @access      Private  */
router.post('/:id', passport.authenticate('jwt', {session: false}), (req,res) => {
    Task.replaceOne(
        { _id: req.params.id },
        req.body
        )
            .then(task => res.json(task))
            .catch(err => res.status(500).json(err))
})

module.exports = router