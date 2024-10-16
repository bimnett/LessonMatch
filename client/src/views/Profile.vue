<template>
 <div v-if="userId" class="container">
    <h1 class="text-center"> Your Profile</h1>
    <div class="row">
      <div class="col-md-6 offset-md-3"></div>
    <div v-if="!editMode" class="profile-info">
      <p><strong>Username:</strong> {{ form.username }}</p>
      <p><strong>Birth Date:</strong> {{ form.birth_date }}</p>
      <p><strong>City:</strong> {{ form.location.city }}</p>
      <p><strong>Country:</strong> {{ form.location.country }}</p>
      <p><strong>Skills:</strong> <ul> <li v-for= "skill in skills" :key="skill._id">{{ skill.name }} (Level: {{ skill.level }}, Category: {{ skill.category }})</li></ul></p>
      <p><strong>Interests:</strong> <ul> <li v-for= "interest in interests" :key="interest._id">{{ interest.name }} (Level: {{ interest.level }}, Category: {{ interest.category }})</li></ul></p>

      <b-button @click="editMode = true" variant="link">Edit Profile</b-button>
      <div>
        <b-button @click="showConfirmDelete = !showConfirmDelete" variant="danger">Delete Profile</b-button>

           <div v-show="showConfirmDelete" class="mt-2">
          <p>Are you sure you want to delete your profile? This action cannot be undone.</p>
          <div class="checkbox-bar">
        <b-form-checkbox v-model="confirmedDelete">
          I understand the consequences.
        </b-form-checkbox>
        </div>
      <div class="button-group mt-2">
          <b-button
            @click="confirmDeleteProfile"
            variant="danger"
            :disabled="!confirmedDelete"
          >Yes, Delete My Profile</b-button>

          <b-button @click="cancelDelete" variant="secondary">Cancel</b-button>

        </div>
      </div>

    </div>
    </div>

    <div v-else>
      <UpdateProfileForm
        :initialFormData="form"
        @update-profile="handleUpdateProfile"
        @cancel-edit="editMode = false"
      />
    </div>
  </div>
 </div>
  <div v-else>
    <SignIn/>
  </div>

</template>

<script>
import { getUserProfile, deleteUserProfile, getUserSkills, getUserInterests, getUserProfileHyperlink } from '@/Api'
import UpdateProfileForm from '@/components/UpdateProfileForm.vue'
import SignIn from '@/components/SignIn/SignInButton.vue'

export default {
  components: {
    UpdateProfileForm,
    SignIn
  },
  data() {
    return {
      editMode: false,
      userId: localStorage.getItem('userId'),
      hyperlink: localStorage.getItem('hyperlink'),
      form: {
        username: '',
        password: '',
        birth_date: '',
        location: {
          city: '',
          country: ''
        },
        skills: [],
        interests: []
      },
      skills: [],
      interests: [],
      showConfirmDelete: false,
      confirmedDelete: false
    }
  },
  methods: {
    async handleUpdateProfile(updatedData) {
      try {
        if (!this.userId) throw new Error('User not found')
        this.form = { ...this.form, ...updatedData }
        window.alert('Your profile has been updated successfully!')

        this.editMode = false
      } catch (error) {
        console.error('Error updating profile:', error)
        window.alert('error updating profile!')
      }
    },
    async confirmDeleteProfile() {
      try {
        if (!this.userId) throw new Error('User not found')

        await deleteUserProfile(this.userId)
        window.alert('Profile deleted successfully!')
        localStorage.removeItem('userId')
        this.$router.push({ name: 'Home' })
      } catch (error) {
        console.error('Error deleting profile:', error)
        window.alert('Error deleting profile')
      }
    },
    cancelDelete() {
      this.showConfirmDelete = false
      this.confirmedDelete = false
    },
    async fetchSkillsAndInterests(userId) {
      try {
        const skillsResponse = await getUserSkills(userId)
        this.skills = skillsResponse

        const interestsResponse = await getUserInterests(userId)
        this.interests = interestsResponse
      } catch (error) {
        console.error('Error fetching skills or interests:', error)
        window.alert('Error fetching skills or intrest')
      }
    }
  },
  async mounted() {
    try {
      if (this.hyperlink) {
        const response = await getUserProfileHyperlink(this.hyperlink)
        this.form = { ...this.form, ...response }// Set the form data with the response data
        localStorage.removeItem('hyperlink')
      } else if (this.userId) {
        const response = await getUserProfile(this.userId)
        this.form = { ...this.form, ...response }// Set the form data with the response data
      }
      if (!this.form.location) {
        this.form.location = { city: '', country: '' }
      }
      await this.fetchSkillsAndInterests(this.userId)
    } catch (error) {
      console.error('Error fetching user data:', error)
      window.alert('Error fetching user data')
    }
  }
}
</script>
<style scoped>
@media (max-width: 768px) {
  .profile-info p {
    font-size: 0.9rem;
  }
}
</style>
