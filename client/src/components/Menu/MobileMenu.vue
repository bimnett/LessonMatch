<template>
  <b-container fluid class="mobile-menu">
    <b-row class="justify-content-around">
      <b-col cols="3" class="text-center">
        <router-link to="/" class="menu-item">
          <font-awesome-icon icon="house" />
        </router-link>
      </b-col>
      <b-col cols="3" class="text-center">
        <router-link to="/search" class="menu-item">
          <font-awesome-icon icon="magnifying-glass" />
        </router-link>
      </b-col>
      <b-col cols="3" class="text-center">
        <router-link :to="`/profile/${userId}`" class="menu-item">
          <font-awesome-icon icon="user" />
        </router-link>
      </b-col>
      <b-col cols="3" class="text-center">
        <router-link :to="`/chatrooms/${userId}`" class="menu-item">
          <font-awesome-icon icon="comment" />
        </router-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: ['userId']
}
</script>

<style scoped>
.mobile-menu {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: rgba(107, 206, 189, 0.89);
  border-top: 1px solid #4a9191;
  padding: 0.4rem 0;
  z-index: 1000;
}

.menu-item {
  color: #333;
  font-size: 1.8rem;
  transition: color 0.3s ease;
}

.menu-item:hover {
  color: #624eca;
}

.menu-item .fa-icon {
  transition: color 0.3s ease;
}

.menu-item:hover .fa-icon {
  color: #624eca;
}

@media (max-width: 480px) {
  .menu-item {
    font-size: 1.5rem;
  }
}

@media (min-width: 769px) {
  .mobile-menu {
    display: none;
  }
}
</style>
