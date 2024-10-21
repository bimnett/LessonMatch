<template>
    <div class="nav">
      <div class="logo-container">
        <img src="/Logo.png" class="logo">
      </div>
      <div class="nav-links-container">
        <router-link class="nav-link" to="/">Home</router-link>
        <div v-if="userId" class="nav-group">
          <router-link class="nav-link" to="/search">Search</router-link>
          <router-link class="nav-link" :to="`/profile/${userId}`">Profile</router-link>
          <router-link class="nav-link" :to="`/chatrooms/${userId}`">Chatroom</router-link>
        </div>
        <div v-else class="nav-group">
          <router-link class="nav-link" to="/signin">Search</router-link>
          <router-link class="nav-link" to="/signin">Profile</router-link>
          <router-link class="nav-link" to="/signin">Chatroom</router-link>
        </div>
      </div>
    </div>
  </template>
<script>
export default {
  props: ['userId']
}
</script>

  <style scoped>
  .logo {
    width: 5.2em;
    height: 5.2em;
    border-radius: 50%;
    object-fit: cover;
  }

  .nav {
    display: flex;
    align-items: center;
    padding: 1.8em 2rem;
    background: white;
    position: relative;
  }

  .logo-container {
    width: 7rem;
    display: flex;
    justify-content: center;
  }

  .nav-links-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6.5rem;
  }

  .nav-group {
    display: flex;
    gap: 6rem;
  }

  .nav a {
    text-decoration: none;
  }

  .nav .nav-link {
    color: black;
    padding: 0.8rem 0.8rem;
    border-radius: 5px;
    transition: all 0.3s ease;
    background-color: transparent;
    font-size: 1.3rem;
  }

  .nav .nav-link:hover {
    background-color: #624eca;
    color: white;
    border-radius: 5px;
  }

  /* Responsive adjustments for desktop */
  @media (max-width: 1200px) {
    .nav-links-container, .nav-group {
      gap: 4rem;
    }

    .logo-container {
      width: 5rem;
    }
  }

  @media (max-width: 1024px) {
    .nav-links-container, .nav-group {
      gap: 3rem;
    }

    .nav .nav-link {
      font-size: 1.1rem;
    }
    
  }
  @media (max-width: 768px) {
  .nav {
    display: none;
  }
}
  </style>
