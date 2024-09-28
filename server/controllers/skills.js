const express = require('express')
const router = express.Router()

const Skill = require('../models/skill'); 
const User = require('../models/user');


// Get all users who have any skill within a given category
router.get('/v1/skills/users', async (req, res, next) => {

    try {

        const { categoryName, sortOrder = 1 } = req.query;

        if(!categoryName){
            return res.status(400).json({ error: "Category name is required." });
        }

        const categorySkills = await Skill.find({ category: categoryName })
                                        .sort({ name: sortOrder })
                                        .populate('user');

        const users = categorySkills.map(skill => skill.user);

        // Remove duplicates
        const uniqueUsers = Array.from(new Set(users));

        res.status(200).json(uniqueUsers);

    } catch(err) {
        next(err);
    }
});


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


//POST endpoint for creating new skills
router.post('/v1/skills', async (req, res, next) => {

    const { name, level, category, userId, isAnInterest } = req.body;
    try {
        const user = await User.findById(userId);
        const newSkill = new Skill({
            name,
            level,
            category,
            user,
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


router.get('/')


module.exports = router;