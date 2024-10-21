<template>
  <div class="update-profile-container">
    <div class="update-profile-form">
      <div class="form-header">
        <h2>Update Profile</h2>
      </div>
      
      <b-form @submit.prevent="submitUpdate">
        <div class="form-fields">
          <div class="form-group">
            <label for="username">Username</label>
            <div class="input-wrapper">
              <input 
                v-model="form.username" 
                type="text" 
                id="username" 
                required 
                placeholder="Enter username"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-wrapper">
              <input 
                v-model="form.password" 
                type="password" 
                id="password" 
                required 
                placeholder="Enter password"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="birth_date">Birth Date</label>
            <div class="input-wrapper">
              <input 
                v-model="form.birth_date" 
                type="date" 
                id="birth_date" 
                required 
              />
            </div>
          </div>

          <div class="form-group">
            <label for="location.city">City</label>
            <div class="input-wrapper">
              <input 
                v-model="form.location.city" 
                type="text" 
                id="location.city" 
                required 
                placeholder="Enter city"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="location.country">Country</label>
            <div class="input-wrapper">
              <input 
                v-model="form.location.country" 
                type="text" 
                id="location.country" 
                required 
                placeholder="Enter country"
              />
            </div>
          </div>
        </div>

        <div class="button-group">
          <button 
            type="button" 
            class="cancel-button" 
            @click="$emit('cancel-edit')"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="submit-button"
          >
            Save Changes
          </button>
        </div>
      </b-form>
    </div>
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
      }
    }
  }
}
</script>

<style scoped>
.update-profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(145deg, rgba(92, 108, 209, 0.05), rgba(76, 209, 177, 0.05));
  padding: 20px;
}

.update-profile-form {
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.form-header {
  background: linear-gradient(to right, #5C6CD1E3, #4CD1B1E3);
  padding: 20px 30px;
  margin-bottom: 30px;
}

.form-header h2 {
  color: white;
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-fields {
  padding: 0 30px;
}

.form-group {
  margin-bottom: 24px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #444;
  font-size: 0.95rem;
}

.input-wrapper {
  position: relative;
  background: linear-gradient(145deg, rgba(92, 108, 209, 0.05), rgba(76, 209, 177, 0.05));
  border-radius: 12px;
  padding: 3px;
}

input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid transparent;
  border-radius: 10px;
  font-size: 0.95rem;
  color: #444;
  background: white;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #5C6CD1;
  box-shadow: 0 0 0 3px rgba(92, 108, 209, 0.1);
}

input::placeholder {
  color: #999;
}

.button-group {
  display: flex;
  justify-content: space-between;
  padding: 30px;
  background: rgba(92, 108, 209, 0.05);
  margin-top: 30px;
  gap: 15px;
}

.submit-button, .cancel-button {
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.submit-button {
  background: linear-gradient(135deg, #5C6CD1E3, #4CD1B1E3);
  color: white;
  box-shadow: 0 4px 15px rgba(92, 108, 209, 0.2);
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(92, 108, 209, 0.3);
}

.cancel-button {
  background: white;
  color: #5C6CD1;
  border: 2px solid rgba(92, 108, 209, 0.2);
}

.cancel-button:hover {
  background: rgba(92, 108, 209, 0.1);
}

@media (max-width: 768px) {
  .update-profile-container {
    padding: 15px;
  }
  
  .update-profile-form {
    border-radius: 15px;
  }
  
  .form-header {
    padding: 15px 20px;
  }
  
  .form-header h2 {
    font-size: 1.5rem;
  }
  
  .form-fields {
    padding: 0 20px;
  }
  
  .button-group {
    padding: 20px;
  }
  
  .submit-button, .cancel-button {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .button-group {
    flex-direction: column;
  }
  
  .submit-button, .cancel-button {
    width: 100%;
  }
}
</style>