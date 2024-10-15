<template>
    <div>
        <router-link :to="'/profile/:userId'">
        <b-button class="btn_message" variant="primary">View profile</b-button>
        </router-link>
    </div>
</template>

<script>

export default {
    name: 'ViewProfileButton',
}
</script>
