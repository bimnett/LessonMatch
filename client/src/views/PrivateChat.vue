<template>
    <div v-if="userId">
      <div class="message-container">
      <div v-for="message in messages" :key="message._id" :class="messageClass(message)">
        <p class="message-content">{{ message.sender.name }}: {{ message.content }}</p>
     <p class="message-timestamp">{{ formatTimestamp(message.sentAt) }}</p>
      </div>
      </div>
      <ChatInput :chatroomId="chatroomId" @send-message="sendMessage"/>
    </div>
    <div v-else>
      <SignIn />
    </div>
  </template>

<script>
import ChatInput from '@/components/ChatInput.vue'
import socket from '@/socket'
import { getMessages, createMessage } from '@/Api'

export default {
  components: {
    ChatInput
  },
  data() {
    return {
      messages: [],
      userId: localStorage.getItem('userId'),
      chatroomId: this.$route.params.chatroomId
    }
  },
  async mounted() {
    if (this.userId) {
      this.connectSocket()
      await this.getMessages()
    }
  },
  methods: {
    async getMessages() {
      try {
        const response = await getMessages(this.chatroomId)
        this.messages = response.data
      } catch (error) {
        console.error('Error getting messages:', error)
      }
    },
    connectSocket() {
      socket.connect()

      socket.on('connect', () => {
        console.log('Connected to the chat server')
      })

      socket.on('connect_error', () => {
        console.log('There was an error connecting with the socket.')
      })

      socket.on('message', (message) => {
        this.messages.push(message)
      })
    },
    async sendMessage(messageData) {
      try {
        await createMessage(messageData)
      } catch (error) {
        console.error('Error sending message:', error)
      }
    },

    messageClass(message) {
      return {
        messageBox: true,
        sent: message.sender._id === this.userId,
        recived: message.sender._id !== this.userId
      }
    },
    formatTimestamp(timestamp) {
      const date = new Date(timestamp)
      return date.toLocaleString()
    },
    beforeDestroy() {
      // Clean up socket listeners
      socket.off('message')
      socket.off('connect')
      socket.off('connect_error')

      socket.disconnect()
    }
  }
}
</script>
<style scoped>
.messages-container {
  display: flex;
  flex-direction: column;
  padding: 10px;
  max-height: 80vh;
  overflow-y: auto;
}

.message-box {
  padding: 10px;
  margin: 5px 0;
  border-radius: 10px;
  max-width: 60%;
}

.sent {
  align-self: flex-end;
  background-color: #dcf8c6;
}

.received {
  align-self: flex-start;
  background-color: #f1f0f0;
}

.message-content {
  margin: 0;
}

.message-timestamp {
  font-size: 0.8em;
  text-align: right;
  color: #666;
}
</style>
