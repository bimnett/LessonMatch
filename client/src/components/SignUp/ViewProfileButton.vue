<template>
    <div>
        <router-link :to="`/profile/${userId}`">
        <b-button @click="handleClick" class="btn_message" variant="primary">Go to profile</b-button>
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
