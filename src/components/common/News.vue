<template>
  <div class="news_container">
    <Title_with_Line
      title="媒體專訪 ● JOURNAL"
      fontSize="1.5rem"
      fontWeight="600"
      height="3px"
    />

    <div class="articles_container">
      <router-link
        v-for="(article, index) in articles_to_display"
        :key="index"
        to="/"
        class="article"
      >
        <div class="info">
          <span>{{ article.date }}</span>
          <span> — </span>
          <span>{{ article.source }}</span>
        </div>
        <div class="article_title">{{ article.title }}</div>
      </router-link>
    </div>

    <div
      class="watch_more"
      :class="{ watch_less: is_expanded }"
      @click="toggle_watch_more"
    >
      {{ is_expanded ? "收起文章" : "看更多" }}
    </div>
  </div>
</template>

<script setup>
import Title_with_Line from "../widgets/Title_with_Line.vue";

import { ref, computed } from "vue";

const is_expanded = ref(false);

const articles = [
  {
    id: 1,
    title:
      "台中西區5間文旅推薦！近勤美誠品、草悟道、美術館，開放式浴缸推薦情侶入住！",
    date: "222年22月22號",
    source: "風傳媒",
  },
  {
    id: 2,
    title:
      "台中西區5間文旅推薦！近勤美誠品、草悟道、美術館，開放式浴缸推薦情侶入住！",
    date: "222年22月22號",
    source: "風傳媒",
  },
  {
    id: 3,
    title:
      "台中西區5間文旅推薦！近勤美誠品、草悟道、美術館，開放式浴缸推薦情侶入住！",
    date: "222年22月22號",
    source: "風傳媒",
  },
  {
    id: 4,
    title:
      "台中西區5間文旅推薦！近勤美誠品、草悟道、美術館，開放式浴缸推薦情侶入住！",
    date: "222年22月22號",
    source: "風傳媒",
  },
  {
    id: 5,
    title:
      "台中西區5間文旅推薦！近勤美誠品、草悟道、美術館，開放式浴缸推薦情侶入住！",
    date: "222年22月22號",
    source: "風傳媒",
  },
  {
    id: 6,
    title:
      "台中西區5間文旅推薦！近勤美誠品、草悟道、美術館，開放式浴缸推薦情侶入住！",
    date: "222年22月22號",
    source: "風傳媒",
  },
  {
    id: 7,
    title:
      "台中西區5間文旅推薦！近勤美誠品、草悟道、美術館，開放式浴缸推薦情侶入住！",
    date: "222年22月22號",
    source: "風傳媒",
  },
];

// 如果 is_expanded 為否 只呈現前四篇
const articles_to_display = computed(() => {
  return is_expanded.value ? articles : articles.slice(0, 4);
});

function toggle_watch_more() {
  is_expanded.value = !is_expanded.value;
}
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";
.news_container {
  max-width: 100vw;
  .articles_container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 10px 20px;
    .article {
      &:hover {
        color: $red;
      }
      .article_title {
        font-weight: 600;
        line-height: 2;
      }
    }
  }

  .watch_more {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    border-radius: 10px;
    border: 1px solid $red;
    margin: auto;
    padding: 10px 0;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
    &:hover {
      color: $white;
      background-color: $red;
    }
  }
  .watch_less {
    color: $white;
    background-color: $red;
    &:hover {
      color: $red;
      background-color: $white;
    }
  }
}

@media (max-width: 992px) {
  .news_container {
    .articles_container {
      grid-template-columns: 1fr;
      justify-items: center;
    }
    .article {
      width: 100%;
      max-width: 600px;
    }
  }
}
</style>
