const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const history = require('connect-history-api-fallback');
const userController = require('./controllers/users');
const messageController = require('./controllers/messages');
const chatroomController = require('./controllers/chatrooms');
const skillController = require('./controllers/skills');

// constiables
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/animalDevelopmentDB';
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(mongoURI).catch(function(err) {
    console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
    console.error(err.stack);
    process.exit(1);
}).then(function() {
    console.log(`Connected to MongoDB with URI: ${mongoURI}`); // mistake when forward porting
});

// Create Express app
const app = express();
// Parse requests of content-type 'application/json'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// HTTP request logger
app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options('*', cors());
app.use(cors());

// Override request method with method in X-HTTP-Method-Override header
app.use(methodOverride('X-HTTP-Method-Override'));

// Include model controllers
app.use('/api', userController);
app.use('/api', messageController);
app.use('/api', chatroomController);
app.use('/api', skillController);

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/*', function (req, res) {
    res.status(404).json({ 'message': 'Not Found' });
});

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
const root = path.normalize(__dirname + '/..');
const client = path.join(root, 'client', 'dist');
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
const env = app.get('env');
// eslint-disable-next-line no-unused-consts
app.use(function(err, req, res, next) {
    console.error(err.stack);
    const err_res = {
        'message': err.message,
        'error': {}
    };
    // Handle Mongoose-specific errors
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        
        res.status(400).json({ message: 'Invalid ID format' });
    } else if (err.name === 'ValidationError') {
        // Mongoose validation error
        res.status(400).json({ message: 'Validation failed', errors: err.errors });
    } else {
    if (env === 'development') {
       
        err_res['error'] = err.stack;
    }
    res.status(err.status || 500);
    res.json(err_res);
}});

app.listen(port, function(err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
