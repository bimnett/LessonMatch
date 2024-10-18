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
      socket.auth = { userId: this.userId }
      socket.connect()

      socket.on('message', (message) => {
        this.messages.push(message)
      })
      socket.on('connect_error', () => {
        console.log('There was an error connecting with the socket.')
      })// You can also listen to other events like 'connect' and 'disconnect'
      socket.on('connect', () => {
        console.log('Connected to the chat server')
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
  flex-direction: column;
  padding: 10px;
  max-height: 70vh;
  overflow-y: auto;
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
