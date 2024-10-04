<template>
    <div class = "sign-up-form">
        <h1>Sign Up Page</h1>
        <form v-on:submit.prevent="register">
            <input v-model="username" type="text" placeholder="Username" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <input v-model="birth_date" type="date" placeholder="Birth Date" required />
            <input v-model="location.city" type="text" placeholder="City" required />
            <input v-model="location.country" type="text" placeholder="Country" required />
            <button type="submit">Sign up</button>
        </form>
    </div>
</template>

<script>
import { registerUser } from '@/Api'
import { logInUser } from '@/Api'

export default {
  name: 'Sign Up',
  data() {
    return {
      username: '',
      password: '',
      birth_date: '',
      location: {
        city: '',
        country: ''
      }
    }
  },
  methods: {
    async register() {
        try {
            await registerUser(
                this.username,
                this.password,
                this.birth_date,
                this.location
            );
            console.log('Registration successful');
            await logInUser(
                this.username,
                this.password
            );
            console.log('Log-In successful');

            // TODO - Implement HATEOAS

            this.$router.push('/');
            
        } catch (error) {
            console.error(error);
        }
    }
  }
}
</script>

<style scoped>

</style>
