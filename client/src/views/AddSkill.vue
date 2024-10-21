<template>
    <div id="container">
      <div id="sub-container">
        <h1>Add Skill</h1>
          <AddSkillForm/>
      </div>
    </div>
</template>

<script>

import AddSkillForm from '@/components/AddSkill/AddSkillForm.vue';

export default {
  name: 'Add Skill',
  components: {
    AddSkillForm
  }
}
</script>

<style scoped>

#container {
  margin: 70px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

#sub-container {
  padding: 20px 35px;
  border: 2px solid;
  display: inline-block; 
  border-image: linear-gradient(to right, #5C6CD1E3, #4CD1B1E3) 1; 
}

</style>