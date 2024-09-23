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

//GET endpoint - Returns message with given id
router.get('/v1/messages/:id', async (req, res, next) => {
    try {
        var id = req.params.id;
        var message = await Message.findById(id)
        if (message === null){
            res.status(404).json("There is no message with that id");
        };
        res.json(message);
    } catch (error) {
        next(error);
    };
});

module.exports = router;
