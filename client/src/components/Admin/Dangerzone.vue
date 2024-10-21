<template>
    <div class="danger-zone-card">
      <h2 class="danger-zone-title">Danger Zone</h2>
      <p class="danger-zone-description">
        Warning: This section allows you to perform destructive actions. Please proceed with caution.
      </p>
      <div class="danger-zone-buttons">
        <DeleteUsers />
        <DeleteMessages />
      </div>
    </div>
</template>
  
<script>
import DeleteUsers from './DeleteUsers.vue';
import DeleteMessages from './DeleteMessages.vue';

  export default {
    name: 'DangerZone',
    components: {
        DeleteUsers,
        DeleteMessages
    }
  }
</script>
  
<style scoped>
.danger-zone-card {
  background-color: #ffdddd; 
  border: 1px solid #ff4d4d;
  border-radius: 8px;
  padding: 1rem;
  margin: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 50%;
}

.danger-zone-title {
  color: #ff4d4d;
  margin-bottom: 10px;
}

.danger-zone-description {
  color: #d60000;
  margin-bottom: 20px;
}

.danger-zone-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.danger-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.danger-button:hover {
  background-color: #e60000;
}
</style>