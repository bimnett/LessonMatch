<template>
  <div class="chat-input-container">
    <div class="input-wrapper">
      <input
        v-model="message"
        @keyup.enter="submitMessage"
        placeholder="Type your message..."
        class="message-input"
      />
    </div>
    <button
      @click="submitMessage"
      class="send-button"
      :class="{ 'active': message.trim() }"
      :disabled="!message.trim()"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 2L11 13"></path>
        <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ''
    }
  },
  methods: {
    submitMessage() {
      if (!this.message.trim()) return
      this.$emit('send-message', {
        content: this.message,
        sentAt: new Date().toISOString()
      })
      this.message = ''
    }
  }
}
</script>

<style scoped>
.chat-input-container {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
}

.input-wrapper {
  position: relative;
  flex-grow: 1;
  display: flex;
  align-items: center;
  background: linear-gradient(145deg, rgba(92, 108, 209, 0.05), rgba(76, 209, 177, 0.05));
  border-radius: 12px;
  padding: 4px;
}

.message-input {
  flex-grow: 1;
  padding: 12px 16px;
  border: none;
  background: transparent;
  font-size: 0.95rem;
  color: #444;
  transition: all 0.3s ease;
}

.message-input::placeholder {
  color: #999;
}

.message-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.8);
}

.send-button {
  background: linear-gradient(135deg, rgba(116, 91, 240, 0.9), rgba(93, 73, 192, 0.9));
  color: white;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(116, 91, 240, 0.2);
}

.send-button:disabled {
  background: linear-gradient(135deg, rgba(116, 91, 240, 0.3), rgba(93, 73, 192, 0.3));
  cursor: not-allowed;
  box-shadow: none;
}

.send-button.active:hover {
  transform: scale(1.05) rotate(-10deg);
  box-shadow: 0 5px 15px rgba(116, 91, 240, 0.3);
}

.send-button svg {
  width: 20px;
  height: 20px;
  transform: translateX(1px);
}

@media (max-width: 768px) {
  .chat-input-container {
    padding: 6px;
  }
  
  .message-input {
    padding: 10px 14px;
    font-size: 0.9rem;
  }
  
  .send-button {
    width: 40px;
    height: 40px;
  }
  
  .send-button svg {
    width: 18px;
    height: 18px;
  }
}
</style>