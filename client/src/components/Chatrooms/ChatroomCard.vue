<template>
  <b-card class="card">
   <b-row id="card-content">
      <b-col cols="auto">
        <b-avatar
          :text="getInitials()"
          size="4rem"
          variant="info"
          id="avatar"
        ></b-avatar>
      </b-col>
      <b-col>
        <h4 id="username">{{ getUsername() }}</h4>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: 'ChatroomCard',
  props: {
    chatroom: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      userId: localStorage.getItem('userId')
    }
  },
  methods: {
    getInitials() {
      const username = this.getUsername();
      return username.charAt(0).toUpperCase();
    },
    getUsername() {
      if (this.chatroom.user1._id === this.userId){
        return this.chatroom.user2.username
      } else {
        return this.chatroom.user1.username
      }
    }
  }
};
</script>

<style scoped>

.card {
  max-width: 600px;
  margin: auto;
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  align-items: flex-start;
}

#username {
  margin-top: 20px;
  margin-left: 15px;
}

#avatar {
  background: linear-gradient(#5C6CD1E3, #4CD1B1E3);
}
</style>
