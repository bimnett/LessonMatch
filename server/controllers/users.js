const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Skill = require('../models/skill');
const Message = require('../models/message');

// Get specific message from a specific user
router.get('/v1/users/:userId/messages/:messageId', async (req, res, next) => {

    const { userId, messageId } = req.params;

    try {

        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({ error: "User not found."} );
        }

        const message = await Message.find({ senderID: userId, _id: messageId });

        if(message.length === 0) {
            return res.status(404).json({ error: "Message not found."} );
        }

        res.status(200).json(message[0]);

    } catch(err) {

        next(err);
    }
});


// Delete user
router.delete('/v1/users/:id', async (req, res, next) => {

    const userId = req.params.id;

    try {

        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await User.deleteOne({ _id: userId });

        res.status(200).json({});

    } catch(err) {

        next(err);
    }
});


// Delete all skills from a user
router.delete('/v1/users/:id/skills', async (req, res, next) => {

    const userId = req.params.id;

    try {

        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const deletedResponse = await Skill.deleteMany({ user: userId });

        res.status(200).json(deletedResponse);
    } catch(err) {
        next(err);
    }
});


// Update the level of a user's existing skill
router.patch('/v1/users/:id/skills/levels', async (req, res, next) => {

    // Save skill information from request body
    const { skillName, newLevel } = req.body;

    // Reject request if either skill name or skill level is empty
    if(!skillName || !newLevel) {
        return res.status(400).json({ error: "The entered value(s) can not be empty." });
    }

    // Reject request if desired level is out of bounds
    if(newLevel < 0 || newLevel > 10) {
        return res.status(400).json({error: "Skill level needs to have a value between 0 and 10"});
    }

    try {

        // Query database for user
        const user = await User.findById(req.params.id).populate('skills');
        
        // Respond with 404 if user isn't found
        if(!user) {
            return res.status(404).json({ error: "User not found."});
        }

        // Query database for the skill that will change level
        const skillIndex = user.skills.findIndex(skill => skill.name === skillName);

        // Reject request if user doesn't currently have skill.
        if(skillIndex === -1) {

            return res.status(400).json({ error: "User does not have this skill." });
        }

        user.skills[skillIndex].level = newLevel;

        // Save updated information to user
        await user.save();

        res.status(200).json(user.skills[skillIndex]);

    } catch(err) {

        next(err);
    }
});


// Update user location
router.patch('/v1/users/:id/locations', async (req, res) => {

    const { newCountry, newCity } = req.body;
    const userId = req.params.id;

    if(!newCountry || !newCity) {
        return res.status(400).json({ error: "The entered value(s) can not be empty." });
    }

    try {

        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({ error: "User not found."} );
        }

        user.location = {
            country: newCountry,
            city: newCity
        }

        await user.save();

        res.status(200).json(user.location);

    } catch(err) {

        console.log(err);
        res.status(500).json({ error: "Something went wrong when attempting to update the user location."});
    }
});


// POST endpoint - Creates a new user
router.post('/v1/users', async (req, res, next) => {
    try { 
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

// GET endpoint - Returns user with given id
router.get('/v1/users/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id)
        res.json(user);
    } catch (error) {
        next(error);
    };
});


// GET endpoint to find users by skill name
router.get('/v1/users', async (req, res, next) => {
    try {
         const skillName = req.query.skill;

        if (!skillName) {
            return res.status(400).json({ message: "Please provide a skill to search for!" });
        }const skill = await Skill.findOne({ name: skillName });

        if (!skill) {
            return res.status(404).json({ message: "Skill not found." });
        } const users = await User.find({ skills: skill._id }).populate('skills');
        
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found with the specified skill." });
        }
        res.status(200).json(users);

    } catch (error) {
        next(error);
    }
});


// PUT endpoint to update all info about skills for an specific user
router.put('/v1/users/:userId/skills', async (req,res,next)=>{

    const{ userId} = req.params;
    const updatedSkills = req.body.skills;

    try {
        const user = await User.findById(userId).populate('skills');

        if(!user){
            return res.status(404).json({message : 'User not found'});
        }

        for (const updatedSkill of updatedSkills){
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
       next(error);
    }
});

//Put endpoint for updating user info
router.put('v1/users/:userId', async(req,res,next)=>{
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
   next(error);
  }
});

module.exports = router;
