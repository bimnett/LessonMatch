<template>
    <div id = "sign-in-form">
        <b-form v-on:submit.prevent="signIn">
            <b-input v-model="username" type="text" placeholder="Username" required />
            <b-input v-model="password" type="password" placeholder="Password" required />
            <b-button type="submit">Sign In</b-button>
            <p>No account?</p>
            <router-link to="/signup">
              <b-button id="sign-up">Sign Up</b-button>
            </router-link>
        </b-form>
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
              this.$emit('signed-in');
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
  #sign-in-form {
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
    background-color: #745bf0;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color:#5d49c0;
  }

  p {
    margin: 12px 0;
    font-size: 0.8rem;
    color: #555;
  }
</style>