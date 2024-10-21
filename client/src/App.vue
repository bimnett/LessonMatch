<template>
  <div id="app">
    <DesktopMenu :userId="userId" />
    <router-view @signed-out="handleSignOut" @signed-in="handleSignIn"/>
    <MobileMenu :userId="userId" />

    <footer>
      <div id="footer">
        <div class="footer-body">
          <p>&copy; 2024 <strong>LessonMatch</strong> | All rights reserved.</p>
          <div class="icons">
            <img src="/email-icon.png" alt="Email" class="mail-icon">
            <img src="/instagram-icon.png" alt="Instagram" class="instagram-icon">
            <img src="/facebook-icon.png" alt="FaceBook" class="facebook-icon">
          </div>
        </div>
      </div>
    </footer>

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
  watch: {
    userId() {
      this.userId = localStorage.getItem('userId')
      this.admin = localStorage.getItem('admin')
    }
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
    },

    handleSignIn() {
      this.userId = localStorage.getItem('userId')
      this.admin = localStorage.getItem('admin')
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
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

router-view {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 5rem;
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
  border-bottom: 2px solid rgba(102, 62, 165, 0.89);
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-right: 4rem;
}

.nav-links-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6.5rem;
  margin-right: 4rem;
}

.nav-group {
  display: flex;
  gap: 6rem;
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

@media (max-width: 768px) {
 footer {
  margin-bottom: 3.5rem;
 }
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

/* Footer */
footer{
    margin-top: auto;
    display: flex;
}

#footer {
  background: linear-gradient(#5C6CD1E3, #4CD1B1E3);
  color: black;
  max-height: 30vh;
  display: flex;
  align-items: center;
  width: 100%;
}

.footer-body {
  padding: 20px;
}

.icons {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.mail-icon{
  width: 45px;
  height: 35px;
}
.instagram-icon {
  width: 70spx;
  height: 45px;
}
.facebook-icon{
  width: 50px;
  height: 50px;
}

</style>
