<template>
    <div class="sign-up-form">
      <h2>Sign Up</h2>
      <form @submit.prevent="submitForm">

        <div class="form-group">
          <label for="name">Name:</label>
          <input v-model="name" type="text" id="name" required />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="email" type="email" id="email" required />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input v-model="password" type="password" id="password" required />
        </div>

        <b-button type="submit" variant="primary">Sign Up</b-button>
      </form>
    </div>
  </template>

<script>
export default {
  name: '',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    submitForm() {
      // Create an object with form data
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      // Reset the form fields
      this.name = ''
      this.email = ''
      this.password = ''

      // Send formData to parent component
      this.$emit('form-data', formData)
    }
  }
}
</script>

  <style scoped>
  .sign-up-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 8px;
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
