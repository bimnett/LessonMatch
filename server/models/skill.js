// Import Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Mongoose skill schema
var skillSchema = new Schema ({
    name: {
        type: String,
        required: true,

    },
    level: {
        type: Number,
        min: [0, 'Level must be at least 0'],
        max: [10, 'Level can at maximum be 10'],
        required: true
    },
    category : {
        type: String,
        required: true,
    }
});

// Make model availabile to other modules
module.exports = mongoose.model('Skill', skillSchema);
