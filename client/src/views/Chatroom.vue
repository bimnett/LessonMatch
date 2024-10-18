<template>
    <div>
        <h1 v-if="!chatrooms.length">No chats</h1>
        <div v-else>
            <div v-for="(chat, index) in chatrooms" :key="index">
                <router-link :to="{ name: 'PrivateChatroom', params: { id: chat._id } }">
                    {{ chat.name }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import SignIn from '@/components/SignIn/SignInButton.vue'
import socket from '@/socket'
import { getChatrooms } from '@/Api'

export default {
  name: 'Chatroom',
  components: {
    SignIn
  },

  data() {
    return {
      chatrooms: [],
      userId: localStorage.getItem('userId')
    }
  },
  async mounted() {
    if (this.userId) {
      this.connectSocket()
      await this.getChatrooms()
    }
  },
  methods: {
    async getChatrooms() {
      try {
        const response = await getChatrooms(this.userId)
        this.chatrooms = response.data
      } catch (error) {
        console.error('Error fetching chatrooms:', error)
      }
    },
    connectSocket() {
      socket.auth = { userId: this.userId }
      socket.connect()// Listen for incoming messages

      // listen for new chatrooms or updates
      socket.on('new-chatroom', (newChatroom) => {
        this.chatrooms.push(newChatroom)
      })

      socket.on('connect_error', () => {
        console.log('There was an error connecting with the socket.')
      })// You can also listen to other events like 'connect' and 'disconnect'
      socket.on('connect', () => {
        console.log('Connected to the chat server')
      })
    }
  },
  beforeDestroy() {
    if (this.userId) {
    // Clean up socket listeners
      socket.off('new-chatrooms')
      socket.off('message')
      socket.off('connect')
      socket.off('connect_error')

      socket.disconnect()
    }
  }
}
</script>

<style scoped>
</style>
