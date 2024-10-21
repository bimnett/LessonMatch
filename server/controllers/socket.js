module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('User connected!');
  
        // Event listener that handles joining a chatroom
        socket.on('joinRoom', (chatroomId) => {
            socket.join(chatroomId);
            console.log('User joined a chatroom!');
        });
  
        // Event listener that handles receiving a message
        socket.on('sendMessage', async (chatroomId, message) => {
  
            // Emit message to other users in the same chatroom
            io.to(chatroomId).emit('message', message);
        });

        socket.on('onEditMessage', (chatroomId, editedMessage) => {
          io.to(chatroomId).emit('emitEditMessage', editedMessage)
        })

        // Event listener that handles the user disconnecting
        socket.on('disconnect', () => {
            console.log('User disconnected!');
        });
    });
};