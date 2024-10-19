<template>
  <div id="app">
    <div class="nav" v-if="showNav">
      <router-link to="/">Home</router-link>

      <div v-if="userId" class="nav-group">
        <router-link to="/search">Search</router-link>
        <router-link :to="`/profile/${userId}`">Profile</router-link>
        <router-link class="chatroom-link" :to="`/chatrooms/${userId}`">Chatroom</router-link>
        <router-link :to="`/admin`" v-if="admin">Admin</router-link>
      </div>

      <div v-else class="nav-group">
        <router-link to="/signin">Search</router-link>
        <router-link to="/signin">Profile</router-link>
        <router-link to="/signin">Chatroom</router-link>
      </div>
      
      <router-link to="/signin">Sign in</router-link>
    </div>
    <router-view/>
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

.nav {
  margin: 10px;
  display: flex;
  justify-content: center;
  gap: 25px;
}

.nav-group {
  display: flex;
  gap: 25px; /* This ensures consistent spacing within the group */
}

.nav a {
  text-decoration: none;
}
</style>