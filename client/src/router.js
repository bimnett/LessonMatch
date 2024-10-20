import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import SignUp from './views/SignUp.vue'
import Chatroom from './views/Chatroom.vue'
import Search from './views/Search.vue'
import Profile from './views/Profile.vue'
import SignIn from './views/SignIn.vue'
import AddSkill from './views/AddSkill.vue'
import PrivateChat from './views/PrivateChat.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/signup', name: 'Sign Up', component: SignUp },
  { path: '/chatrooms/:userId', name: 'Chatroom', component: Chatroom },
  { path: '/search', name: 'Search', component: Search },
  { path: '/profile/:userId', name: 'Profile', component: Profile },
  { path: '/signin', name: 'Sign In', component: SignIn },
  { path: '/addskill', name: 'Add Skill', component: AddSkill },
  { path: '/chatrooms/:userId/:chatroomId', name: 'Private Chat', component: PrivateChat }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
