var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Skill = require('../models/skill'); 


router.post('/v1/users', async (req, res) => {
    try { 
        var user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json("User was not created");
    }
});

// GET endpoint to find users by skill name
router.get('/v1/users', async (req, res) => {
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


// PUT endpoint to update all info about skills for an specific user
router.put('/v1/users/:userId/skills', async (req,res)=>{

    const{ userId} = req.params;
    const updatedSkills = req.body.skills;

    try {
        const user = await User.findById(userId).populate('skills');

        if(!user){
            return res.status(404).json({message : 'User not found'});
        }

        for (const updatedSkill of updatedskills){
            const{_id, name, level, category } = updatedSkill;
            const skill = await Skill.findById(_id);

            if (!skill){
                return res.status(404).json({message: 'skill with Id ${_id} not found'});
            }

            if (name) skill.name =name; 
            if (level !== undefined) skill.level = level;
            if (category) skill.category = category;

            await skill.save();
        }
        res.status(200).json({message: 'All skills updated successfully!'});
    }   catch(error){
        console.error('Error updating skills:', error);
        res.status(500).json({message: 'skills were not updated'});
    }
});

//Put endpoint for updating user info
router.put('v1/users/:userId', async(req,res)=>{
  const {userId} = req.params;
  const {username, password, birth_date,location, skills, interests} = req.body;

  try{
     const user = await User.findById(userId);
     if(!user){
        return res.status(404).json({message:'User not found'});
     }
     if(username) user.username = username;
     if(password) user.password = password;
     if(birth_date) user.birth_date = birth_date;
     if(location){
        if(location.city) user.location.city = location.city;
        if(location.country) user.location.country = location.country;
     }
     if(skills && Array.isArray(skills)) {user.skills = skills;}
     if(interests && Array.isArray(interests)) {user.interests = interests;}

     await user.save();
     res.status(200).json({message:'User updated succesfully',user});

  } catch (error){
    console.error('Error updating user', error);
    res.status(500).json({message: 'User was not updated' }); 
  }
});

module.exports = router;
