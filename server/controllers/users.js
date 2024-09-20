var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.post('/v1/users', async (req, res) => {
    try { 
        var user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json("User was not created");
    }
});

module.exports = router;










