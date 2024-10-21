<template>
  <div class="search-container">
    <div id="title">
          <h4>Search for users</h4>
    </div>
    <CategoryDropdownBar 
      @category-selected="searchCategory"
      @sort-order-selected="updateSortOrder"
    />

    <div v-if="selectedCategory" class="results-header">
      Results for {{ selectedCategory }}:
    </div>

    <b-row class="user-card-row">
      <b-col v-for="user in users" :key="user._id" cols="12" md="3">
        <UserCard 
          :user="user" 
          :bestSkill="getBestSkill(user.skills, selectedCategory)" 
          :interest="getInterest(user.interests)" 
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CategoryDropdownBar from '@/components/Search/CategoryDropdownBar.vue';
import UserCard from '@/components/Search/UserCard.vue';
import { getUsersForCategory } from '@/Api';

export default {
  name: 'Search',
  components: {
    CategoryDropdownBar,
    UserCard,
  },
  data() {
    return {
      selectedCategory: '',
      sortOrder: 1, // Default sort order (ascending)
      users: [],
      loggedInUser: localStorage.getItem('userId')
    };
  },
  methods: {
    async searchCategory(category) {
      this.selectedCategory = category;
      await this.fetchUsers(); // Fetch users when category changes
    },
    async updateSortOrder(order) {
      this.sortOrder = order;
      await this.fetchUsers(); // Refetch users when sort order changes
    },
    // Fetch all matching users and filter out the logged in user
    async fetchUsers() {
      try {
        const skillCategoryUsers = await getUsersForCategory(this.selectedCategory, this.sortOrder);
        if (this.loggedInUser) {
          this.users = skillCategoryUsers.filter(user => user._id !== this.loggedInUser);
        } else {
          this.users = skillCategoryUsers;
        }
      } catch (err) {
        console.log('Error fetching users:', err);
      }
    },
    getBestSkill(skills, category) {
      if (skills && skills.length > 0) {

        // Filter skills based on the searched category
        const filteredSkills = skills.filter(skill => skill.category === category);

        if (filteredSkills.length > 0) {
          // Sort the filtered skills by level and return the best one
          const sortedSkills = filteredSkills.sort((a, b) => b.level - a.level);
          return sortedSkills[0].name;
        }
      }
      return 'N/A';
    },
    getInterest(interests) {
      if (interests && interests.length > 0) {
        return interests[0].name;
      }
      return 'N/A';
    }
  }
};
</script>

<style scoped>
.search-container {
  padding: 20px;
}

.results-header {
  margin-bottom: 20px; 
}

#title {
  padding: 20px;
  border: 2px solid;
  display: inline-block; 
  border-image: linear-gradient(to right, #5C6CD1E3, #4CD1B1E3) 1; 
  margin-bottom: 20px;
}
</style>