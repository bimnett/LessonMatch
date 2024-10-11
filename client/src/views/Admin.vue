<template>
    <div v-if="admin">
        <!-- Create components for the unused delete collection endpoints and import them here -->
         <DeleteUsers/>
         <DeleteMessages/>
    </div>
</template>

<script>
import DeleteUsers from '@/components/DeleteUsers.vue';
import DeleteMessages from '@/components/DeleteMessages.vue';
import router from '@/router';

export default {
    name: 'Admin',
    components: {
        DeleteUsers,
        DeleteMessages
    },

    data() {
        return {
            admin: localStorage.getItem('admin')
        }
    },

    mounted(){
        if(!this.admin){
            router.push({ path: '/' });
        }
    }
}
</script>