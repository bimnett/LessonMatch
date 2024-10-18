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
    }
  }
}
</script>

<style scoped>
</style>
