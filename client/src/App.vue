<template>
  <div id="app">
    <div class="nav" v-if="showNav">
      <div class="logo-container">
        <img src="../Logo.png" class="logo">
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
        <router-link class="nav-link" to="/signin">Sign in</router-link>
      </div>
    </div>
    <router-view @signed-out="handleSignOut" @signed-in="handleSignIn"/>

  </div>
</template>

<script>

export default {
  name: 'App',

  data() {
    return {
      userId: localStorage.getItem('userId'),
      admin: localStorage.getItem('admin')
    }
  },
  computed: {
    showNav () {
      const hideNavBarOnPaths = ['/popup']
      return !hideNavBarOnPaths.includes(this.$route.path)
    }
  },
  watch: {
    userId(){
      this.userId = localStorage.getItem('userId')
      this.admin = localStorage.getItem('admin')
    }
  },
  methods: {
    handleSignOut(){
      localStorage.removeItem('userId');
      localStorage.removeItem('admin');

      this.userId = null;
      this.admin = null;
    },
    handleSignIn() {
      this.userId = localStorage.getItem('userId') 
    }
  },
  mounted() {
    // Update userId and admin initially to catch the correct values
    this.userId = localStorage.getItem('userId');
    this.admin = localStorage.getItem('admin');
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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

/* Responsive adjustments */
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
</style>