<template>
  <div id="app">
    <div v-if="isDesktop">
      <DesktopMenu :userId="userId"/>
    </div>
    <div v-else>
      <MobileMenu :userId="userId"/>
    </div>

    <!-- Main content (router view) -->
    <router-view @signed-out="handleSignOut" />
  </div>
</template>

<script>
// Import the mobile and desktop menu components
import DesktopMenu from './components/Menu/DesktopMenu.vue'
import MobileMenu from './components/Menu/MobileMenu.vue'

export default {
  name: 'App',

  components: {
    DesktopMenu,
    MobileMenu
  },

  data() {
    return {
      isDesktop: true, // Determines whether it's a desktop or mobile layout
      userId: localStorage.getItem('userId'),
      admin: localStorage.getItem('admin')
    }
  },
  computed: {
    showNav() {
      const hideNavBarOnPaths = ['/popup']
      return !hideNavBarOnPaths.includes(this.$route.path)
    }
  },
  watch: {
    userId() {
      this.userId = localStorage.getItem('userId')
    }
  },
  mounted() {
    // Call the function to set the menu based on initial screen size
    this.checkScreenSize()

    // Add event listener to update layout when screen is resized
    window.addEventListener('resize', this.checkScreenSize)

    // Update userId and admin initially to catch the correct values
    this.userId = localStorage.getItem('userId')
    this.admin = localStorage.getItem('admin')
  },

  beforeDestroy() {
    // Remove the event listener when component is destroyed
    window.removeEventListener('resize', this.checkScreenSize)
  },

  methods: {
    // Method to check the screen size and toggle the menus
    checkScreenSize() {
      // Here, 768px is the breakpoint for switching between mobile and desktop
      this.isDesktop = window.innerWidth >= 768
    },

    handleSignOut() {
      localStorage.removeItem('userId')
      localStorage.removeItem('admin')
      this.userId = null
      this.admin = null
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
/* Desktop-only menu */
.nav {
  display: flex;
  align-items: center;
  padding: 1.8em 2rem;
  background: white;
  position: relative;
}

/* Mobile menu should be hidden on desktop */
@media (min-width: 769px) {
  .mobile-menu {
    display: none;
  }
}

/* Desktop menu should be hidden on mobile */
@media (max-width: 768px) {
  .nav {
    display: none;
  }
}

</style>
