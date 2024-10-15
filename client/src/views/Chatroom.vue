<template>
    <div v-if="userId">
        <h1 v-if="!chatrooms.length">No chats</h1>
        <div v-else>
            <div v-for="(chat, index) in chatrooms" :key="index">
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
import socket from "@/socket";

export default {
    name: "Chatroom",
    components: {
        SignIn
    },

    data() {
        return {
            chatrooms: [],
            userId: localStorage.getItem('userId')
        }
    },
    async mounted(){
        if(this.userId){
            this.connectSocket();
        }
    },
    methods: {
        connectSocket() {

            socket.auth = { userId: this.userId }
            socket.connect();

            // Listen for incoming messages
            socket.on('message', (chatMessage) => {
                this.chatrooms.push(chatMessage); // Update the chat messages array
            });

            socket.on('connect_error', () => {
                console.log("There was an error connecting with the socket.")
            });

            // You can also listen to other events like 'connect' and 'disconnect'
            socket.on('connect', () => {
                console.log('Connected to the chat server');
            });
        }
    },
    beforeDestroy() {
        if (this.userId) {

            // Clean up socket listeners
            socket.off('message');
            socket.off('connect');
            socket.off('connect_error');

            socket.disconnect();
        }
    }
}
</script>

<style scoped>
</style>
