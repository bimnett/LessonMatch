module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log(`User connected: ${socket.auth}`);
  
        // Event listener that handles joining a chatroom
        socket.on('joinRoom', (chatroomId) => {
            socket.join(chatroomId);
            console.log(`User ${socket.auth} joined chatroom: ${chatroomId}`);
        });
  
        // Event listener that handles receiving a message
        socket.on('sendMessage', (data) => {
            const { chatroomId, content } = data;
  
            // Emit message to other users in the same chatroom
            io.to(chatroomId).emit('message', {
                content
            });
        });

        // Event listener that handles the user disconnecting
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.auth}`);
        });
    });
};