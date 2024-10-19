<template>
    <div>
      <div v-if="!authenticate">
        <router-link to="/signin"/>
      </div>
      <div v-else>
        <b-col class="page-content">
          <h3 id="title">Chatrooms</h3>
          <b-col v-for="chatroom in chatrooms" :key="chatroom._id">
            <ChatroomCard 
              :chatroom="chatroom"
              @click="viewPrivateChatroom(chatroom._id)"/>
          </b-col>
        </b-col>
      </div>
    </div>
</template>

<script>
import { getChatroomsOfUser } from '@/Api'
import ChatroomCard from '@/components/Chatroom/ChatroomCard.vue'

export default {
  name: 'Chatroom',
  components: {
    ChatroomCard
  },
  data() {
    return {
      chatrooms: [],
      userId: localStorage.getItem('userId'),
    }
  },
  async mounted() {
    if (this.authenticate) {
      await this.getChatroomsOfUser()
    }
  },
  methods: {
    authenticate() {
      return this.userId
    },
    async getChatroomsOfUser() {
      try {
        const response = await getChatroomsOfUser(this.userId)
        this.chatrooms = response.chatrooms
        console.log("Chatrooms retrieved successfully")
        console.log(this.chatrooms)

      } catch (error) {
        console.error('Error fetching chatrooms:', error)
      }
    },
    viewPrivateChatroom(chatroomId) {
      this.$router.push(`/chatrooms/${this.userId}/${chatroomId}`)
    }
  }
}
</script>

<style scoped>

.page-content{
  margin-top: 30px;
}

#title {
  margin-bottom: 30px;
}
</style>
