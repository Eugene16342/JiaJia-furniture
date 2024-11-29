<template>
  <div class="amount_container">
    <div class="amount_btn minus_btn" @click="decreaseAmount">-</div>
    <input
      class="amount"
      type="number"
      :value="currentValue"
      @input="updateAmount($event.target.value)"
    />
    <div class="amount_btn plus_btn" @click="increaseAmount">+</div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

// Props 用於傳入父組件的初始值和最小/最大限制
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: Infinity,
  },
});

// Emit 用於更新父組件中的數據
const emit = defineEmits(["update:modelValue"]);

// 當前值
const currentValue = ref(props.modelValue);

// 方法
function increaseAmount() {
  if (currentValue.value < props.max) {
    currentValue.value += 1;
    emit("update:modelValue", currentValue.value);
  }
}

function decreaseAmount() {
  if (currentValue.value > props.min) {
    currentValue.value -= 1;
    emit("update:modelValue", currentValue.value);
  }
}

function updateAmount(value) {
  const newValue = Math.max(
    props.min,
    Math.min(props.max, parseInt(value) || props.min)
  );
  currentValue.value = newValue;
  emit("update:modelValue", currentValue.value);
}

// 監聽 modelValue 的變化，保持同步
watch(
  () => props.modelValue,
  (newValue) => {
    currentValue.value = newValue;
  }
);
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";

.amount_container {
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid $black5;
  font-weight: 600;
  font-size: 1.4rem;
  border-radius: 5px;
  .amount_btn {
    width: 20%;
    height: 100%;
    background-color: $black3;
    text-align: center;
    color: $white;
    cursor: pointer;
    padding: 5px 10px;
    transition: background-color 0.2s ease-in-out;
    user-select: none;
    &:hover {
      background-color: $black6;
    }
    .minus_btn {
      border-radius: 5px 0 0 5px;
    }
    .plus_btn {
      border-radius: 0 5px 5px 0;
    }
  }

  .amount {
    width: 60%;
    text-align: center;
    border: 1px solid $gray;
    background-color: $gray;
    color: $primary;
  }
}
</style>
