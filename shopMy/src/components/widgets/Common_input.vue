<template>
  <div class="input_container">
    <label v-if="showLabel" :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="{ focused: isFocused, error: hasError }"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
    />
    <div class="error_message" :class="{ visible: hasError }">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  id: String,
  type: {
    type: String,
    default: "text",
  },
  modelValue: String,
  placeholder: String,
  showLabel: {
    type: [Boolean, String],
    default: false,
  },
  label: String,
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  errorMessage: String,
  hasError: {
    type: Boolean,
    default: false,
  },
});

const isFocused = ref(false);
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";

.input_container {
  label {
    font-weight: 600;
    cursor: pointer;
    display: inline-block;
    margin-bottom: 5px;
  }
  input {
    width: 100%;
    border: 2px solid $black2;
    border-radius: 5px;
    height: 40px;
    color: $primary;
    background-color: $gray;
    padding: 10px;
    transition: border 0.2s ease-in-out;
    &.focused {
      border-color: $black7;
    }
    &.error {
      border-color: $red;
    }
  }
  .error_message {
    width: 100%;
    height: 20px;
    color: $red;
    font-size: 0.9rem;
    opacity: 0;
    &.visible {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
