<template>
  <b-card class="card-custom-padding">
    <b-card-body class="custom-card-body">
      <h5 class="mb-3">{{ user.username }}</h5>
      <h6 class="card-title">Best Skill: {{ bestSkill }}</h6>
      <h6 class="card-subtitle mb-2 text-muted">Interested in: {{ interest }}</h6>
      <b-button variant="primary" @click="handleViewProfile">View Profile</b-button>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true,
    },
    bestSkill: {
      type: String,
      required: true,
    },
    interest: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleViewProfile() {
      this.$router.push(`/profile/${this.user._id}`);
    },
  },
};
</script>

<style scoped>
.card-custom-padding {
  margin-bottom: 20px; /* To add spacing between cards */
}

.card-title {
  font-weight: bold;
}
</style>