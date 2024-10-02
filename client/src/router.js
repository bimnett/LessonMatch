import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import SignUp from './views/SignUp.vue'
import Chatroom from './views/Chatroom.vue'
import Search from './views/Search.vue'
import Profile from './views/Profile.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/signup', name: 'Sign Up', component: SignUp },
  { path: '/chatrooms', name: 'Chatroom', component: Chatroom },
  { path: '/search', name: 'Search', component: Search },
  { path: '/profile', name: 'Profile', component: Profile },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
