<template>
    <div>
        <router-link to="/signup">
        <b-button class="btn_message">Sign Up</b-button>
        </router-link>
    </div>
</template>

<script>

export default {
  name: 'SignUpButton'
}
</script>

<style scoped>

.btn_message {
  background-color: #745bf0;
  border: none;
  padding: 10px 30px;
}

.btn_message:hover {
  background-color: #5d49c0;
}

</style>
