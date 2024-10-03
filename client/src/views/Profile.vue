<template>
    <div>
      <h1>Your Profile</h1>
  
      <div v-if="!editMode">
        <p><strong>Username:</strong> {{ form.username }}</p>
        <p><strong>Email:</strong> {{ form.email }}</p>
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
          @cancel-edit="editMode = false" />
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
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
          
          const response = await axios.put(`/api/users/${userId}`, updatedData);
          if (response.status === 200) {
            this.form = updatedData; // Update the local form data
            this.$bvToast.toast('Profile updated successfully!', {
              title: 'Success',
              variant: 'success',
              solid: true
            });
            this.editMode = false; 
          }
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
    mounted() {
      const userId = localStorage.getItem('userId');
      axios.get(`/api/users/${userId}`).then((response) => {
        this.form = response.data;
      });
    }
  };
  </script>
  