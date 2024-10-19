<template>
  <b-card class="user-card">
    <b-card-body>
      <b-avatar
        :text="user.username.charAt(0)"
        size="6rem"
        id="avatar"
      ></b-avatar>
      <h4 class="card-title" id="username">{{ user.username }}</h4>
      <h6 class="card-title">
        Best Skill: <span class="skill-badge">{{ bestSkill }}</span>
      </h6>
      <h6 class="card-title">
        Interested in: <span class="interest-badge">{{ interest }}</span>
      </h6>
      <b-button id="view-profile-btn" @click="handleViewProfile">View Profile</b-button>
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
.user-card {
  margin-bottom: 1.5rem;
  background-color: rgb(128, 124, 243);
}

#username {
  text-decoration: underline;
}

.user-card:hover {
  background-color: rgb(108, 104, 238);
  color: white;
}

.card-title {
  font-weight: bold;
}

.skill-badge, .interest-badge {
  background-color: #549FC1E3 !important;
  color: black !important;
  padding: 0.3rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.85rem;
  display: inline-block;
  font-weight: bold;
}

.user-card:hover .skill-badge, 
.user-card:hover .interest-badge {
  color: white !important;
}

#view-profile-btn {
  background-color: #549FC1E3;
  color: white;
  border: 2px;
  margin-top: 0.5rem;
}

#view-profile-btn:hover {
  background-color: #3b25a8;
  color: white;
  font-weight: bold;
}

#avatar {
  background: linear-gradient(#5C6CD1E3, #4CD1B1E3);
  margin-bottom: 1rem;
}
</style>