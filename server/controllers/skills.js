var express = require('express');
var router = express.Router();
var Skill = require('../models/skill'); 

// GET endpoint to retrieve all skills
router.get('/skills', (req, res, next) => {
    Skill.find()
        .then(skills => {
            if (skills.length === 0) {
                return res.status(404).json({ message: "No skills found." });
            }
            res.status(200).json({ skills: skills });
        })
        .catch(error => {
            next(error);
        });
});

module.exports = router;
