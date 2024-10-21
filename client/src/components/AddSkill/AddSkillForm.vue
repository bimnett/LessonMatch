<template>
    <div class = "create-skill-form">
        <form v-on:submit.prevent="createSkill">
            <input v-model="name" type="text" placeholder="Unique Skill Name" required />
            <input v-model="level" type="number" placeholder="Level (1-10)" required />
            <select v-model="category" class="category-dropdown" required>
              <option disabled value="">Select a category</option>
              <option v-for="category in categories" :key="category">
                {{ category }}
              </option>
            </select>
            <select v-model="isAnInterest" class="skill-or-interest-dropdown" required>
                <option disabled value="">Type</option>
                <option value="Skill">Skill</option>
                <option value="Interest">Interest</option>
            </select>
            <button class="btn" type="submit">Create Skill</button>
        </form>
    </div>
</template>

<script>
import { createSkill } from '@/Api'

export default {
  name: 'CreateSkillForm',
  data() {
    return {
      name: '',
      level: '',
      category: '',
      userId: localStorage.getItem('userId'),
      isAnInterest: '',
      categories: [
        'Music', 'Books', 'Movies', 'Programming', 'Sports'
      ]
    }
  },
  methods: {
    async createSkill() {
        try {
            if (this.isAnInterest === "Interest"){
                this.isAnInterest = true
            } else {
                this.isAnInterest = false
            }

            const newSkill = await createSkill(
                this.name,
                this.level,
                this.category,
                this.userId,
                this.isAnInterest
            );

            if (!newSkill) {
              window.alert('Error creating a new skill')
              console.log('Error creating a new skill')
            } else {
              this.$router.push(`/profile/${this.userId}`);
              console.log('A new skill has been created!')
            }
            
        } catch (error) {
            console.error(error);
        }
    }
  }
}
</script>

<style scoped>
.create-skill-form {
    max-width: 400px;
    margin: 0 auto;
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-bottom: 30px;
  }

  input, select {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: #745bf0;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color:#5d49c0;
  }

  @media only screen and (max-width: 768px) {
    .create-skill-form {
    width: 100%;
    }
  }
</style>