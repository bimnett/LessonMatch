<template>
  <div>
    <div v-if="!userId">
      <b-container fluid>
      <h1 class="display-5 fw-bold">LessonMatch</h1>
      </b-container>
      <SignUpButton/>
      <SignIn/>
    </div>
    <div v-else-if="admin" class="admin-card">
        <Dangerzone />
    </div>
  </div>
</template>

<script>

import { Api } from '@/Api'
import SignUpButton from '@/components/SignUp/SignUpButton.vue'
import SignIn from '@/components/SignIn/SignInButton.vue';
import Dangerzone from '@/components/Admin/Dangerzone.vue';

export default {
  name: 'home',
  data() {
    return {
      message: 'none',
      userId: localStorage.getItem('userId'),
      admin: localStorage.getItem('admin')
    }
  },
  methods: {

  },
  components: {
    Dangerzone,
    SignUpButton,
    SignIn,
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}

.admin-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20rem;
}
</style>
