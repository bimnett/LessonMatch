// Import Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Mongoose chatroom schema
var chatroomSchema = new Schema ({
   
        user1: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        user2: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
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
