// Import Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Mongoose message schema
var messageSchema = new Schema ({
    chatroomID: {
        type: Schema.Types.ObjectId,
        ref: 'Chatroom',
        required: true
    },
    senderID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    sentAt: {
        type: Date
    },
    content: {
        type: String
    }
});

// Make model availabile to other modules
module.exports = mongoose.model('Message', messageSchema);