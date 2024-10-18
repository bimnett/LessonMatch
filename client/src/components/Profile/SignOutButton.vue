<template>
    <div>
        <router-link :to="`/`">
        <b-button @click="signOut" class="btn_message" variant="primary">Sign Out</b-button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'SignOutButton',
    methods: {
        async signOut() {
        try {
            localStorage.removeItem('userId')
            console.log('User signed out successfully')
        } catch (error) {
            console.error(error);
        }
        } 
    }   
}   
</script>