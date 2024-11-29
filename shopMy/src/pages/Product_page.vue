<template>
  <div class="page">
    <div class="product_page_container">
      <div class="page_half">
        <Product_img
          :images="imageList"
          initialImage="/product/product001.webp"
        />
      </div>
      <div class="page_half info_container">
        <Product_info
          title="大江東去浪淘盡 千古風流人物"
          description="大江東去，浪淘盡，千古風流人物。故壘西邊，人道是，三國周郎赤壁。亂石崩雲，驚濤裂岸，捲起千堆雪。江山如畫，一時多少豪傑。
遙想公瑾當年，小喬初嫁了，雄姿英發。羽扇綸巾，談笑間，檣櫓灰飛煙滅。故國神遊，多情應笑我，早生華髮。人生如夢，一尊還酹江月。
—來自貝冷絲皇發佈於貝冷絲皇的沙龍 "
          features="大江東去，浪淘盡，千古風流人物。故壘西邊，人道是，三國周郎赤壁。亂石崩雲，驚濤裂岸，捲起千堆雪。江山如畫，一時多少豪傑。
遙想公瑾當年，小喬初嫁了，雄姿英發。羽扇綸巾，談笑間，檣櫓灰飛煙滅。故國神遊，多情應笑我，早生華髮。人生如夢，一尊還酹江月。
—來自貝冷絲皇發佈於貝冷絲皇的沙龍 "
          :sizes="['超大', '超中', '超小']"
          :colors="['紅色', '鮮血色', '沒那麼紅']"
          :originalPrice="100"
          :discountedPrice="99"
        />
        <div class="add_to_cart">
          <div class="amount_container">
            <Amount_counter v-model="quantity" :min="1" :max="10" />
          </div>
          <div class="btn_container"><Common_btn text="加入購物車" /></div>
        </div>
      </div>
    </div>
    <div class="recommend_container">
      <Recommend />
    </div>
  </div>
</template>

<script setup>
import icon from "../components/common/The_icon.vue";
import Product_img from "../components/product/Product_img.vue";
import Product_info from "../components/product/Product_info.vue";
import Amount_counter from "../components/product/Amount_counter.vue";
import Common_btn from "../components/widgets/Common_btn.vue";
import Recommend from "../components/common/Recommend.vue";
import { ref } from "vue";

const imageList = [
  "/product/product001.webp",
  "/product/product001.webp",
  "/product/product001.webp",
  "/product/product001.webp",
];

const quantity = ref(1); // 默認數量為 1
</script>

<style lang="scss" scoped>
@import "../assets/colors.scss";

.product_page_container {
  max-width: 100%;
  display: flex;
  gap: 20px;
  .page_half {
    width: 50%;
    background-color: $gray;
  }
  .info_container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 0 30px 0;
    .add_to_cart {
      width: 80%;
      margin: auto;
      .amount_container {
        width: 80%;
        max-width: 250px;
        margin: auto;
        margin-bottom: 20px;
      }
      .btn_container {
        width: 100%;
        max-width: 500px;
        height: 40px;
        margin: auto;
      }
    }
  }
}

@media (max-width: 992px) {
  .product_page_container {
    display: flex;
    flex-direction: column;
    .page_half {
      width: 100vw;
    }
  }
  .recommend_container {
    display: none;
  }
}
</style>
