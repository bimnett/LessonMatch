<template>
  <div>
      <h1>Sign In Page</h1>
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

<style>

</style>
