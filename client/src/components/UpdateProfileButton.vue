<template>
  <div>
    <b-button @click="navigateToProfile" variant="link">Edit Profile</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    navigateToProfile() {
      this.$router.push('/profile')
    }
  }
}
</script>

<style scoped>
.b-button {
  color: #6200ea;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  border: none;
  background: none;
}

.b-button:hover {
  color: #3700b3;
}
</style>
