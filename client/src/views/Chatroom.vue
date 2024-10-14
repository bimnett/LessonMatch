<template>
    <div v-if="userId">
        <h1 v-if="true">No chats</h1>
        <div v-else>
            <div v-for="chat in chats">
                {{ chat }}
            </div>
        </div>
    </div>
    <div v-else>
        <SignIn/>
    </div>
</template>

<script>
import SignIn from '@/components/SignIn/SignInButton.vue';

export default {
    name: "Chatroom",
    components: {
        SignIn
    },

    data() {
        return {
            chats: [],
            userId: localStorage.getItem('userId')
        }
    },
    async mounted(){

    }
}
</script>

<style scoped>
</style>
