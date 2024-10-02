const express = require('express');
const router = express.Router();

const User = require('../../models/user');
const Skill = require('../../models/skill');
const Message = require('../../models/message');

// POST endpoint - Logs in an already existing user
router.post('/login', async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username: username});

        if (!user) {
            return res.status(404).json("There is no user with that username.");
        };
        if (password !== user.password){
            return res.status(401).json("Incorrect credentials, try again.")
        };

        res.status(200).json(user._id);

    } catch (error){
        next(error);
    };
});

// GET endpoint to retrieve all users
router.get('/users', (req, res) => {
    User.find() 
        .then(users => {
            if (users.length === 0) {
                return res.status(404).json({ message: "No users found." }); // If no users found
            }
            res.status(200).json({ users: users }); // Respond with the list of users
        })
        .catch(err => {
            console.error(err); // Log the error
            res.status(500).json({ message: 'Internal Server Error' }); // Respond with an error message
        });
});

// Get specific message from a specific user
router.get('/users/:userId/messages/:messageId', async (req, res, next) => {

    try {

        const { userId, messageId } = req.params;

        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({ error: "User not found."} );
        }

        const message = await Message.findOne({ _id: messageId, senderID: userId });

        if(!message) {
            return res.status(404).json({ error: "Message not found."} );
        }

        res.status(200).json(message);

    } catch(err) {
        next(err);
    }
});


// Delete user
router.delete('/users/:id', async (req, res, next) => {

    const userId = req.params.id;

    try {

        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await User.deleteOne({ _id: userId });

        res.status(200).json(user);

    } catch(err) {

        next(err);
    }
});


// Delete all skills from a user
router.delete('/users/:id/skills', async (req, res, next) => {

    const userId = req.params.id;

    try {

        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({ error: "User not found." });
        }

        await Skill.deleteMany({ user: userId });

        res.status(200).json([]);
    } catch(err) {
        next(err);
    }
});


// Update the level of a user's existing skill
router.patch('/users/:id/skills', async (req, res, next) => {

    try {

        // Save skill information from request body
        const { skillName, newLevel } = req.body;
        const userId = req.params.id;

        // Reject request if either skill name or skill level is empty
        if(!skillName || !newLevel) {
            return res.status(400).json({ error: "The entered value(s) can not be empty." });
        }

        // Reject request if desired level is out of bounds
        if(newLevel < 0 || newLevel > 10) {
            return res.status(400).json({error: "Skill level needs to have a value between 0 and 10"});
        }

        // Query database for user
        const user = await User.findById(userId);
        
        // Respond with 404 if user isn't found
        if(!user) {
            return res.status(404).json({ error: "User not found."});
        }

        // Query database for the skill that will change level
        const skill = await Skill.findOne({ name: skillName, user: userId });

        if(!skill){
            return res.status(404).json({ error: "Skill not found."});
        }

        // Save updated information to skill
        skill.level = newLevel;
        await skill.save();

        res.status(200).json(skill);

    } catch(err) {

        next(err);
    }
});


// Update user location
router.patch('/users/:id', async (req, res) => {

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


// Get all skills from a specific user
router.get('/users/:userId/skills', async (req, res, next) => {

    try {

        const { userId } = req.params;

        const skill = await Skill.find({ user: userId });

        if(!skill) {
            return res.status(404).json({ error: "Skill not found." });
        }

        res.status(200).json(skill);

    } catch(err){
        next(err);
    }
});


// POST endpoint - Creates a new user
router.post('/users', async (req, res, next) => {
    try { 
        const user = new User(req.body);
        await user.save();
        res.status(201).json({user,
            links: [
            {
                rel: "update",
                href: '/api/v1/users/' + user._id,
                method: "PUT"
            }
            ]
        });
    } catch (error) {
        next(error);
    }
});

// GET endpoint - Returns user with given id
router.get('/users/:id', async (req, res, next) => {

    try {

        const id = req.params.id;
        const user = await User.findById(id);

        if(!user) {
            return res.status(404).json({ error: "User not found." });
        }

        res.json(user);
    } catch (error) {
        next(error);
    };
});


// PUT endpoint to update all info about skills for an specific user
router.put('/users/:userId/skills/:skillId', async (req,res,next)=>{

    const { userId, skillId } = req.params;
    const { name, category, level} = req.body;

    try {
        const user = await User.findById(userId).populate('skills');

        if(!user){
            return res.status(404).json({message : 'User not found'});
        }

        const skill = await Skill.findById(skillId);

        skill.name = name;
        skill.level = level;
        skill.category = category;

        await skill.save();
        
        res.status(200).json(skill);
    }   catch(error){
       next(error);
    }
});

//Put endpoint for updating user info
router.put('/users/:userId', async(req,res,next)=>{


  try {

    const { userId } = req.params;
    const { username, password, birth_date, location, skills, interests} = req.body;

    const user = await User.findById(userId);

    if(!user){
        return res.status(404).json({ error: 'User not found' });
    }

    if(username) user.username = username;
    if(password) user.password = password;
    if(birth_date) user.birth_date = birth_date;

    if(location){
        if(location.city) user.location.city = location.city;
        if(location.country) user.location.country = location.country;
    }

    if(skills && Array.isArray(skills)) user.skills = skills;
    if(interests && Array.isArray(interests)) user.interests = interests;

    await user.save();
    res.status(200).json({ message: 'User updated succesfully',user });

  } catch (error){
        next(error);
    }
});


module.exports = router;
