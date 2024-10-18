<template>
    <b-card
      class="profile-card shadow-sm"
    >

    <b-button 
    v-if="isOwnProfile" 
    variant="danger" 
    class="position-absolute" 
    style="top: 10px; right: 10px;"
    @click="signOut">
    Sign Out
  </b-button>

      <b-row>
        <b-col cols="12" md="12" class="text-center mb-4">
          <b-avatar
            :text="userData.username ? userData.username.charAt(0).toUpperCase() : '?'"
            size="6rem"
            variant="info"
            class="mb-3"
          ></b-avatar>
          <h3 class="username">{{ userData.username }}</h3>
        </b-col>
  
        <b-col cols="12" md="12">
          <b-list-group flush>
            <b-list-group-item>
                <div>
                    <strong>Birth Date:</strong> {{ userData.birth_date }}
                </div>
                <div>
                    <strong>Location:</strong> 
                    {{ userData.location.city }}, {{ userData.location.country }}
                </div>
                <div>
                    <b-button 
                    v-if="!isOwnProfile" 
                    variant="outline-primary" 
                    id="msg-btn" 
                    @click="handleChatBtn">
                    Chat with me!
                    </b-button>
                </div>           
            </b-list-group-item>
            <b-list-group-item>
            </b-list-group-item>
          </b-list-group>
  
          <b-card-text class="mt-4">
            <h4 class="mb-3">
              Skills
            </h4>
            <b-row>
              <b-col v-for="skill in skills" :key="skill._id" cols="12" md="4" class="mb-2">
                <b-badge variant="info" class="skill-badge">
                  {{ skill.name }}
                  <small class="ml-1">(Level: {{ skill.level }})</small>
                </b-badge>
              </b-col>
            </b-row>
          </b-card-text>
  
          <b-card-text class="mt-4">
            <h4 class="mb-3">
              Interests
            </h4>
            <b-row>
              <b-col v-for="interest in interests" :key="interest._id" cols="12" md="4" class="mb-2">
                <b-badge variant="success" class="interest-badge">
                  {{ interest.name }}
                  <small class="ml-1">(Level: {{ interest.level }})</small>
                </b-badge>
              </b-col>
            </b-row>
          </b-card-text>
  
          <AddSkillButton v-if="isOwnProfile"/>

          <div v-if="isOwnProfile" class="mt-4">
            <b-button-group>
              <b-button variant="outline-primary" @click="$emit('edit')">
                Edit Profile
              </b-button>
              <b-button variant="outline-danger" @click="$emit('delete')">
                Delete Profile
              </b-button>
            </b-button-group>
          </div>
        </b-col>
      </b-row>
    </b-card>
</template>
  
<script>
  import "./AddSkillButton.vue"
  import AddSkillButton from "./AddSkillButton.vue";
  import { createNewChat } from "@/Api";

  export default {
    name: 'ProfileCard',
    components: {
        AddSkillButton
    },
    data() {
        return {
            loggedInUser: localStorage.getItem('userId'),
            user: this.$route.params.userId,
        }
    },
    props: {
      userData: {
        type: Object,
        required: true,
        default: () => ({
          username: '',
          birth_date: '',
          location: {
            city: '',
            country: ''
          }
        })
      },
      skills: {
        type: Array,
        default: () => []
      },
      interests: {
        type: Array,
        default: () => []
      },
      isOwnProfile: {
        type: Boolean,
        default: false
      }
    },
    methods: {
        async signOut() {
            try {
                localStorage.removeItem('userId')
                this.$router.push('/')
            } catch (error) {
                console.log('There was an error signing out.');
              }
        },
        async handleChatBtn() {
            try {
                const newChat = await createNewChat(this.loggedInUser, this.user);
                const chatroomId = newChat._id;
                this.$router.push(`/chatrooms/${this.loggedInUser}/${chatroomId}`);
            } catch(err) {
                console.error('There was an error going to the chat.');
            }
        }
    }
  }
</script>
  
<style scoped>

.profile-card {
    max-width: 100%;
    margin: 2rem auto;
}
  
.username {
    font-weight: 600;
    color: #2c3e50;
}

#msg-btn {
    margin-top: 10px;
}

.skill-badge, .interest-badge {
    display: inline-block;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    width: 100%;
    text-align: center;
}
  
.skill-badge {
    background-color: #17a2b8;
}
  
.interest-badge {
    background-color: #28a745;
}

</style>