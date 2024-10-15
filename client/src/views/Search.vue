<template>
    <div>
        <CategoryDropdownBar @category-selected="searchCategory"/>
    </div>
    <div v-if="this.selectedCategory">Results for {{ selectedCategory }}:</div>
</template>

<script>
import CategoryDropdownBar from '@/components/CategoryDropdownBar.vue'
import UserCard from '@/components/UserCard.vue'

import axios from 'axios'

export default {
  name: 'Search',

  components: {
    CategoryDropdownBar
  },

  data() {
    return {
      selectedCategory: '',
      users: []
    }
  },

  methods: {
    async searchCategory(category) {
      this.selectedCategory = category
      // await the category endpoint here
      this.user
    }
  }
}
</script>

<style scoped>
</style>
