<template>
  <footer class="footer">
    <div class="top">
      <div>
        <div class="title">關於家家</div>
        <div class="column">
          <router-link to="/" class="text_hover">品牌故事</router-link>
          <router-link to="/" class="text_hover">居家體驗</router-link>
          <router-link to="/" class="text_hover">使用回饋</router-link>
          <router-link to="/" class="text_hover">商務合作</router-link>
        </div>
      </div>
      <div>
        <div class="title">購物說明</div>
        <div class="column">
          <router-link to="/" class="text_hover">保固說明</router-link>
          <router-link to="/" class="text_hover">保養須知</router-link>
          <router-link to="/" class="text_hover">退換貨須知</router-link>
          <router-link to="/" class="text_hover">交易流程</router-link>
          <router-link to="/" class="text_hover">運費試算</router-link>
        </div>
      </div>
      <div>
        <div class="title">服務條款</div>
        <div class="column">
          <router-link to="/" class="text_hover">會員權益</router-link>
          <router-link to="/" class="text_hover">隱私權政策</router-link>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="icon_container">
        <Icon icon="fb" />
        <Icon icon="ins" />
        <Icon icon="line" />
      </div>
      <div class="company_info">
        家家家具有限公司 | © 2024 jiajia . All Rights Reserved.
      </div>
    </div>
  </footer>
</template>

<script setup>
import Icon from "../components/The_icon.vue";
</script>

<style lang="scss" scoped>
@import "../assets/colors.scss";

.footer {
  max-width: 100vw;
  background-color: $gray;
  border-top: 2px solid $red;
  user-select: none;
  padding: 20px 10%;
  .top {
    display: flex;
    justify-content: space-around;
    .title {
      width: 80px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .column {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
  }
  .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    .icon_container {
      display: flex;
      gap: 50px;
      margin-bottom: 10px;
    }
    .company_info {
      font-size: 0.8rem;
    }
  }
}
</style>
