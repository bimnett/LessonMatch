<template>
  <div id="container">
    <div id="title">
      <h1>Sign In Page</h1>
    </div>
      <SignInForm
      @signed-in="handleSignIn"
      />
  </div>
</template>

<script>
import SignInForm from '@/components/SignIn/SignInForm.vue'

export default {
  name: 'Sign In',
  data() {
    return {

    }
  },
  methods: {
    handleSignIn() {
      this.$emit('signed-in');
    }
  },
  components: {
    SignInForm,
  }
}
</script>

<style scoped>

#title {
  padding: 10px 20px;
  border: 2px solid;
  display: inline-block; 
  border-image: linear-gradient(to right, #5C6CD1E3, #4CD1B1E3) 1; 
}

#container {
  margin-top: 30px;
}

</style>
