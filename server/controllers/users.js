var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Skill = require('../models/skill'); 

router.post('/v1/users', async (req, res, next) => {
    try { 
        var user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

// GET endpoint to find users by skill name
router.get('/users', async (req, res) => {
    try {
        
        var skillName = req.query.skill;

        if (!skillName) {
            return res.status(400).json({ message: "Please provide a skill to search for!" });
        }
        
        var skill = await Skill.findOne({ name: skillName });

        if (!skill) {
            return res.status(404).json({ message: "Skill not found." });
        }

        var users = await User.find({ skills: skill._id }).populate('skills');

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found with the specified skill." });
        }

        res.status(200).json(users);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error, please try again later." });
    }
});

module.exports = router;
