<template>
    <div>
        <!-- Create components for the unused delete collection endpoints and import them here -->
         <DeleteUsers/>
         <DeleteMessages/>
    </div>
</template>

<script>
import DeleteUsers from '@/components/DeleteUsers.vue';
import DeleteMessages from '@/components/DeleteMessages.vue';

export default {
    name: 'Admin',
    components: {
        DeleteUsers,
        DeleteMessages
    }
}
</script>