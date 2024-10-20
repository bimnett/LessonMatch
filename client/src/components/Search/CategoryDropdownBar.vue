<template>
  <div class="category-dropdown-bar">
    <select v-model="selectedCategory" @change="sendCategorySelection" class="category-dropdown">
      <option disabled value="">Select a category</option>
      <option v-for="category in categories" :key="category">
        {{ category }}
      </option>
    </select>

    <select v-if="selectedCategory" v-model="selectedSortOrder" @change="sendSortOrderSelection" class="sort-dropdown">
      <option value="1">Ascending</option>
      <option value="-1">Descending</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'CategoryDropdownBar',
  data() {
    return {
      selectedCategory: '',
      selectedSortOrder: '1', // Default sort order to ascending
      categories: ['Music', 'Books', 'Movies', 'Programming', 'Sports']
    };
  },
  methods: {
    sendCategorySelection() {
      this.$emit('category-selected', this.selectedCategory);
    },
    sendSortOrderSelection() {
      this.$emit('sort-order-selected', this.selectedSortOrder);
    }
  }
};
</script>

<style scoped>
.category-dropdown-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.category-dropdown, .sort-dropdown {
  background-color: #624eca;
  color: white;
  border: 2px solid white;
  padding: 10px;
  border-radius: 5px;
}

.category-dropdown option, .sort-dropdown option {
  background-color: #800080; /* Ensure options in the dropdown also have purple background */
  color: white;              /* White text color for the options */
}
</style>