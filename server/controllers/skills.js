var express = require('express');
var router = express.Router();
var Skill = require('../models/skill'); 

// GET endpoint to retrieve all skills
router.get('/skills', (req, res) => {
    Skill.find()
        .then(skills => {
            // Check if the skills array is empty
            if (skills.length === 0) {
                // If no skills are found, send a 404 response
                return res.status(404).json({ message: "No skills found." });
            }

            // If skills are found, send them in the response
            res.status(200).json({ skills: skills });
        })
        .catch(error => {
            // Handle different types of errors
            console.error(error);

            if (error.name === 'CastError') {
                res.status(400).json({ message: "Invalid data format." });
            } else if (error.name === 'ValidationError') {
                res.status(422).json({ message: "Validation error: " + error.message });
            } else {
                res.status(500).json({ message: "Server error, please try again later." });
            }
        });
});

module.exports = router;
