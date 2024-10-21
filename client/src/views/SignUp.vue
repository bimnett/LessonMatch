<template>
  <div id="container">
    <div id="title">
      <h1>Sign Up Page</h1>
    </div>
      <div v-if="!showModal">
        <OriginalSignUpForm
        @signed-in="handleSignIn"
        @show-modal="showModal = true"
        />
      </div>

      <div v-if="showModal">
        <b-modal
          v-model="showModal"
          id="sign-up-modal"
          title="Do you need to edit your information?"
          :visible="showModal = true"
          hide-footer
          @hide="handleModalClose"
        >
          <div class="modal-body">
            <div class="modal-body-content">
              <h4 id="modal-h4">View your profile!</h4>
              <ViewProfileButton
              @hide-modal="showModal = false"
              />
            </div>
          </div>
        </b-modal>
      </div>
  </div>
</template>

<script>
import OriginalSignUpForm from '@/components/SignUp/SignUpForm.vue'
import ViewProfileButton from '@/components/SignUp/ViewProfileButton.vue'

export default {
  name: 'Sign Up',
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    handleSignIn() {
      this.$emit('signed-in');
    },
    handleModalClose(){
      this.showModal = false;
      this.$router.push('/');
      localStorage.removeItem('hyperlink')
    }
  },
  components: {
    OriginalSignUpForm,
    ViewProfileButton
  }
}
</script>

<style>

#container {
  margin-top: 30px;
}

.modal-body {
  padding: 20px;
}

.modal-body-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#modal-h4 {
  margin-bottom: 25px;
}

#title {
  padding: 10px 20px;
  border: 2px solid;
  display: inline-block; 
  border-image: linear-gradient(to right, #5C6CD1E3, #4CD1B1E3) 1; 
}


</style>
