<template>
    <b-button variant="outline-primary" @click="handleLogin">Log in</b-button>
</template>

<script>
import { logInUser } from '@/Api';



export default {
    name: "SignIn",
    data() {
        return {
            userId: localStorage.getItem('userId'),
            username: "John DdDbbd",
            password: "johnbo123"
        }
    },
    methods: {
        async handleLogin() {
            try{
                const response = await logInUser(this.username, this.password);
                if(response && response.data){
                    console.log("Log in successful");
                    this.userId = response.data;
                } else {
                    console.log("Log in failed");
                }
            } catch(err){
                console.log(err);
            }
        }
    }
}
</script>