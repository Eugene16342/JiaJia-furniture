<template>
  <div
    class="btn_container"
    :class="[styleType]"
    :style="{ fontSize: fontSize + 'rem' }"
  >
    {{ text }}
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  fontSize: {
    type: [Number, String],
    default: 1.4,
  },
  styleType: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "second", "disable"].includes(value),
  },
});
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";

.btn_container {
  border: 1px solid $black5;
  border-radius: 5px;
  font-weight: 600;
  font-size: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: $primary;
  color: $gray;
  transition: color 0.1s ease-in-out, background-color 0.1s ease-in-out;
  user-select: none;
  &:hover {
    color: $red;
    background-color: $wheat;
  }
  &.second {
    background-color: $gray;
    color: $primary;
    &:hover {
      background-color: $red;
      color: $wheat;
    }
  }
  &.disable {
    background-color: $gray;
    color: $primary;
    cursor: not-allowed;
  }
}
</style>
