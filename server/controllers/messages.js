var express = require('express');
var router = express.Router();
var Message = require('../models/message');

// POST endpoint - Creates a new message
router.post('/v1/messages', async (req, res, next) => {
    try {
        var message = new Message(req.body);
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
