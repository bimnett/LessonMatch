<template>
  <div class="container">
    <div class="col-12">
      <div v-if="!editMode">
        <!-- Display User Profile -->
        <ProfileCard
          :userData="form"
          :skills="skills"
          :interests="interests"
          :isOwnProfile="isOwnProfile"
          @edit="editMode = true"
          @delete="showConfirmDelete = !showConfirmDelete"
        />
        <!-- Delete Profile Confirmation -->
        <b-modal
          v-model="showConfirmDelete"
          title="Delete Profile"
          header-bg-variant="danger"
          header-text-variant="light"
          hide-footer
        >
          <div class="text-center">
            <p class="mb-4">Are you sure you want to delete your profile? This action cannot be undone.</p>
            <b-form-checkbox
              v-model="confirmedDelete"
              class="mb-4"
            >
              I understand the consequences.
            </b-form-checkbox>
            <div class="d-flex justify-content-center">
              <b-button
                variant="danger"
                :disabled="!confirmedDelete"
                @click="confirmDeleteProfile"
                class="mr-2"
              >
                Yes, Delete My Profile
              </b-button>
              <b-button
                variant="secondary"
                @click="cancelDelete"
              >
                Cancel
              </b-button>
            </div>
          </div>
        </b-modal>
      </div>
        <!-- Edit Profile form if in edit mode -->
        <div v-else>
          <UpdateProfileForm
            :initialFormData="form"
            @update-profile="handleUpdateProfile"
            @cancel-edit="editMode = false"
          />
        </div>
      </div>
  </div>
</template>

<script>
import { getUserProfile, deleteUserProfile, getUserSkills, getUserInterests, getUserProfileHyperlink } from '@/Api'
import UpdateProfileForm from '@/components/Profile/UpdateProfileForm.vue'
import ProfileCard from '@/components/Profile/ProfileCard.vue'
import SignIn from '@/components/SignIn/SignInButton.vue'
import AddSkillButton from '@/components/Profile/AddSkillButton.vue'
import SignOutButton from '@/components/Profile/SignOutButton.vue'

export default {
  name: 'Profile',
  components: {
    UpdateProfileForm,
    ProfileCard,
    SignIn
  },
  data() {
    return {
      editMode: false,
      userId: this.$route.params.userId,  // Extract userId from the URL
      loggedInUser: localStorage.getItem('userId'),  // Get logged in user ID from localStorage
      hyperlink: localStorage.getItem('hyperlink'),
      form: {
        username: '',
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
  computed: {
    isOwnProfile() {
      return this.userId === this.loggedInUser
    }
  },
  methods: {
    async handleUpdateProfile(updatedData) {
      try {
        if (!this.userId) throw new Error('User not found')
        this.form = { ...this.form, ...updatedData }
        this.$bvToast.toast('Your profile has been updated successfully!', {
          title: 'Success',
          variant: 'success',
          solid: true
        })
        this.editMode = false
      } catch (error) {
        console.error('Error updating profile:', error)
        this.$bvToast.toast('Error updating profile!', {
          title: 'Error',
          variant: 'danger',
          solid: true
        })
      }
    },
    async confirmDeleteProfile() {
      try {
        if (!this.userId) throw new Error('User not found')
        await deleteUserProfile(this.userId)
        this.$bvToast.toast('Profile deleted successfully!', {
          title: 'Success',
          variant: 'success',
          solid: true
        })
        localStorage.removeItem('userId')
        this.$router.push({ name: 'Home' })
      } catch (error) {
        console.error('Error deleting profile:', error)
        this.$bvToast.toast('Error deleting profile', {
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
        const [skillsResponse, interestsResponse] = await Promise.all([
          getUserSkills(userId),
          getUserInterests(userId)
        ])
        this.skills = skillsResponse
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
      if (this.hyperlink) {
        const response = await getUserProfileHyperlink(this.hyperlink)
        this.form = { ...this.form, ...response }
        localStorage.removeItem('hyperlink')
      } else {
        const response = await getUserProfile(this.userId)
        this.form = { ...this.form, ...response }
        this.form.birth_date = this.form.birth_date.slice(0, 10);
      }

      if (!this.form.location) {
        this.form.location = { city: '', country: '' }
      }

      await this.fetchSkillsAndInterests(this.userId)
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

<style scoped>

</style>