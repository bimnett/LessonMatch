<template>
  <div>
    <div class="chat-header" @click="goToUserProfile">
      <h3>{{ recipientUserName }}</h3>
    </div>
    <div ref="messageContainer" class="messages-container" @scroll="onScroll">
      <div v-for="message in messages" :key="message._id">
        <Message :messageData="message" :currentUserId="userId" @edit-message="handleEditMessage"/>
      </div>
    </div>
    <ChatInput @send-message="sendMessage" />
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
  computed: {
    orderedMessages() {
      return this.messages.slice().reverse();
    }
  },
  async mounted() {
    if (this.userId) {
      await this.getChatroomData();
      this.connectSocket();
      await this.getMessages(); // Load initial messages
    }
  },
  methods: {
    async getChatroomData() {
      try {
        const response = await getChatroomById(this.chatroomId);
        if (response) {
          this.chatroomData = response;

          if (this.chatroomData.user1 !== this.userId) {
            this.recipientId = this.chatroomData.user1;
          } else {
            this.recipientId = this.chatroomData.user2;
          }

          const recipientProfile = await getUserProfile(this.recipientId);
          this.recipientUserName = recipientProfile.username;
          socket.emit('joinRoom', this.chatroomId);
        }
      } catch (error) {
        console.error('Error getting chatroom data or user profile:', error);
      }
    },
    async getMessages(page = 1) {
      if (this.loadingMessages || this.allMessagesLoaded) return;
      this.loadingMessages = true;

      try {
        const response = await getMessages(this.chatroomId, page, 10);
        console.log('Get Messages Response:', response);
        const newMessages = response.message;

        if (newMessages.length === 0) {
          this.allMessagesLoaded = true;
        } else {
          // Add new messages to the beginning of the array
          this.messages = [...newMessages, ...this.messages];
          this.currentPage = page;
          
          // Scroll to bottom only on initial load (page 1)
          if (page === 1) {
            this.scrollToBottom();
          } else {
            // Maintain scroll position when loading older messages
            this.$nextTick(() => {
              const container = this.$refs.messageContainer;
              container.scrollTop = newMessages.length * 20; // Approximate height of a message
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
      const container = this.$refs.messageContainer;
      if (container.scrollTop <= 100 && !this.loadingMessages && !this.allMessagesLoaded) {
        console.log('Loading more messages...');
        this.loadMoreMessages();
      }
    },
    loadMoreMessages() {
      const nextPage = this.currentPage + 1;
      this.getMessages(nextPage);
    },
    connectSocket() {
      socket.auth = { userId: this.userId };
      socket.connect();

      socket.on('message', (message) => {
        console.log('Received message:', message);
        this.messages.push(message);
        this.scrollToBottom();
      });

      socket.on('connect', () => {
        socket.emit('joinRoom', this.chatroomId);
        console.log('Connected to the chat server');
      });

      socket.on('emitEditMessage', (editedMessage) => {
        // Handle message edit event
      });

      socket.on('connect_error', () => {
        console.log('There was an error connecting with the socket.');
      });
      socket.on('disconnect', () => {
        console.log('Disconnected from chat server');
      });
    },
    async handleEditMessage({ id, content }) {
      try {
        const updatedMessage = await editMessage(id, content);

        const index = this.messages.findIndex(msg => msg._id === id);
        if (index !== -1) {
          this.messages[index].content = updatedMessage.content;
        }

        socket.emit('onEditMessage', updatedMessage);
      } catch (error) {
        console.error('Error editing message:', error);
      }
    },
    scrollToBottom() {
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
          };
          console.log('Saved message:', savedMessage);
          
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
      this.$router.push(`/profile/${this.recipientId}`);
    }
  },
  beforeDestroy() {
    if (this.userId) {
      socket.off('message');
      socket.disconnect();
    }
  }
};
</script>

<style scoped>
.messages-container {
  display: flex;
  flex-direction: column;
  padding: 10px;
  max-height: 70vh;
  overflow-y: auto;
  scroll-behavior: smooth;
}
.message-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.chat-header {
  background-color: #6200ea;
  color: #fff;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: background-color 0.3s;
}
.chat-header:hover {
  background-color: #3700b3;
}
.message-box {
  padding: 10px;
  margin: 5px 0;
  border-radius: 10px;
  max-width: 60%;
  word-wrap: break-word;
}

.sent {
  align-self: flex-end;
  background-color: #eabff3;
}

.received {
  align-self: flex-start;
  background-color: #b7e7ef;
}

.message-content {
  margin: 0;
}

.message-timestamp {
  font-size: 0.8em;
  text-align: right;
  color: #666;
}
.chat-input {
  position: sticky;
  bottom: 0;
  width: 100%;
}
@media (max-width:768px) {
  .message-box {
    max-width: 80%;
  }
  .messages-container {
    padding: 5px;
  }
}
@media (max-width:480px) {
  .message-box {
    max-width: 90%;
  }
  .message-timestamp {
    font-size: 0.7em;
  }
}
</style>