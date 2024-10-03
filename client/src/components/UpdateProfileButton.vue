<template>
    <div class="update-profile-button">
      <b-button @click="navigateToUpdate" variant="primary" class="update-button">
        Update Profile
      </b-button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      navigateToUpdate() {
        this.$router.push('/update-profile');
      }
    }
  }
  </script>
  
  <style scoped>
  .update-profile-button {
    text-align: center;
    margin-top: 20px;
  }
  
  .update-button {
    background-color: #6200ea;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .update-button:hover {
    background-color: #3700b3;
  }
  </style>
  