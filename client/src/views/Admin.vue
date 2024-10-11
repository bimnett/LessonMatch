<template>
    <div>
        <!-- Create components for the unused delete collection endpoints and import them here -->
         <DeleteUsers/>
    </div>
</template>

<script>
import DeleteUsers from '@/components/DeleteUsers.vue';

export default {
    name: 'Admin',
    components: {
        DeleteUsers
    }
}
</script>