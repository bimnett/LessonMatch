<template>
  <div>
    <h1>Your Profile</h1>

    <div v-if="!editMode">
      <p><strong>Username:</strong> {{ form.username }}</p>
      <p><strong>Password:</strong> {{ form.password }}</p>
      <p><strong>Birth Date:</strong> {{ form.birth_date }}</p>
      <p><strong>City:</strong> {{ form.location.city }}</p>
      <p><strong>Country:</strong> {{ form.location.country }}</p>
      <p><strong>Skills:</strong> {{ form.skills }}</p>
      <p><strong>Interests:</strong> {{ form.interests }}</p>

      <b-button @click="editMode = true" variant="link">Edit Profile</b-button>
      
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
import { getUserProfile, updateUserProfile } from '@/Api';  
import UpdateProfileForm from '@/components/UpdateProfileForm.vue';

export default {
  components: {
    UpdateProfileForm,
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
        skills: '',
        interests: ''
      }
    };
  },
  methods: {
    async handleUpdateProfile(updatedData) {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) throw new Error('User not found');

        // Await the response from updateUserProfile
        await updateUserProfile(userId, updatedData);
        
        // Update the local form data after the response is received
        this.form = updatedData; 
        this.$bvToast.toast('Profile updated successfully!', {
          title: 'Success',
          variant: 'success',
          solid: true
        });
        this.editMode = false; 
      } catch (error) {
        console.error('Error updating profile:', error);
        this.$bvToast.toast('Error updating profile', {
          title: 'Error',
          variant: 'danger',
          solid: true
        });
      }
    }

  },
  async mounted() {
    try {
      const userId = localStorage.getItem('userId');
      const response = await getUserProfile(userId);
      this.form = response; // Set the form data with the response data
    } catch (error) {
      console.error('Error fetching user data:', error);
      this.$bvToast.toast('Error fetching user data', {
        title: 'Error',
        variant: 'danger',
        solid: true
      });
    }
  }
};
</script>
