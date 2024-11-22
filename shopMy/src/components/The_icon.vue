<template>
  <svg :class="{ active: isActive }" :style="{ color: color }">
    <use :href="`${sprite}#icon-${icon}`"></use>
  </svg>
</template>

<script setup>
import sprite from "../assets/icons/sprite.svg";

defineProps({
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "$primary",
  },
  isActive: {
    type: Boolean,
    default: false, // 默認為不活躍
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/colors.scss";

svg {
  width: 30px;
  height: 30px;
  color: $primary;
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;
  &:hover {
    color: $red;
  }
  &.active {
    color: $red;
  }
}
</style>
