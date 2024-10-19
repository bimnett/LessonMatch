<template>
  <div id="app">
    <div class="nav" v-if="showNav">
      <img src="../Logo.png" class="logo">
      <router-link class="nav-link" to="/">Home</router-link>
      <div v-if="userId" class="nav-group">
        <router-link class="nav-link" to="/search">Search</router-link>
        <router-link class="nav-link" :to="`/profile/${userId}`">Profile</router-link>
        <router-link class="nav-link" :to="`/chatrooms/${userId}`">Chatroom</router-link>
        <router-link class="nav-link" :to="`/admin`" v-if="admin">Admin</router-link>
      </div>

      <div v-else class="nav-group">
        <router-link class="nav-link" to="/signin">Search</router-link>
        <router-link class="nav-link" to="/signin">Profile</router-link>
        <router-link class="nav-link" to="/signin">Chatroom</router-link>
      </div>
      
      <router-link class="nav-link" to="/signin">Sign in</router-link>
    </div>
    <router-view @signed-out="handleSignOut" />
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
  position: absolute;
  left: 7rem;
}

.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6.5rem;
  padding: 1.8em 0;
  background: white;
  position: relative; 
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
</style>