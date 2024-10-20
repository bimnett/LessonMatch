module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('User connected!');
  
        // Event listener that handles joining a chatroom
        socket.on('joinRoom', (chatroomId) => {
            socket.join(chatroomId);
            console.log('User joined a chatroom!');
        });
  
        // Event listener that handles receiving a message
        socket.on('sendMessage', (chatroomId, content) => {
  
            // Emit message to other users in the same chatroom
            io.to(chatroomId).emit('message', {
                content
            });
        });

        // Event listener that handles the user disconnecting
        socket.on('disconnect', () => {
            console.log('User disconnected!');
        });
    });
};