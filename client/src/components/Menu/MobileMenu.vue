<template>
    <div class="mobile-menu">
      <router-link to="/" class="menu-item">
        <font-awesome-icon icon="house" />
      </router-link>
      <router-link :to="`/chatrooms/${userId}`" class="menu-item">
        <font-awesome-icon icon="comment" />
      </router-link>
      <router-link :to="`/profile/${userId}`" class="menu-item">
        <font-awesome-icon icon="user" />
      </router-link>
      <router-link to="/search" class="menu-item">
        <font-awesome-icon icon="magnifying-glass" />
      </router-link>
    </div>
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
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    border-top: 1px solid #ddd;
    padding: 0.5rem 0;
  }

  .menu-item {
    color: #333;
    font-size: 1.8rem;
  }

  .menu-item .fa-icon {
    transition: color 0.3s ease;
  }

  .menu-item:hover .fa-icon {
    color: #624eca;
  }
  </style>
