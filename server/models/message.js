// Import Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Mongoose message schema
var messageSchema = new Schema ({
    messageID: {
        type: Number,
        unique: true
    },
    senderID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    sentAt: {
        type: String
    },
    content: {
        type: String
    }
});

// Make model availabile to other modules
module.exports = mongoose.model('Message', messageSchema);
