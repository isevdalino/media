const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const uuid = require('uuid');
const keys = require("../../config/keys");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateResetPasswordInput = require("../../validation/resetPassword");

const User = require("../../models/User");

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ name:req.body.name, email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }

    const newUser = new User({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      createdAt: Date.now()
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          email: user.name
        };
        jwt.sign(
          payload,
          "secret",
          {
            expiresIn: 600
          },
          (err, token) => {
            res.json({
              success: true,
              token: token
            });
          }
        );
      } else {
        return res
          .status(401)
          .json({ passwordincorrect: "Password is incorrect" });
      }
    });
  });
});

router.post("/resetPassword", (req, res) => {
  const { errors, isValid } = validateResetPasswordInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    
    newPassword = uuid.v1()

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newPassword, salt, (err, hash) => {
        if (err) throw err;
        user.password = hash;
        User.findOneAndUpdate({email}, user,{upsert: false}, function(err, doc) {
          if (err) return res.send(500, {error: err});
        });
      });
    });

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: keys.gmail,
        pass: keys.gmailPassword
      }
    });
    
    var mailOptions = {
      from: keys.gmail,
      to: email,
      subject: 'Reseting password for media',
      text: `New password: ${newPassword}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        return res.status(500).json({ error: "Internal server error" })
      } else {
        return res.status(200).json(user)
      }
    });
  });
});

module.exports = router;
