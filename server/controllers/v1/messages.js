const express = require('express')
const router = express.Router()
const Message = require('../../models/message');
const Chatroom = require('../../models/chatroom');


// POST endpoint - Creates a new message
router.post('/messages', async (req, res, next) => {
    try {
        const { chatroomId, senderID, content } = req.body;

        console.log('Request body:', req.body);
        if (!chatroomId || !senderID || !content) {
             console.log('Missing fields:', { chatroomId, senderID, content });
            return res.status(400).json({ error: 'Missing required fields: chatroomId, senderID, or content' });
        }

        const message = new Message({ chatroomId, senderID, content, sentAt: new Date() });
        await message.save();
        
       
        await Chatroom.findByIdAndUpdate(
            chatroomId,
            { $push: { messages: message._id } }
        );

        res.status(201).json(message);
    } catch (error) {
        next(error);
    }
});


//GET endpoint - Returns message with given id
router.get('/messages/:id', async (req, res, next) => {
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
router.delete('/messages/:id', async (req, res, next) => {
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
router.delete('/messages', async (req, res, next) => {
    try {
        const messagesCount = await Message.countDocuments();
        
        const deletedMessages = await Message.deleteMany({});
        res.status(200).json("All " + deletedMessages.deletedCount + " messages successfully deleted");
    } catch (err) {
        next(err);
    }
});

//PATCH endpoint- edit content of a specific message
router.patch('/messages/:id', async(req, res, next) =>{
  
    const id = req.params.id; 
    const  { newContent } = req.body;
    try{
       
        const message = await Message.findById(id);
        message.content = newContent;
        await message.save();
        
        return res.status(200).json(message);

    }catch(err){
        next(err);
    }
});
module.exports = router;
