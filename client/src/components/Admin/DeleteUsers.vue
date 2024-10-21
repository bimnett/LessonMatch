<template>
    <b-button variant="danger" @click="handleDeleteUsers">Delete all users</b-button>
</template>

<script>
import { deleteAllUsers } from '@/Api';

export default {
    name: 'DeleteUsers',

    methods: {
        async handleDeleteUsers(){
            try {
                const message = await deleteAllUsers();
                
                this.$emit('users-deleted');
                this.$router.push('/signin')

                console.log(message);
            } catch(err){
                console.log("There was a problem deleting all users.")
            }
        }
    }
}
</script>