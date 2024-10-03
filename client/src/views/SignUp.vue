<template>
    <div>
        <SignUpForm @form-data="postNewUser" />
        <div v-if="formData.name">
            {{ formData }}
        </div>
    </div>
</template>

<script>
import SignUpForm from '@/components/SignUpForm.vue'

export default {
    name: 'SignUp',
    components: {
        SignUpForm
    },
    data() {
        return {
            formData: {
                name: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async postNewUser(formData){
            // Send request to create a new user
            this.formData = formData;
        }
    }
}
</script>


<style scoped>
</style>