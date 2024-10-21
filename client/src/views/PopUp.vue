<template>
    <div>
        <ViewProfileButton/>
        <ViewHomeButton/>
    </div>
</template>

<script>

import ViewProfileButton from '@/components/PopUp/ViewProfileButton.vue';
import ViewHomeButton from '@/components/PopUp/ViewHomeButton.vue';

export default {
  name: 'Pop Up',
  components: {
    ViewProfileButton,
    ViewHomeButton
  }
}
</script>

<style>
</style>