<template>
  <div
    class="message-box"
    :class="{ sent:!isSentByUser, received: isSentByUser }"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <div class="message-content-wrapper">
      <p class="message-content">{{ messageData.content }}</p>
      <span v-if="isSentByUser && hover" class="edit-button" @click="showEditModal">
        <i class="fas fa-edit"></i>
      </span>
    </div>
    <div class="message-footer">
      <p class="message-timestamp">{{ formatTimestamp(messageData.sentAt) }}</p>
    </div>
    
    <b-modal
      id="editModal"
      ref="editModal"
      title="Edit Message"
      header-bg-variant="primary"
      header-text-variant="light"
      @ok="confirmEdit"
      @hidden="resetModal"
    >
      <b-form-input 
        v-model="editedContent"
        class="edit-input"
      />
    </b-modal>
  </div>
</template>

  
  <script>
  export default {
    props: {
      messageData: {
        type: Object,
        required: true
      },
      currentUserId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        hover: false,
        editedContent: this.messageData.content
      }
    },
    computed: {
      isSentByUser() {
        // Handle both cases: when senderID is an object and when it's a string
        const senderId = typeof this.messageData.senderID === 'object' 
          ? this.messageData.senderID._id 
          : this.messageData.senderID;
        
        return senderId === this.currentUserId;
      }
    },
    methods: {
      formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
      },
      showEditModal() {
        this.$refs.editModal.show();
      },
      confirmEdit() {
        this.$emit('edit-message', {
          id: this.messageData._id,
          content: this.editedContent
        });
        this.$refs.editModal.hide();
      },
      resetModal() {
        this.editedContent = this.messageData.content;
      }
    }
  }
  </script>
  
  <style scoped>
.message-box {
  padding: 12px 16px;
  margin: 8px 0;
  border-radius: 20px;
  max-width: 60%;
  word-wrap: break-word;
  position: relative;
  transition: transform 0.2s ease;
}

.message-content-wrapper {
  position: relative;
  margin-bottom: 8px;
}

.sent {
  align-self: flex-end;
  margin-left: auto;
  background: linear-gradient(135deg, rgba(116, 91, 240, 0.1), rgba(93, 73, 192, 0.15));
  border-bottom-right-radius: 8px;
}

.sent .message-content {
  color: #444;
}

.received {
  align-self: flex-start;
  margin-right: auto;
  background: linear-gradient(135deg, rgba(76, 209, 177, 0.1), rgba(68, 172, 147, 0.15));
  border-bottom-left-radius: 8px;
}

.received .message-content {
  color: #444;
}

.message-content {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
}

.message-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}

.message-timestamp {
  font-size: 0.75rem;
  color: #888;
  margin: 0;
}

.edit-button {
  position: absolute;
  top: -20px;
  right: 0;
  background-color: white;
  padding: 4px 8px;
  border-radius: 12px;
  cursor: pointer;
  color: #745bf0;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.edit-button:hover {
  background-color: rgba(116, 91, 240, 0.1);
  color: #5d49c0;
}

.edit-input {
  border: 2px solid rgba(116, 91, 240, 0.3);
  border-radius: 12px;
  padding: 8px 12px;
}

.edit-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(116, 91, 240, 0.1);
}

@media (max-width: 768px) {
  .message-box {
    max-width: 80%;
  }
}

@media (max-width: 480px) {
  .message-box {
    max-width: 90%;
  }
  
  .message-timestamp {
    font-size: 0.7rem;
  }
}
</style>