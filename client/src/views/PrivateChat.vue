<template>
  <div class="chat-container">
    <div class="chat-header" @click="goToUserProfile">
      <h3>{{ recipientUserName }}</h3>
    </div>
    <div ref="messageContainer" class="messages-container" @scroll="onScroll">
      <div v-for="message in messages" :key="message._id">
        <Message :messageData="message" :currentUserId="userId" @edit-message="handleEditMessage"/>
      </div>
    </div>
    <div class="input-container">
      <ChatInput @send-message="sendMessage" class="chat-input">
        <template #send-button>
          <button class="send-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 2L11 13"></path>
              <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
            </svg>
          </button>
        </template>
      </ChatInput>
    </div>
  </div>
</template>

<script>
import ChatInput from '@/components/Chatrooms/ChatInput.vue';
import socket from '@/socket'
import { getMessages, createMessage, getChatroomById, getUserProfile, editMessage } from '@/Api'
import Message from '@/components/Chatrooms/Message.vue';

export default {
  components: {
    ChatInput,
    Message
  },
  data() {
    return {
      messages: [],
      userId: localStorage.getItem('userId'),
      chatroomId: this.$route.params.chatroomId,
      recipientId: '',
      recipientUserName: '',
      currentPage: 1,
      allMessagesLoaded: false,
      loadingMessages: false,
      chatroomData: null,
    }
  },
  async mounted() {
    // When component is mounted, load chatroom data and connect to the socket
    if (this.userId) {
      await this.getChatroomData();
      this.connectSocket();
      await this.getMessages(); // Load initial messages
    }
  },
  methods: {
    async getChatroomData() {
       // Fetch chatroom data and recipient profile
      try {
        const response = await getChatroomById(this.chatroomId);
        if (response) {
          this.chatroomData = response;

          // Determine the recipient based on user IDs
          if (this.chatroomData.user1 !== this.userId) {
            this.recipientId = this.chatroomData.user1;
          } else {
            this.recipientId = this.chatroomData.user2;
          }
          // Fetch the recipient's profile
          const recipientProfile = await getUserProfile(this.recipientId);
          this.recipientUserName = recipientProfile.username;
           // Join the chatroom through the socket
          socket.emit('joinRoom', this.chatroomId);
        }
      } catch (error) {
        console.error('Error getting chatroom data or user profile:', error);
      }
    },
    async getMessages(page = 1) {
       // Fetch messages for the chatroom
      if (this.loadingMessages || this.allMessagesLoaded) return;
      this.loadingMessages = true;

      try {
        const response = await getMessages(this.chatroomId, page, 10);
        console.log('Get Messages Response:', response);
        const newMessages = response.message.reverse();
        // Check if there are new messages
        if (newMessages.length === 0) {
          this.allMessagesLoaded = true;
        } else {
          // Add new messages to the end of the array (older messages first)
          this.messages = [...newMessages, ...this.messages];
          this.currentPage = page;
          
          // Scroll to bottom only on initial load (page 1)
          if (page === 1) {
            this.scrollToBottom();
          } else {
            // Maintain scroll position when loading older messages
            this.$nextTick(() => {
              const container = this.$refs.messageContainer;
              container.scrollTop = container.scrollHeight - container.clientHeight - (newMessages.length * 20); // Approximate height of a message
            });
          }
        }
      } catch (error) {
        console.error('Error getting messages:', error);
      } finally {
        this.loadingMessages = false;
      }
    },
    onScroll() {
      // Handle scroll event to load more messages
      const container = this.$refs.messageContainer;
      if (container.scrollTop <= 100 && !this.loadingMessages && !this.allMessagesLoaded) {
        this.loadMoreMessages();
      }
    },
    loadMoreMessages() {
      // Load more messages from the next page
      const nextPage = this.currentPage + 1;
      this.getMessages(nextPage);
    },
    connectSocket() {
       // Connect to socket and set up event listeners
      socket.auth = { userId: this.userId };
      socket.connect();

      socket.on('message', (message) => {
         // Add received message to messages array
       
        this.messages.push(message);
        this.scrollToBottom();
      });

      socket.on('connect', () => {
        // Join the chatroom upon successful connection
        socket.emit('joinRoom', this.chatroomId);
      });

      socket.on('emitEditMessage', (editedMessage) => {
        // Handle message edit event
        const index = this.messages.findIndex(msg => msg._id === editedMessage._id);
        if (index !== -1) {
          this.messages[index] = editedMessage;
        }
      });
      // Handle socket connection errors
      socket.on('connect_error', () => {
        console.log('There was an error connecting with the socket.');
      });
      socket.on('disconnect', () => {
        console.log('Disconnected from chat server');
      });
    },
    async handleEditMessage({ id, content }) {
      // Handle message editing
      try {
        const updatedMessage = await editMessage(id, content);

        const index = this.messages.findIndex(msg => msg._id === id);
        if (index !== -1) {
          this.messages[index].content = updatedMessage.content;
        }

        // Emit the edited message through socket
        socket.emit('onEditMessage', updatedMessage);
      } catch (error) {
        console.error('Error editing message:', error);
      }
    },
    scrollToBottom() {
       // Scroll the message container to the bottom
      this.$nextTick(() => {
        const container = this.$refs.messageContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },
    async sendMessage(messageData) {
      try {
        const response = await createMessage(this.chatroomId, this.userId, messageData.sentAt, messageData.content);
        if (response && response.data) {
          const savedMessage = {
            ...response.data,
            senderID: {
              _id: this.userId 
            }
          }

          // Emit to socket
          socket.emit('sendMessage', this.chatroomId, savedMessage);
          
          // Scroll to bottom after message is added
          this.scrollToBottom();
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    },
    goToUserProfile() {
      // Navigate to the recipient's profile
      this.$router.push(`/profile/${this.recipientId}`);
    }
  },
  beforeDestroy() {
    // Clean up socket listeners before component is destroyed
    if (this.userId) {
      socket.off('message');
      socket.off('connect');
      socket.off('emitEditMessage');
      socket.off('connect_error');
      socket.off('disconnect');
      socket.disconnect();
    }
  }
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  max-height: 70vh;
  overflow-y: auto;
  scroll-behavior: smooth;
  height: 100vh;
  background: linear-gradient(145deg, rgba(92, 108, 209, 0.05), rgba(76, 209, 177, 0.05));
  padding: 20px;
}
.message-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.chat-header {
  background: linear-gradient(to right, #5C6CD1E3, #4CD1B1E3);
  padding: 15px 25px;
  border-radius: 16px;
  margin-bottom: 20px;
  cursor: pointer;
  box-shadow: 0 3px 15px rgba(92, 108, 209, 0.15);
  transition: all 0.3s ease;
}

.chat-header:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(116, 91, 240, 0.2);
}

.chat-header h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.messages-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
  border-radius: 20px;
  margin-bottom: 20px;
  overflow-y: auto;
  scroll-behavior: smooth;
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.05);
}

.input-container {
  position: sticky;
  bottom: 0;
  width: 100%;
  background: white;
  border-radius: 16px;
  padding: 15px;
  box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.05);
}

.send-button {
  background: linear-gradient(135deg, #745bf0, #5d49c0);
  color: white;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(116, 91, 240, 0.2);
}

.send-button:hover {
  transform: scale(1.05) rotate(-10deg);
  box-shadow: 0 5px 15px rgba(116, 91, 240, 0.3);
}

.send-button svg {
  width: 20px;
  height: 20px;
  transform: translateX(1px);
}

@media (max-width: 768px) {
  .chat-container {
    padding: 10px;
  }
  
  .messages-container {
    display:  flex;
flex-direction: column;
    padding: 15px;
  }
  .messages-container > div {
  width: 100%;
  display: flex;
  flex-direction: column;
}
}
</style>