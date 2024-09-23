const express = require('express')
const router = express.Router()

const Skill = require('../models/skill'); 
const User = require('../models/user');


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
//POST endpoint for creating new skills
router.post('/v1/skills', async (req, res, next) => {

    const { name, level, category, userId, isAnInterest } = req.body;
    try {
        const user = await User.findById(userId);
        const newSkill = new Skill({
            name,
            level,
            category,
            user: userId,
            isAnInterest
        });

        const savedSkill = await newSkill.save();
        if (isAnInterest) {
            user.interests.push(savedSkill._id);
        } else {
            user.skills.push(savedSkill._id);
        }
        await user.save();
        res.status(201).json(savedSkill);
    } catch (error) {
        next(error);
    }
});

module.exports = router;