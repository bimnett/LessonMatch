const express = require('express')
const router = express.Router()

const Skill = require('../models/skill'); 

// GET endpoint to retrieve all skills
router.get('/v1/skills', (req, res, next) => {
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

//POST endpoint to post a new skill for an specific user
router.post('/v1/skills', async (req, res, next) => {
    try { 
        var skill = new Skill(req.body);
        await skill.save();
        res.status(201).json(skill);
    } catch (error) {
        next(error);
    }
});

module.exports = router;