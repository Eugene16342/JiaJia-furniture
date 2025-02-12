<template>
  <div class="amount_container">
    <div class="amount_btn minus_btn" @click="decreaseAmount">-</div>
    <input
      class="amount"
      type="number"
      :value="modelValue"
      @input="update_amount($event.target.value)"
      @blur="handle_blur"
      @keydown="handle_keydown"
    />
    <div class="amount_btn plus_btn" @click="increaseAmount">+</div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch } from "vue";
import { product_controller } from "../../controllers/product_controller"; // 引入控制器

const props = defineProps({
  modelValue: { type: Number, required: true },
});

const emit = defineEmits(["update:modelValue"]);

function increaseAmount() {
  emit("update:modelValue", props.modelValue + 1);
}

function decreaseAmount() {
  if (props.modelValue === 1) {
    emit("update:modelValue", (props.modelValue = 1));
    return;
  }
  emit("update:modelValue", props.modelValue - 1);
}

function update_amount(value) {
  const newValue = Number(value); // 確保輸入值為數字
  emit("update:modelValue", newValue); // 通知父組件
}

// 處理失焦事件，修正空值為最小值
function handle_blur() {
  const validValue = product_controller.blur_to_min(props.modelValue); // 使用控制器修正空值
  emit("update:modelValue", validValue);
}

function handle_keydown(event) {
  product_controller.prevent_key_down(event);
}

watch(
  () => props.modelValue,
  (newValue) => {
    const validValue = product_controller.limit_quantity(newValue); // 使用控制器檢查範圍
    if (validValue !== newValue) {
      emit("update:modelValue", validValue); // 修正數值後再通知父組件
    }
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
    &.disabled {
      &:hover {
        background-color: $black3;
        cursor: default;
      }
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
