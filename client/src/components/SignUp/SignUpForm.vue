<template>
  <div class="container">
    <div id = "sign-up-form">
        <b-form v-on:submit.prevent="register">
            <b-input v-model="username" type="text" placeholder="Username" required />
            <b-input v-model="password" type="password" placeholder="Password" required />
            <b-input v-model="birth_date" type="date" placeholder="Birth Date" required />
            <b-input v-model="location.city" type="text" placeholder="City" required />
            <b-input v-model="location.country" type="text" placeholder="Country" required />
            <b-button type="submit">Sign up</b-button>
            <p>Already have an account?</p>
            <router-link to="/signin">
              <b-button id="sign-in">Sign In</b-button>
            </router-link>
        </b-form>
    </div>
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
          const registeredUser = await registerUser (
              this.username,
              this.password,
              this.birth_date,
              this.location
          );

          if (!registeredUser){
            window.alert('This username has been taken. Please try again.')
            this.username = ''
          } else {
            console.log('Registration successful');
            await logInUser(
              this.username,
              this.password
            );
            console.log('Log-In successful');
            this.$emit('signed-in');
            this.$emit('show-modal');
          }
        } catch (error) {
            console.error(error);
        }
    }
  }
}
</script>

<style scoped>
  #sign-up-form {
    max-width: 400px;
    margin: 0 auto;
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-bottom: 30px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
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

  @media only screen and (max-width: 768px) {
    #sign-up-form {
    width: 100%;
    }
  }
</style>