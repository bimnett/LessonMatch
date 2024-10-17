<template>
    <div class="chat-input">
      <input v-model="message" @keyup.enter="submitMessage" placeholder="Type your message..." />
      <button @click="submitMessage">Send</button>
    </div>
  </template>

<script>
export default {
  props: {
    chatroomId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      message: ''
    }
  },
  methods: {
    submitMessage() {
      if (!this.message.trim()) return

      this.$emit('send-message', {
        chatroomId: this.chatroomId,
        content: this.message
      })

      this.message = ''
    }
  }
}
</script>

  <style scoped>
  .chat-input {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .chat-input input {
    flex-grow: 1;
    padding: 8px;
  }
  .chat-input button {
    padding: 8px 16px;
  }
  </style>
