<template>
  <div class="title-container">
    <div class="title" :style="{ fontSize, fontWeight }">{{ title }}</div>
    <div
      class="line"
      :style="{ height: lineHeight, backgroundColor: lineColor }"
    ></div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  fontSize: {
    type: String,
    default: "1.5rem",
  },
  fontWeight: {
    type: [String, Number],
    default: 600,
  },
  lineHeight: {
    type: [String, Number],
    default: "3px",
  },
  lineColor: {
    type: String,
    default: "rgb(206, 97, 74)", // 改成實際的顏色值而非變量名
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/colors.scss";
.title-container {
  max-width: 100vw;
  .title {
    font-size: v-bind(fontSize);
    font-weight: v-bind(fontWeight);
    user-select: none;
  }
  .line {
    width: 100%;
    background-color: v-bind(lineColor);
    height: v-bind(lineHeight);
    margin: 10px 0;
    border-radius: 3px;
  }
}

@media (max-width: 992px) {
  .title-container {
    .title {
      padding-left: 20px;
    }
    .line {
      width: 95%;
      margin: 10px auto;
    }
  }
}
</style>
