<template>
    <div v-if="userId">
      <div v-for="message in messages" :key="message._id">
        <p>{{ message.sender.name }}: {{ message.content }}</p>
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
      chatroomId: this.$route.params.id
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
