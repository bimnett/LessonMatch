const express = require('express')
const router = express.Router()
const Message = require('../models/message');

// POST endpoint - Creates a new message
router.post('/v1/messages', async (req, res, next) => {
    try {
        const message = new Message(req.body);
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        next(error);
    }
});

//GET endpoint - Returns message with given id
router.get('/v1/messages/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const message = await Message.findById(id)
        if (message === null){
            res.status(404).json("There is no message with that id");
        };
        res.json(message);
    } catch (error) {
        next(error);
    };
});

// DELETE endpoint - Deletes a message with given id
router.delete('/v1/messages/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const message = await Message.findByIdAndDelete(id);
        if (message === null){
            res.status(404).json({ error: "There is no message with that id" });
        };
        res.json(message);
    } catch (error) {
        next(error);
    };
});

// DELETE endpoint - Deletes collection of messasges
router.delete('/v1/messages', async (req, res, next) => {
    try {
        const messagesCount = await Message.countDocuments();
        if (messagesCount === 0){
            return res.status(404).json({error: "No messages left to delete"});
        };
        const deletedMessages = await Message.deleteMany({});
        res.status(200).json("All " + deletedMessages.deletedCount + " messages successfully deleted");
    } catch (err) {
        next(err);
    }
});

module.exports = router;
