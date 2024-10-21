<template>
    <div>
        <router-link :to="`/`">
        <b-button @click="removeHyperlink" class="btn_message" variant="primary">Home Page</b-button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'ViewHomeButton',
    methods: {
        async removeHyperlink() {
        try {
            localStorage.removeItem('hyperlink')
            console.log('Removed hyperlink successfully')
        } catch (error) {
            console.error(error);
        }
        } 
    }   
}   
</script>