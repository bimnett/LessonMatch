<template>
  <div>
    <b-container fluid>
      <h1 class="display-5 fw-bold">LessonMatch</h1>
      <SignUpButton />
    </b-container>
  </div>
</template>

<script>

import { Api } from '@/Api'
import SignUpButton from '@/components/SignUpButton.vue'

export default {
  name: 'home',
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    
  },
  components: {
    SignUpButton
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
