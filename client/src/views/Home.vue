<template>
  <div>
    <section id="home">
      <div class="home-content">
        <div class="title">
          <b-container fluid>
            <h1 class="display-2 fw-bold">LessonMatch</h1>
          </b-container>
        </div>
        <p class="sub-title">A place where you unlock new skills and share what you know.</p>
        <b-row>
          <div v-if="!userId">
              <SignUpButton class="button"/>
              <SignIn class="button"/>
            </div>
          <div v-else-if="admin" class="admin-card">
            <Dangerzone class="button"/>
          </div>
        </b-row>
			</div>
    </section>

    <section id="information">
      <div class="information-content">
          <h3>Ready to start your learning journey?</h3>
          <p class="sub-title">LessonMatch connects learners and teachers to help each other grow.</p>
          <div v-if="userId">
          <b-button class="btn" @click="showSearch"><span style="text-transform: uppercase;">Search for users</span></b-button>
          </div>
      </div>
    </section>

    <section id="features">
      <div class="features-title">
        <p>Innovative Features of LesssonMatch</p>
      </div>

      <div class="feature-cards">
        <div class="feature-card">
          <h4>Skill Category Search</h4>
          <p>  Find and connect with users who possess specific skills or expertise by utilizing our intuitive search page, making skill-sharing more accessible.</p>
        </div>
        <div class="feature-card">
          <h4>Real-Time Collaborative Learning</h4>
          <p>Engage in live chatrooms where users can ask questions, share insights, and collaborate on skill development in real time.</p>
        </div>
        <div class="feature-card">
          <h4>Personalized User Profiles</h4>
          <p>Showcase your skills and interests on your profile to allow others to understand your expertise and learning goals.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import SignUpButton from '@/components/SignUp/SignUpButton.vue'
import SignIn from '@/components/SignIn/SignInButton.vue';
import Dangerzone from '@/components/Admin/Dangerzone.vue';

export default {
  name: 'home',
  data() {
    return {
      message: 'none',
      userId: localStorage.getItem('userId'),
      admin: localStorage.getItem('admin')
    }
  },
  methods: {
    showSearch() {
      this.$router.push('/search');
    }
  },
  components: {
    Dangerzone,
    SignUpButton,
    SignIn,
  }
}
</script>

<style scoped>
.btn_message {
  margin-bottom: 1em;
}

.admin-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20rem;
}

/* Buttons */
.btn {
    display: inline-block;
    padding: 10px 30px;
    cursor: pointer;
    background-color: #745bf0;
    font-weight: 600;
    letter-spacing: .2em;
    border: none;
    border-radius: 5px;
}

.btn:hover {
    background-color: #5d49c0;
}

.button {
  display: inline-block;
  padding: 10px 10px;
}

/* Home section */
#home {
    display: grid;
    align-items: stretch;
    height: 100%;
    margin: 0;
}

.home-content {
    padding: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 500px;
    background: linear-gradient(#5C6CD1E3, #4CD1B1E3);
    border-bottom: 2px solid #44ac93e3;
    box-sizing: border-box;
}

.title {
  margin-bottom: 10px;
}

.sub-title {
    font-size: larger;
}

/* Information section */
#information {
    text-align: center;
    margin: 0 auto; 
    padding-bottom: 10px; 
    box-sizing: border-box; 
    border-bottom: 2px solid #44ac93e3;
}

.information-content {
    padding: 50px;
}

.information-content p {
    font-size: 16px; 
    line-height: 1.5;
    margin: 20px;
}

/* features section */
#features {
    background: linear-gradient(#4CD1B1E3, #5C6CD1E3);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
    padding-bottom: 80px;
    padding-top: 60px;
}

.features-title {
    margin-bottom: 20px;
    font-size: x-large;
}

.feature-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
}

.feature-card {
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
    margin: 10px;
    text-align: center;
    max-width: 300px;
}

.feature-card h4 {
    margin-bottom: 10px;
}
</style>
