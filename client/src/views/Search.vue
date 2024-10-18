<template>
  <div class="search-container">
    <CategoryDropdownBar @category-selected="searchCategory" />
    <div v-if="selectedCategory" class="results-header">
      Results for {{ selectedCategory }}:
    </div>

    <b-row class="user-card-row">
      <b-col v-for="user in users" :key="user._id" cols="12" md="4">
        <UserCard 
          :user="user" 
          :bestSkill="getBestSkill(user.skills)" 
          :interest="getInterest(user.interests)" 
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CategoryDropdownBar from '@/components/CategoryDropdownBar.vue';
import UserCard from '@/components/UserCard.vue';
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
      users: [],
    };
  },

  methods: {
    async searchCategory(category) {
      this.selectedCategory = category;

      try {
        this.users = await getUsersForCategory(category);
      } catch (err) {
        console.log("Error fetching users:", err);
      }
    },
    
    getBestSkill(skills) {
      if (skills && skills.length > 0) {
        const sortedSkills = skills.slice().sort((a, b) => b.level - a.level);
        return sortedSkills[0].name;
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
</style>