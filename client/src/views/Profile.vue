<template>
  <div>
    <h1>Your Profile</h1>

    <div v-if="!editMode">
      <p><strong>Username:</strong> {{ form.username }}</p>
      <p><strong>Password:</strong> {{ form.password }}</p>
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
          <b-button
            @click="confirmDeleteProfile"
            variant="danger"
            :disabled="!confirmedDelete"
          >Yes, Delete My Profile</b-button>

          <b-button @click="cancelDelete" variant="secondary">Cancel</b-button>

              <div class="mt-2">
            <b-form-checkbox v-model="confirmedDelete">I understand the consequences.</b-form-checkbox>
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
</template>

<script>
import { getUserProfile, updateUserProfile, deleteUserProfile, getUserSkills, getUserInterests } from '@/Api'
import UpdateProfileForm from '@/components/UpdateProfileForm.vue'

export default {
  components: {
    UpdateProfileForm
  },
  data() {
    return {
      editMode: false,
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
      interests: []
    }
  },
  methods: {
    async handleUpdateProfile(updatedData) {
      try {
        const userId = localStorage.getItem('userId')
        if (!userId) throw new Error('User not found')

        await updateUserProfile(userId, updatedData)

        this.form = updatedData
        this.$bvToast.toast('Profile updated successfully!', {
          title: 'Success',
          variant: 'success',
          solid: true
        })
        this.editMode = false
      } catch (error) {
        console.error('Error updating profile:', error)
        this.$bvToast.toast('Error updating profile', {
          title: 'Error',
          variant: 'danger',
          solid: true
        })
      }
    },
    async confirmDeleteProfile() {
      try {
        const userId = localStorage.getItem('userId')
        if (!userId) throw new Error('User not found')

        await deleteUserProfile(userId)

        this.$bvToast.toast('Profile delted successfully!', {
          title: 'Success',
          variant: 'success',
          solid: true
        })
        this.$router.push({ name: 'Home' })
      } catch (error) {
        console.error('Error deleting profile:', error)
        this.$bvToast.toast('Error deleting Profile', {
          title: 'Error',
          variant: 'danger',
          solid: true
        })
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
        this.$bvToast.toast('Error fetching skills or interests', {
          title: 'Error',
          variant: 'danger',
          solid: true
        })
      }
    }
  },
  async mounted() {
    try {
      const userId = localStorage.getItem('userId')
      const response = await getUserProfile(userId)
      this.form = response// Set the form data with the response data
      await this.fetchSkillsAndInterests(userId)
    } catch (error) {
      console.error('Error fetching user data:', error)
      this.$bvToast.toast('Error fetching user data', {
        title: 'Error',
        variant: 'danger',
        solid: true
      })
    }
  }
}
</script>
