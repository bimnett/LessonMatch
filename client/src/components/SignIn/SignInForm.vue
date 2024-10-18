<template>
    <div class = "sign-in-form">
        <form v-on:submit.prevent="signIn">
            <input v-model="username" type="text" placeholder="Username" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <button type="submit">Sign In</button>
        </form>
    </div>
</template>

<script>
import { logInUser } from '@/Api'

export default {
  name: 'SignInForm',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async signIn() {
        try {
            const loggedInUser = await logInUser(
                this.username,
                this.password
            );

            if (!loggedInUser){
              window.alert('Invalid username or password. Please try again.')
              this.username = ''
              this.password = ''
            } else {
              console.log('Log-In successful');
              this.$router.push('/');
            }
                        
        } catch (error) {
            console.error(error);
        }
    }
  }
}
</script>

<style scoped>
.sign-in-form {
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