<template>
    <div
      class="message-box"
      :class="{ sent: isSentByUser, received: !isSentByUser }"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <p class="message-content">{{ messageData.content }}</p>
      <span v-if="isSentByUser && hover" class="edit-button" @click="showEditModal">Edit</span>
      <p class="message-timestamp">{{ formatTimestamp(messageData.sentAt) }}</p>

      <b-modal
        id="editModal"
        ref="editModal"
        title="Edit Message"
        @ok="confirmEdit"
        @hidden="resetModal"
      >
        <b-form-input v-model="editedContent" />
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
    padding: 10px;
    margin: 5px 0;
    border-radius: 10px;
    max-width: 60%;
    word-wrap: break-word;
    position: relative;
  }
  
  .message-header {
    margin-bottom: 5px;
  }
  
  .sender-name {
    font-weight: bold;
    font-size: 0.9em;
    color: #444;
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
    margin-top: 4px;
  }
  
  .edit-button {
    position: absolute;
    top: 5px;
    right: 10px;
    background-color: #f0f0f0;
    padding: 2px 5px;
    font-size: 0.9em;
    color: blue;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .edit-button:hover {
    background-color: #d1d1d1;
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
      font-size: 0.7em;
    }
  }
  </style>