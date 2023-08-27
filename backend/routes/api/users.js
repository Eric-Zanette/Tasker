const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const {
  validateLoginInput,
  validateRegistrationInput,
} = require("../../validation/users");

/* Load user model */
const User = require("../../models/User");

/* @route   GET api/users/register */
/* @des     Register user */
/* @acess   Public */

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegistrationInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  /* see if email is already registered */
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      /* throw error if exists */
      errors.email = "email already exists";
      return res.status(400).json(errors);
    }
    /* create new user array */
    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });

    /* hash password */
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) => res.json(user))
          .catch((err) => console.log(err));
      });
    });
  });
});

/* @route   POST api/users/login */
/* @des     login user */
/* @acess   Public */

router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(404).json(errors);
  }

  /* see if email is already registered */
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      /* throw error if does not exist */
      errors.email = "User does not exist";
      return res.status(400).json(errors);
    }
    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      console.log(isMatch);
      if (isMatch === true) {
        /* create JWT info payload */
        const payload = {
          id: user.id,
          username: user.username,
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 7200 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Wrong password";
        return res.status(400).json(errors);
      }
    });
  });
});

/* @route   GET api/users/current */
/* @des     get loggin in user */
/* @acess   Public */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      email: req.user.mail,
      username: req.user.username,
    });
  }
);

module.exports = router;
