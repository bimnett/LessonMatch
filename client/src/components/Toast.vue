<template>
    <div
      class="toast-container position-fixed bottom-0 end-0 p-3"
      v-if="visible"
      style="z-index: 9999;"
    >
      <div
        class="toast align-items-center text-white bg-{{ variant }} border-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="d-flex">
          <div class="toast-body">
            <strong>{{ title }}</strong>
            <p>{{ message }}</p>
          </div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            aria-label="Close"
            @click="visible = false"
          ></button>
        </div>
      </div>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      visible: false,
      title: '',
      message: '',
      variant: 'success'
    }
  },
  methods: {
    showToast({ title, message, variant = 'success' }) {
      this.title = title
      this.message = message
      this.variant = variant
      this.visible = true

      setTimeout(() => {
        this.visible = false
      }, 3000)
    }
  }
}
</script>

  <style scoped>
  .toast-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1050;
  }

  </style>
