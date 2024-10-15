<template>
    <b-button variant="danger" @click="handleDeleteMessages">Delete all messages</b-button>
</template>

<script>
import { deleteAllMessages } from '@/Api';

export default {
    name: 'DeleteMessages',

    methods: {
        async handleDeleteMessages() {
            try {
                const message = await deleteAllMessages();
                console.log(message);
            }catch(err){
                console.log("There was a problem deleting all messages.");
            }
        }
    }
}
</script>