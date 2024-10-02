<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/search">Search</router-link>
      <router-link to="/profile">Profile</router-link>
      <router-link to="/chatrooms">Chatroom</router-link>
    </div>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>


<script>

export default {
  name: 'App',

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

#nav {
  margin: 10px;
  display: flex; /* Aligns links in a row */
  justify-content: center; /* Centers links horizontally */
  gap: 25px; /* Adds space between each link */
}

#nav a {
  text-decoration: none; /* Removes underline from links */
}
</style>