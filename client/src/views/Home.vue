<template>
  <div>
    <b-container fluid>
      <h1 class="display-5 fw-bold">LessonMatch</h1>
      <SignUpButton />
    </b-container>
    <div v-if="!userId">
      <SignIn/>
    </div>
  </div>
</template>

<script>

import { Api } from '@/Api'
import SignUpButton from '@/components/SignUpButton.vue'
import SignIn from '@/components/SignIn.vue';

export default {
  name: 'home',
  data() {
    return {
      message: 'none',
      userId: localStorage.getItem('userId')
    }
  },
  methods: {

  },
  components: {
    SignUpButton,
    SignIn
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
