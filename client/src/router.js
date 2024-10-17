import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import SignUp from './views/SignUp.vue'
import Chatroom from './views/Chatroom.vue'
import Search from './views/Search.vue'
import Profile from './views/Profile.vue'
import Admin from './views/Admin.vue'
import SignIn from './views/SignIn.vue'
import PopUp from './views/PopUp.vue'
import PrivetChat from './views/PrivetChat.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/signup', name: 'Sign Up', component: SignUp },
  { path: '/chatrooms/:userId', name: 'Chatroom', component: Chatroom },
  { path: '/search', name: 'Search', component: Search },
  { path: '/profile/:userId', name: 'Profile', component: Profile },
  { path: '/admin', name: 'Admin,', component: Admin },
  { path: '/signin', name: 'Sign In', component: SignIn },
  { path: '/popup', name: 'Pop Up', component: PopUp },
  { path: '/privetchat', name: 'Privet Chat', component: PrivetChat }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
