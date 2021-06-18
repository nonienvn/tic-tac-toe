const express = require("express")
const mongoose = require("mongoose");

const {signin, signup} = require('../controllers/auth')


const router = express.Router();

router.post('/signup', signup);

router.post("/signin", signin)

module.exports = router;