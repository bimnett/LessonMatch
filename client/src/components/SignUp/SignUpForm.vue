<template>
    <div class = "sign-up-form">
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
  name: 'OriginalSignUpForm',
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
.sign-up-form {
    max-width: 400px;
    margin: 0 auto;
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>