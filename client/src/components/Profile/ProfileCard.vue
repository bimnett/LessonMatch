<template>
  <b-card class="profile-card shadow-sm">
    <!-- Edit profile and Sign out buttons-->
    <b-button-group class="settings-btns" v-if="isOwnProfile">
      <b-button class="edit-btn" @click="$emit('edit')">Edit Profile</b-button>
      <b-button class="sign-out-btn" @click="$emit('signed-out')">Sign out</b-button>
    </b-button-group>
 
    <!-- Avatar and User info Section -->
    <b-row>
      <b-col cols="12">
        <b-avatar
          :text="userData.username ? userData.username.charAt(0).toUpperCase() : '?'"
          size="6rem"
          id="avatar"
        ></b-avatar>
        <h3 class="username">{{ userData.username }}</h3>
        <p class="location">
          {{ userData.location.city }}, {{ userData.location.country }}
        </p>
      </b-col>
    </b-row>
 
    <!-- Chat Button -->
    <b-button v-if="!isOwnProfile" id="msg-btn" @click="handleChatBtn">
      Chat with me!
    </b-button>
 
    <hr class="section-divider">
 
    <!-- Skills Section -->
    <b-card-text>
      <h4 class="skill-interest-text">Skills</h4>
      <b-row>
        <b-col v-for="skill in skills" 
               :key="skill._id" 
               cols="12" 
               sm="6" 
               md="4" 
               lg="3" 
               class="mb-2">
          <b-badge variant="info" class="skill-badge">
            {{ skill.name }} <small class="ml-1">(Level: {{ skill.level }})</small>
          </b-badge>
        </b-col>
      </b-row>
    </b-card-text>
 
    <hr class="section-divider">
 
    <!-- Interests Section -->
    <b-card-text>
      <h4 class="skill-interest-text">Interests</h4>
      <b-row>
        <b-col v-for="interest in interests" 
               :key="interest._id" 
               cols="12" 
               sm="6" 
               md="4" 
               lg="3" 
               class="mb-2">
          <b-badge variant="success" class="interest-badge">
            {{ interest.name }} <small class="ml-1">(Level: {{ interest.level }})</small>
          </b-badge>
        </b-col>
      </b-row>
    </b-card-text>    
 
    <hr class="section-divider" v-if="isOwnProfile">
 
    <!-- Add skill and Delete Buttons -->
    <b-button-group v-if="isOwnProfile" class="delete-add-btns">
      <b-button class="edit-btn" @click="this.$router.push('/addSkill')">Add Skill/Interest</b-button>
      <b-button class="sign-out-btn" @click="$emit('delete')">Delete Profile</b-button>
    </b-button-group>
  </b-card>
 </template>
 
 <script>
 import AddSkillButton from "./AddSkillButton.vue";
 import { createNewChat } from "@/Api";
 
 export default {
  name: "ProfileCard",
  components: {
    AddSkillButton,
  },
  data() {
    return {
      loggedInUser: localStorage.getItem('userId'),
      user: this.$route.params.userId
    }
  },
  props: {
    userData: {
      type: Object,
      required: true,
      default: () => ({
        username: "",
        birth_date: "",
        location: {
          city: "",
          country: "",
        },
      }),
    },
    skills: {
      type: Array,
      default: () => [],
    },
    interests: {
      type: Array,
      default: () => [],
    },
    isOwnProfile: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleSignOut() {
      this.$emit("signed-out");
    },
    async handleChatBtn() {
      try {
        const newChat = await createNewChat(this.loggedInUser, this.user);
        const chatroomId = newChat._id;
        this.$router.push(`/chatrooms/${this.loggedInUser}/${chatroomId}`);
      } catch (err) {
        console.error("There was an error going to the chat.");
      }
    },
  },
 };
 </script>
 
<style scoped>
.profile-card {
 position: relative;
 max-width: 100%;
 margin: 30px auto;
 background-color: #624eca;
 transition: all 0.3s ease;
}

.skill-interest-text {
 color: #ebfff9;
 margin-bottom: 1rem;
 font-size: calc(1.1rem + 0.3vw);
 transition: font-size 0.3s ease;
}

.edit-btn {
 background: linear-gradient(#5C6CD1E3, #4CD1B1E3);
 color: #ffffff;
 border: none;
 transition: all 0.3s ease;
}

.sign-out-btn {
 background: linear-gradient(#d40d0de3, #FF4D4F);
 color: #ffffff;
 border: none;
 transition: all 0.3s ease;
}

.username {
 font-weight: 600;
 color: #ebfff9;
 text-align: center;
 font-size: calc(1.2rem + 0.5vw);
 transition: font-size 0.3s ease;
}

#avatar {
 background: linear-gradient(#5C6CD1E3, #4CD1B1E3);
 margin: 1rem auto;
 display: block;
 transition: all 0.3s ease;
}

.location {
 font-size: calc(0.9rem + 0.2vw);
 color: #ebfff9;
 margin-bottom: 0.5rem;
 transition: font-size 0.3s ease;
 text-align: center;
}

.settings-btns {
 position: absolute;
 top: 1rem;
 right: 1rem;
 transition: all 0.3s ease;
}

@media (max-width: 576px) {
 .settings-btns {
   position: relative;
   top: 0;
   right: 0;
   margin-bottom: 1rem;
   width: 100%;
   display: flex;
   justify-content: center;
 }

 .settings-btns .btn {
   flex: 1;
   max-width: 150px;
   margin: 0 0.25rem;
 }
}

.section-divider {
 border: 0;
 height: 2px;
 background-color: #ebfff9;
 margin: 0.8rem calc(-1rem - 1px);
 transition: margin 0.3s ease;
}

.delete-add-btns {
  margin: 1rem; 
  display: flex; 
  justify-content: center;
}

.delete-add-btns .btn {
  flex: 0 1 auto;
  min-width: 120px;
}

@media (max-width: 576px) {
 .delete-add-btns {
   flex-direction: column;
 }
 
 .delete-add-btns .btn {
   width: 100%;
 }
}

#msg-btn {
 display: block;
 margin: 0 auto;
 margin-bottom: 1.5rem;
 background: linear-gradient(#5C6CD1E3, #4CD1B1E3);
 color: #ffffff;
 transition: all 0.3s ease;
}

.skill-badge,
.interest-badge {
 display: inline-block;
 padding: 0.5rem;
 font-size: 0.9rem;
 width: 100%;
 text-align: center;
 transition: all 0.3s ease;
 background: linear-gradient(#4EAFD7E3, #4CD1B1E3) !important;
 color: black !important;
}

@media (max-width: 768px) {
 .skill-badge,
 .interest-badge {
   font-size: 0.8rem;
   padding: 0.4rem;
 }
 
 small {
   display: block;
   margin-top: 0.2rem;
 }
}
</style>