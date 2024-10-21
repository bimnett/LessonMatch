<template>
  <div>
      <h1>Sign Up Page</h1>
      <OriginalSignUpForm
      @signed-in="handleSignIn"
      />
  </div>
</template>

<script>
import OriginalSignUpForm from '@/components/SignUp/SignUpForm.vue'

export default {
  name: 'Sign Up',
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
    OriginalSignUpForm,
  }
}
</script>

<style>

</style>
