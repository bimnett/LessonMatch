// Import Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Mongoose chatroom schema
var chatroomSchema = new Schema ({
    chatroomID: {
        user1: {
            type: String,
            required: true
        },
        user2: {
            type: String,
            required: true
        }
    }
});

// Ensure combination of fields is unique
chatroomSchema.index(
    { 
        user1: 1,
        user2: 1
    },
    {
        unique: true
    }
)

// Make model availabile to other modules
module.exports = mongoose.model('Chatroom', chatroomSchema);
