var express = require('express');
var router = express.Router();
var Chatroom = require('../models/chatroom');

// GET endpoint to retrieve all chatrooms for a specific user
router.get('/chatrooms', (req, res) => {
    const userId = req.query.userId; 
    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }

    
    Chatroom.find({
        $or: [
            { user1: userId },
            { user2: userId }
        ]
    })
    .populate('user1', 'username location skills interests') 
    .populate('user2', 'username location skills interests') 
    .then(chatrooms => {
        if (chatrooms.length === 0) {
            return res.status(404).json({ message: "No chatrooms found for this user." });
        }

        res.status(200).json({ chatrooms: chatrooms });
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ message: "Server error, please try again later." });
    });
});

module.exports = router;
