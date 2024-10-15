<template>
    <div class="category-dropdown-bar">
      <select v-model="selectedCategory" @change="sendCategorySelection" class="category-dropdown">
        <option disabled value="">Select a category</option>
        <option v-for="category in categories">
          {{ category }}
        </option>
      </select>
    </div>
  </template>

<script>

export default {
  name: 'CategoryDropdownBar',

  data() {
    return {
      selectedCategory: '',
      categories: [
        'Music', 'Books', 'Movies', 'Programming', 'Sports'
      ]
    }
  },

  methods: {
    sendCategorySelection(category) {
      this.$emit('category-selected', this.selectedCategory)
    }
  }
}

</script>

  <style scoped>
  .category-dropdown-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  .category-dropdown {
    padding: 8px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  </style>
