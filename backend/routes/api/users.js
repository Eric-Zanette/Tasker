const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')


/* Load user model */
const User = require('../../models/User')

/* @route   GET api/users/register */
/* @des     Register user */
/* @acess   Public */

router.get('/register', (req, res) => {
    errors = {}
    /* see if email is already registered */
    User.findOne( {email: req.body.email} )
        .then(user => {
        if(user) {
            /* throw error if exists */
            errors.email = 'email already exists'
            return res.status(400).json(errors)
        }
        /* create new user array */
        const newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })

        /* hash password */
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err,hash) => {
                if(err) throw err
                newUser.password = hash
                newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err))
            })
        })
        
    })
})

/* @route   GET api/users/login */
/* @des     Register user */
/* @acess   Public */

router.get('/login', async (req, res) => {
    errors = {}
    /* see if email is already registered */
    User.findOne( {email: req.body.email} )
        .then(user => {
        if(!user) {
            /* throw error if exists */
            errors.email = 'User does not exist'
            return res.status(400).json(errors)
        }
        bcrypt.compare(req.body.password, user.password)
            .then(isMatch => {
                if(isMatch){
                    /* create JWT info payload */
                    const payload = {
                        id: user.id,
                        username: user.username,
                    }

                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        { expiresIn: 7200},
                        (err, token) => {
                            res.json({
                                success:true,
                                token: 'Bearer ' + token
                            })
                        })
                } else {
                    errors.password = 'Wrong password'
                    return res.status(400).json(errors.password)
                }
            })
 
    })
})

module.exports = router
