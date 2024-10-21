<template>
    <b-button 
      v-if="isOwnProfile" 
      variant="danger" 
      class="sign-out-button" 
      @click="signOut">
      Sign Out
    </b-button>
</template>
  
<script>
  export default {
    name: 'SignOutButton',
    props: {
      isOwnProfile: {
        type: Boolean,
        required: true,
      }
    },
    methods: {
      async signOut() {
        try {
          // Emit an event to notify parent about sign out
          this.$emit('signed-out');
        } catch (error) {
          console.error(error);
        }
      } 
    }   
  }   
  </script>
  
  <style scoped>
  .sign-out-button {
    position: absolute;
    top: 10px;
    right: 10px;
  }
</style>