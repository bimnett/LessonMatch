const express = require('express')
const router = express.Router()

const Skill = require('../../models/skill'); 
const User = require('../../models/user');

// DELETE endpoint - Delete collection of skills
router.delete('/skills', async (req, res, next) => {
    try {
        const skillsCount = await Skill.countDocuments();
        if (skillsCount === 0){
            return res.status(404).json({error: "No skills left to delete"});
        };
        const deletedSkills = await Skill.deleteMany({});
        res.status(200).json("All " + deletedSkills.deletedCount + " skills successfully deleted");
    } catch (err) {
        next(err);
    }
});


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


//POST endpoint for creating new skills
router.post('/skills', async (req, res, next) => {

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

//PUT endpoint- Update info for specific skill
router.put('/skills/:skillId', async (req,res,next)=>{

    const { skillId } = req.params;
    const { name, level, category, isAnInterest} = req.body;

    try {
        const skill = await Skill.findById(skillId);

        if(!skill){
            return res.status(404).json({message : 'Skill not found'});
        }


        skill.name = name;
        skill.level = level;
        skill.category = category;
        skill.isAnInterest = isAnInterest;

        await skill.save();
        
        res.status(200).json(skill);
    }   catch(error){
       next(error);
    }
});

router.get('/')


module.exports = router;