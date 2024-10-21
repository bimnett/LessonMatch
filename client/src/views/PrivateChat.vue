<template>
  <div>
    <div class="chat-header" @click="goToUserProfile">
      <h3>{{ recipientUserName }}</h3>
    </div>
    <div class="message-container" ref="messageContainer" @scroll="onScroll">
      <div v-for="message in messages" :key="message._id" :class="messageClass(message)">
        <p class="message-content">{{ message.name }}: {{ message.content }}</p>
        <p class="message-timestamp">{{ formatTimestamp(message.sentAt) }}</p>
      </div>
    </div>
    <ChatInput @send-message="sendMessage" />
  </div>
</template>

<script>
import ChatInput from '@/components/Chatroom/ChatInput.vue'
import socket from '@/socket'
import { getMessages, createMessage, getChatroomById, getUserProfile } from '@/Api'

export default {
  components: {
    ChatInput
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
      chatroomData: null
    }
  },
  async mounted() {
    if (this.userId) {
      await this.getChatroomData()
      this.connectSocket()
      await this.getMessages()
    }
  },
  methods: {
    async getChatroomData() {
      try {
        const response = await getChatroomById(this.chatroomId)
        if (response) {
          this.chatroomData = response

          if (this.chatroomData.user1 !== this.userId) {
            this.recipientId = this.chatroomData.user1
          } else {
            this.recipientId = this.chatroomData.user2
          }

          const recipientProfile = await getUserProfile(this.recipientId)
          console.log(recipientProfile)
          this.recipientUserName = recipientProfile.username
          socket.emit('joinRoom', this.chatroomId)
        }
      } catch (error) {
        console.error('Error getting chatroom data or user profile:', error)
      }
    },
    async getMessages(page = 1) {
      if (this.loadingMessages || this.allMessagesLoaded) return
      this.loadingMessages = true

      try {
        const response = await getMessages(this.chatroomId, page)

        console.log('Get Messages Response:', response)
        const newMessages = response.message

        if (newMessages.length === 0) {
          this.allMessagesLoaded = true
        } else {
          this.messages = [...newMessages, ...this.messages]
          this.currentPage = page
        }
      } catch (error) {
        console.error('Error getting messages:', error)
      } finally {
        this.loadingMessages = false
      }
    },
    connectSocket() {
      socket.auth = { userId: this.userId }
      socket.connect()

      socket.on('message', (message) => {
        console.log('Received message:', message)
        this.messages.push(message)
      })

      socket.on('connect', () => {
        console.log('Connected to the chat server')
      })

      socket.on('connect_error', () => {
        console.log('There was an error connecting with the socket.')
      })
      socket.on('disconnect', () => {
        console.log('Disconnected from chat server')
      })
    },
    async sendMessage(messageData) {
      try {
        const response = await createMessage(this.chatroomId, this.userId, messageData.sentAt, messageData.content)
        console.log(response)
        if (response && response.data) {
          const savedMessage = response.data
          this.messages.push(savedMessage
          )

          // Emit the message through the socket to other users
          socket.emit('sendMessage', this.chatroomId, savedMessage)
        }
      } catch (error) {
        console.error('Error sending message:', error)
      }
    },

    messageClass(message) {
      return {
        messageBox: true,
        sent: message.senderID !== this.userId,
        received: message.senderID === this.userId
      }
    },
    formatTimestamp(timestamp) {
      const date = new Date(timestamp)
      return date.toLocaleString()
    },
    goToUserProfile() {
      this.$router.push(`/profile/${this.recipientId}`)
    },
    async onScroll() {
      const container = this.$refs.messageContainer
      if (container.scrollTop === 0 && !this.loadingMessages && !this.allMessagesLoaded) {
        const nextPage = this.currentPage + 1
        await this.getMessages(nextPage)
        this.$nextTick(() => {
          container.scrollTop = 10
        })
      }
    }
  },

  beforeDestroy() {
    if (this.userId) {
      socket.off('message')
      socket.disconnect()
    }
  }
}
</script>

<style scoped>
.messages-container {
  display: flex;
  flex-direction: column-reverse;
  padding: 10px;
  max-height: 70vh;
  overflow-y: auto;
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
  width:100%;
}
@media (max-width:768px) {
  .message-box{
    max-width: 80%;
  }
  .messages-container {
    padding: 5px;
  }
}
@media (max-width:480px){
  .message-box {
    max-width: 90%;
  }
  .message-timestamp{
    font-size: 0.7em;
  }
}
</style>
