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
          console.log('Message received on server:', message);
            const newMessage = {
                content: message.content,
                chatroomId,
                sentAt: new Date(),
                senderID: socket.auth.userId 
              };
  
            // Emit message to other users in the same chatroom
            io.to(chatroomId).emit('message', newMessage);
            
            try {
                await createMessage({
                  content: newMessage.content,
                  chatroomId: newMessage.chatroomId,
                  senderID: newMessage.senderID,
                  sentAt: newMessage.sentAt
                });
                console.log('Message saved to database');
              } catch (error) {
                console.error('Error saving message to the database:', error);
              }
        });

        // Event listener that handles the user disconnecting
        socket.on('disconnect', () => {
            console.log('User disconnected!');
        });
    });
};