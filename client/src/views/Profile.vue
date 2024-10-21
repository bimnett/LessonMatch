<template>
  <div class="container">
    <div id="title">
      <h4>Your Profile</h4>
    </div>
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
          @signed-out="handleSignOut" 
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


export default {
  name: 'Profile',
  components: {
    UpdateProfileForm,
    ProfileCard
  },
  data() {
    return {
      editMode: false,
      userId: this.$route.params.userId,
      loggedInUser: localStorage.getItem('userId'),
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
        this.editMode = false
      } catch (error) {
        console.error('Error updating profile:', error)
      }
    },
    handleSignOut(){
      this.$emit('signed-out');
      this.$router.push('/');
    },
    async loadProfileData(userId) {
    try {
      const response = await getUserProfile(userId);
      this.form = { ...this.form, ...response };
      this.form.birth_date = this.form.birth_date.slice(0, 10);

      if (!this.form.location) {
        this.form.location = { city: '', country: '' };
      }

      await this.fetchSkillsAndInterests(userId);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  },
    async confirmDeleteProfile() {
      try {
        if (!this.userId) throw new Error('User not found')
        await deleteUserProfile(this.userId)
        localStorage.removeItem('userId')
        this.$router.push({ name: 'Home' })
      } catch (error) {
        console.error('Error deleting profile:', error)
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
      }
    },
  },
  async mounted() {
    try {
      if (this.hyperlink) {
        // If the profile is being loaded via a hyperlink
        const response = await getUserProfileHyperlink(this.hyperlink);
        this.form = { ...this.form, ...response };
        this.form.birth_date = this.form.birth_date.slice(0, 10);
        localStorage.removeItem('hyperlink');
    } else {
        await this.loadProfileData(this.userId);
      }
    } catch (error) {
        console.error('Error fetching user data:', error);
      }
  },
  watch: {
    '$route.params.userId': {
      immediate: true,
      handler(newUserId) {
        this.userId = newUserId;
        this.loadProfileData(newUserId);
      }
    }
  }
}
</script>

<style scoped>

.container {
  margin-top: 30px;
}

#title {
  padding: 20px;
  margin-bottom: 20px;
  border: 2px solid;
  display: inline-block; 
  border-image: linear-gradient(to right, #5C6CD1E3, #4CD1B1E3) 1; 
}

</style>