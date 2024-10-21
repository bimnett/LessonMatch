<template>
    <div>
      <b-container id="container">
        <div id="title">
          <h4>Your Chatrooms</h4>
        </div>
        <b-col class="page-content">
            <b-col v-for="chatroom in chatrooms" :key="chatroom._id">
              <ChatroomCard 
                :chatroom="chatroom"
                @click="viewPrivateChatroom(chatroom._id)"/>
            </b-col>
        </b-col>
      </b-container>
    </div>
</template>

<script>
import { getChatroomsOfUser } from '@/Api'
import ChatroomCard from '@/components/Chatrooms/ChatroomCard.vue'

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
    await this.getChatroomsOfUser()
  },
  methods: {
    async getChatroomsOfUser() {
      try {
        const response = await getChatroomsOfUser(this.userId)
        this.chatrooms = response.chatrooms
        console.log("Chatrooms retrieved successfully")

      } catch (error) {
          if (error.response.status === 404) {
            console.log('No chatrooms were found.')
          } else {
            console.log("Error retrieving chatrooms");
          }
      }
    },
    viewPrivateChatroom(chatroomId) {
      this.$router.push(`/chatrooms/${this.userId}/${chatroomId}`)
    }
  }
}
</script>

<style scoped>

.container {
  margin: 30px auto;
}

.page-content{
  margin-top: 30px;
  margin-bottom: 50px;
}

#title {
  padding: 20px;
  border: 2px solid;
  display: inline-block; 
  border-image: linear-gradient(to right, #5C6CD1E3, #4CD1B1E3) 1; 
}


</style>
