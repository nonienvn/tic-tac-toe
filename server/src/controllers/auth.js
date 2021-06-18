const User = require("../models/user")
const mongoose = require("mongoose")
exports.signup = (req,res) => {
    User.findOne({email: req.body.email})
    .exec((error,user) => {
        if(user) return res.status(400).json({
            message: "email id already in use"
        })

        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        const _user = new User ({
            firstName,
            lastName,
            email,
            password
        })

        _user.save((error,data) => {
            if(error) {
                return res.status(400).json({
                    message: "something went wrong"
                })}
            if (data) {
                return res.status(201).json({
                    user: data
                })
            }
            }
        )
    })
}

exports.signin = (req,res) => {
    User.findOne({email : req.body.email})
    .exec((error,user) => {
        if(error) return res.status(400).json({error})

        if(user) {
           if( user.authenticate(req.body.password)) {
            const {_id, firstName, lastName, email, role, fullName} = user;
               res.status(201).json({
                   user: { _id,firstName, lastName, email, role, fullName}
               })
           }
        }
    })
}