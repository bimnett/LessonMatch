<template>
  <div class="update-profile-form container">
    <h2>Update Profile</h2>
    <b-form @submit.prevent="submitUpdate">
      <div class="row">
        <div class="col-12 mb-3">
          <label for="username">Username:</label>
          <input v-model="form.username" type="text" class="form-control" id="username" required />
        </div>

        <div class="col-12 mb-3">
          <label for="password">Password:</label>
          <input v-model="form.password" type="password" class="form-control" id="password" required />
        </div>

        <div class="col-12 mb-3">
          <label for="birth_date">Birth Date:</label>
          <input v-model="form.birth_date" type="date" class="form-control" id="birth_date" required />
        </div>

        <div class="col-12 mb-3">
          <label for="location.city">City:</label>
          <input v-model="form.location.city" type="text" class="form-control" id="location.city" required />
        </div>

        <div class="col-12 mb-3">
          <label for="location.country">Country:</label>
          <input v-model="form.location.country" type="text" class="form-control" id="location.country" required />
        </div>

        <div class="col-12 mb-3">
          <label for="skills">Skills:</label>
          <input v-model="form.skills" type="text" class="form-control" id="skills" placeholder="Comma-separated skills" />
        </div>

        <div class="col-12 mb-3">
          <label for="interests">Interests:</label>
          <input v-model="form.interests" type="text" class="form-control" id="interests" placeholder="Comma-separated interests" />
        </div>

        <div class="col-12 d-flex justify-content-between">
          <b-button variant="secondary" @click="$emit('cancel-edit')">Cancel</b-button>
          <b-button type="submit" variant="primary">Save Changes</b-button>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
import { updateUserProfile } from '@/Api'
export default {
  props: {
    initialFormData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: {
        ...this.initialFormData,
        birth_date: this.initialFormData.birth_date ? new Date(this.initialFormData.birth_date).toISOString().split('T')[0] : ''
      }
    }
  },
  methods: {
    async submitUpdate() {
      try {
        const userId = localStorage.getItem('userId')
        if (!userId) {
          throw new Error('User ID not found')
        }

        // Call the update function from the API
        const response = await updateUserProfile(userId, this.form)

        // Emit the updated data back to the parent component
        this.$emit('update-profile', response)
        this.$router.push(`/profile/${userId}`)
      } catch (error) {
        console.error('Error updating profile:', error)
        this.$bvToast.toast('Error updating profile', {
          title: 'Error',
          variant: 'danger',
          solid: true
        })
      }
    }
  }
}
</script>

<style scoped>
.update-profile-form {
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: linear-gradient(to bottom right, #e0f7fa, #bbdefb);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

h2 {
  color: #6200ea;
  text-align: center;
}

label {
  margin-bottom: 5px;
  color: #6200ea;
}

input {
  padding: 10px;
  border: 1px solid #6200ea;
  border-radius: 4px;
  transition: border 0.3s ease;
}

input:focus {
  border-color: #03a9f4;
  outline: none;
}

button {
  padding: 10px;
  background-color: #6200ea;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3700b3;
}

@media (max-width: 768px) {
  .update-profile-form {
    padding: 15px;
  }
  h2 {
    font-size: 1.5rem;
  }
}

</style>
