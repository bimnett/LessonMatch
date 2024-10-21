<template>
    <div>
        <router-link :to="`/profile/${userId}`">
        <b-button @click="handleClick" class="btn_message">Go to profile</b-button>
        </router-link>
    </div>
</template>

<script>

export default {
    name: 'ViewProfileButton',
    data(){
        return {
            userId: localStorage.getItem('userId'),
        }
    },
    methods: {
        handleClick(){
            this.$emit('hide-modal');
        }
    }
}
</script>

<style scoped>
.btn_message {
    padding: 10px;
    background-color: #745bf0;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .btn_message:hover {
    background-color:#5d49c0;
  }
</style>
