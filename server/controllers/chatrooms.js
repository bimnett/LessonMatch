const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Chatroom = require('../models/chatroom');
const Message = require('../models/message');

// POST endpoint - Create a chatroom for the given user
router.post('/v1/users/:id/chatrooms', async (req, res, next) => {
    try { 
        const user1_id = req.params.id;
        const user2_id = req.body.user2;
        const chatroom = new Chatroom();
        chatroom.user1 = user1_id;
        chatroom.user2 = user2_id;
        await chatroom.save();
        res.status(201).json(chatroom);
    } catch (error) {
        next(error);
    }
});

// Delete all messages from a chatroom
router.delete('/v1/chatrooms/:id/messages', async (req, res, next) => {

    try {

        const chatroomId = req.params.id;

        chatroomMessages = await Message.find({ chatroomID: chatroomId });

        await Message.deleteMany({ chatroomID: chatroomId });

        res.status(200).json(chatroomMessages);

    } catch(err) {

        next(err);
    }
});


// GET endpoint to retrieve all chatrooms for a specific user
router.get('/v1/chatrooms', (req, res) => {
    const userId = req.body.userId; 
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

//Delete endpoint to delete a specific chatroom for a specific user
router.delete('/v1/chatrooms/:chatroomId/users/:userId', async function(req,res,next){


    try {

        const { chatroomId, userId } = req.params;

        const chatroom = await Chatroom.findOneAndDelete({
            _id : chatroomId,
            $or : [ {user1 : userId}, {user2 : userId}]
        });

        if(!chatroom){
            return res.status(404).json({ error: "Chatroom not found." });
        }

        res.status(200).json(chatroom);
    } catch(err) {
        next(err);
    }
});

 //post endpoint to creat a new chatroom
router.post('/v1/chatrooms', async (req, res, next) => {
    const { user1, user2 } = req.body;

    try {
        const existingChatroom = await Chatroom.findOne({
            $or: [
                { user1: user1, user2: user2 },
                { user1: user2, user2: user1 } 
            ]
        });

        if (existingChatroom) {
            return res.status(400).json({ message: 'Chatroom already exists between these users.' });
        }
        const newChatroom = new Chatroom({ user1, user2 });

        const savedChatroom = await newChatroom.save();

        res.status(201).json(savedChatroom);
    } catch (error) {
        
        next(error);
    }
});



module.exports = router;
