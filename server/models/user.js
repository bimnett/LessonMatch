// Import Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Mongoose user schema
const userSchema = new Schema ({
    username: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    birth_date: {
        type: Date, 
        required: true
    },
    location: {
        city: {
            type: String, 
            required: true
        }, 
        country: {
            type: String,
            required: true
        },
    },
    skills: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Skill'
        }
    ],
    interests: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Skill'
        }
    ]
});

// Make model availabile to other modules
module.exports = mongoose.model('User', userSchema);
