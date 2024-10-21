// Import necessary modules
const mongoose = require('mongoose');
const User = require('./models/user');
const Skill = require('./models/skill');
const Message = require('./models/message');
const Chatroom = require('./models/chatroom');

// MongoDB connection string
const mongoDB = 'mongodb://127.0.0.1:27017/animalDevelopmentDB'; 

// Connect to MongoDB
mongoose.connect(mongoDB)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Mock data population
const populateDB = async () => {
    try {
        // Clear existing data (optional)
        await User.deleteMany({});
        await Skill.deleteMany({});
        await Message.deleteMany({});
        await Chatroom.deleteMany({});
        
        // Create an array of users
        const usersData = [
            { username: 'John Doe', password: 'password123', birth_date: '1990-01-01', city: 'New York', country: 'USA' },
            { username: 'Jane Doe', password: 'password123', birth_date: '1992-02-01', city: 'Los Angeles', country: 'USA' },
            { username: 'Alice Wonder', password: 'password123', birth_date: '1988-04-15', city: 'San Francisco', country: 'USA' },
            { username: 'Bob the Builder', password: 'password123', birth_date: '1985-07-21', city: 'Chicago', country: 'USA' },
            { username: 'Charlie Brown', password: 'password123', birth_date: '1993-03-11', city: 'Houston', country: 'USA' },
            { username: 'Daisy Duke', password: 'password123', birth_date: '1995-06-08', city: 'Miami', country: 'USA' },
            { username: 'Edward Scissor', password: 'password123', birth_date: '1982-09-17', city: 'Seattle', country: 'USA' },
            { username: 'Fiona Apple', password: 'password123', birth_date: '1991-11-19', city: 'Denver', country: 'USA' },
            { username: 'George Jetson', password: 'password123', birth_date: '1986-12-01', city: 'Dallas', country: 'USA' },
            { username: 'Hannah Montana', password: 'password123', birth_date: '1994-10-13', city: 'Boston', country: 'USA' },
            { username: 'Ian Curtis', password: 'password123', birth_date: '1992-05-21', city: 'Phoenix', country: 'USA' },
            { username: 'Juliet Capulet', password: 'password123', birth_date: '1987-02-10', city: 'Las Vegas', country: 'USA' }
        ];

        // Insert users into the database
        const users = await User.insertMany(usersData.map(user => ({
            username: user.username,
            password: user.password,
            birth_date: new Date(user.birth_date),
            location: {
                city: user.city,
                country: user.country
            },
            skills: [],
            interests: []
        })));

        // Define skill categories and skills
        const skillCategories = ['Music', 'Books', 'Movies', 'Programming', 'Sports'];
        const musicSkills = ['Rap', 'Jazz', 'Classical', 'K-Pop']
        const booksSkills = ['Fantasy', 'Mystery', 'Romance', 'Adventure']
        const moviesSkills = ['Horror', 'Comedy', 'Action']
        const programmingSkills = ['Java', 'Vue', 'PostgreSQL', 'Rust']
        const sportsSkills = ['Football', 'Basketball', 'Track', 'Cricket', 'Swimming']

        // Create skills for each user
        for (let i = 0; i < users.length; i++) {
            const user = users[i];

            const userSkills = [
                {
                    name: musicSkills[Math.floor(Math.random() * 3)],
                    level: Math.floor(Math.random() * 11),  // Random skill level between 0-10
                    category: skillCategories[0],
                    user: user._id,
                    isAnInterest: false
                },
                {
                    name: moviesSkills[Math.floor(Math.random() * 2)],
                    level: Math.floor(Math.random() * 11),
                    category: skillCategories[2],
                    user: user._id,
                    isAnInterest: false
                },
                {
                    name: programmingSkills[Math.floor(Math.random() * 4)],
                    level: Math.floor(Math.random() * 11),
                    category: skillCategories[3],
                    user: user._id,
                    isAnInterest: true
                }
            ];

            const skills = await Skill.insertMany(userSkills);

            // Assign skills to the user
            user.skills.push(...skills.map(skill => skill._id));
            user.interests.push(...skills.filter(skill => skill.isAnInterest).map(skill => skill._id));

            await user.save();
        }

        // Create chatrooms between different users and add messages
        const chatroomPairs = [
            [users[0]._id, users[1]._id],
            [users[2]._id, users[3]._id],
            [users[4]._id, users[5]._id],
            [users[6]._id, users[7]._id],
            [users[8]._id, users[9]._id],
            [users[10]._id, users[11]._id]
        ];

        for (let pair of chatroomPairs) {
            const [user1, user2] = pair;

            // Create a chatroom
            const chatroom = new Chatroom({
                user1: user1,
                user2: user2,
                messages: []
            });
            await chatroom.save();

            // Create 4 messages for each chatroom
            const messagesData = [
                { chatroomID: chatroom._id, senderID: user1, sentAt: new Date(), content: "Hello, how are you?" },
                { chatroomID: chatroom._id, senderID: user2, sentAt: new Date(), content: "I'm fine, thanks! What about you?" },
                { chatroomID: chatroom._id, senderID: user1, sentAt: new Date(), content: "Doing great!" },
                { chatroomID: chatroom._id, senderID: user2, sentAt: new Date(), content: "That's awesome!" }
            ];

            const messages = await Message.insertMany(messagesData);

            // Assign messages to the chatroom
            chatroom.messages.push(...messages.map(msg => msg._id));
            await chatroom.save();
        }

        console.log("Database populated with mock data!");
    } catch (err) {
        console.error("Error populating the database:", err);
    } finally {
        // Close connection
        mongoose.connection.close();
    }
};

// Call the function to populate the database
populateDB();
