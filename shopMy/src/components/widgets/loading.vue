<template>
  <div v-if="loading_store.isLoading" class="loading-overlay">
    <div class="spinner"></div>
  </div>
</template>

<script setup>
import { use_loading_store } from "../../stores/loading";
const loading_store = use_loading_store();
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $black3;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  .spinner {
    border: 4px solid $gray;
    border-left-color: $red;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
