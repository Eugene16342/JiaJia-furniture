<template>
  <div class="news_container">
    <Title_with_Line
      title="媒體專訪 ● JOURNAL"
      fontSize="1.5rem"
      fontWeight="600"
      lineHeight="3px"
    />

    <div class="articles_container">
      <router-link to="/" class="article">
        <div class="info">
          <span>222年22月22號</span>
          <span> — </span>
          <span>風傳媒</span>
        </div>
        <div class="article_title">
          台中西區5間文旅推薦！近勤美誠品、草悟道、美術館，開放式浴缸推薦情侶入住！
        </div>
      </router-link>
      <router-link to="/" class="article">
        <div class="info">
          <span>222年22月22號</span>
          <span> — </span>
          <span>風傳媒</span>
        </div>
        <div class="article_title">
          台中西區5間文旅推薦！近勤美誠品、草悟道、美術館，開放式浴缸推薦情侶入住！
        </div>
      </router-link>
      <router-link to="/" class="article">
        <div class="info">
          <span>222年22月22號</span>
          <span> — </span>
          <span>風傳媒</span>
        </div>
        <div class="article_title">
          台中西區5間文旅推薦！近勤美誠品、草悟道、美術館，開放式浴缸推薦情侶入住！
        </div>
      </router-link>
      <router-link to="/" class="article">
        <div class="info">
          <span>222年22月22號</span>
          <span> — </span>
          <span>風傳媒</span>
        </div>
        <div class="article_title">
          台中西區5間文旅推薦！近勤美誠品、草悟道、美術館，開放式浴缸推薦情侶入住！
        </div>
      </router-link>
      <router-link to="/" class="article">
        <div class="info">
          <span>222年22月22號</span>
          <span> — </span>
          <span>風傳媒</span>
        </div>
        <div class="article_title">
          台中西區5間文旅推薦！近勤美誠品、草悟道、美術館，開放式浴缸推薦情侶入住！
        </div>
      </router-link>
    </div>

    <div class="watch_more">watch more</div>
  </div>
</template>

<script setup>
import Title_with_Line from "../widgets/Title_with_Line.vue";
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";
.news_container {
  max-width: 100vw;
  .articles_container {
    display: grid;
    grid-template-columns: repeat(2, 1fr); // 兩列佈局
    gap: 20px; // 每篇文章間距
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
}

@media (max-width: 992px) {
  .news_container {
    .articles_container {
      grid-template-columns: 1fr; // 將每篇文章設為單列
      justify-items: center; // 讓每篇文章置中
    }
    .article {
      width: 100%; // 讓文章寬度佔滿容器
      max-width: 600px; // 可選，限制最大寬度
    }
  }
}
</style>
