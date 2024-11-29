<template>
  <div class="payment_container">
    <div class="recipient_info page_half">
      <div class="title">聯絡方式</div>
      <div class="input_container_full">
        <common_input placeholder="電子信箱" />
      </div>
      <div class="title">配送資訊</div>
      <div class="two_half">
        <div class="input_container_half">
          <common_input placeholder="名字" />
        </div>
        <div class="input_container_half">
          <common_input placeholder="姓氏" />
        </div>
      </div>
      <div class="input_container_full">
        <common_input placeholder="地址" />
      </div>
      <div class="input_container_full">
        <common_input placeholder="公寓、套房等(選填)" />
      </div>
      <div class="two_half">
        <div class="input_container_half">
          <common_input placeholder="市" />
        </div>
        <div class="input_container_half">
          <common_input placeholder="郵遞區號(選填)" />
        </div>
      </div>
      <div class="title">付款</div>
      <div class="pay_way_container">
        <div class="pay_way">
          <div
            class="payment_option"
            :class="{ active: selectedOption === 'credit_one' }"
            @click="selectOption('credit_one')"
          >
            <input
              type="radio"
              id="credit_one"
              name="payment"
              value="credit_one"
              @change="selectOption('credit_one')"
            />
            <label for="credit_one">綠界科技 - 信用卡一次付清</label>
          </div>
          <transition name="slide-fade">
            <div class="payment_detail" v-if="selectedOption === 'credit_one'">
              <p>
                按下一下「立即付款」後，系統將會將您重導向至綠界科技 -
                信用卡一次付清，以安全地完成購買程序。
              </p>
            </div>
          </transition>
        </div>
        <div class="pay_way">
          <div
            class="payment_option"
            :class="{ active: selectedOption === 'credit_installment' }"
            @click="selectOption('credit_installment')"
          >
            <input
              type="radio"
              id="credit_installment"
              name="payment"
              value="credit_installment"
              @change="selectOption('credit_installment')"
            />
            <label for="credit_installment">綠界科技 - 信用卡分期</label>
          </div>
          <transition name="slide-fade">
            <div
              class="payment_detail"
              v-if="selectedOption === 'credit_installment'"
            >
              <p>
                按下一下「立即付款」後，系統將會將您重導向至綠界科技 -
                信用卡分期，以安全地完成購買程序。
              </p>
            </div>
          </transition>
        </div>
        <div class="pay_way">
          <div
            class="payment_option"
            :class="{ active: selectedOption === 'bank_transfer' }"
            @click="selectOption('bank_transfer')"
          >
            <input
              type="radio"
              id="bank_transfer"
              name="payment"
              value="bank_transfer"
              @change="selectOption('bank_transfer')"
            />
            <label for="bank_transfer">銀行匯款</label>
          </div>
          <transition name="slide-fade">
            <div
              class="payment_detail"
              v-if="selectedOption === 'bank_transfer'"
            >
              <p>【銀行轉帳支付方式請留意】</p>
            </div>
          </transition>
        </div>
      </div>
      <div class="btn_confirm rwd_noshow">
        <common_btn text="確認訂單" />
      </div>
    </div>
    <div class="product_info page_half">
      <div class="rwd_noshow">
        <div class="product_info_card">
          <div class="img_container">
            <img src="../../public/product/product001.webp" />
            <div class="img_aomunt">5</div>
          </div>
          <div class="product_name">商品名稱</div>
          <div class="product_price">商品價格</div>
        </div>
        <div class="product_info_card">
          <div class="img_container">
            <img src="../../public/product/product001.webp" />
            <div class="img_aomunt">5</div>
          </div>
          <div class="product_name">
            商品名稱商品名稱商品名稱商品名稱商品名稱 商品名稱商品名稱 商品名稱
            商品名稱商品名稱 商品名稱商品名稱
          </div>
          <div class="product_price">商品價格</div>
        </div>
        <div class="product_info_card">
          <div class="img_container">
            <img src="../../public/product/product001.webp" />
            <div class="img_aomunt">5</div>
          </div>
          <div class="product_name">商品名稱</div>
          <div class="product_price">商品價格</div>
        </div>
      </div>
      <div class="code_container">
        <div class="input_container_code">
          <common_input placeholder="折扣碼" />
        </div>
        <div class="btn_container">
          <common_btn text="使用" fontSize="1" />
        </div>
      </div>

      <div class="total_price">
        <div class="price_row">
          <span>小記●9999個品項</span>
          <span>$9999999</span>
        </div>
        <div class="price_row">
          <span class="delivery_fee">運費</span>
          <span>$999</span>
        </div>
        <div class="price_row final_price">
          <span>總計</span><span>$999999999</span>
        </div>
      </div>
      <div class="btn_confirm rwd_show">
        <common_btn text="確認訂單" />
      </div>
    </div>
  </div>
</template>

<script setup>
import common_btn from "../components/widgets/Common_btn.vue";
import common_input from "../components/widgets/Common_input.vue";
import { ref } from "vue";

// 定義狀態
const selectedOption = ref("");

// 定義選項切換的方法
function selectOption(option) {
  selectedOption.value = option;
}
</script>

<style lang="scss" scoped>
@import "../assets/colors.scss";

.payment_container {
  min-height: 100vh;
  margin: -20px 0;
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  &::before {
    content: "";
    width: 1px;
    height: 100%;
    position: absolute;
    left: 50%;
    background-color: $black3;
  }
  .page_half {
    padding: 20px 40px;
    width: 50%;
  }
  .product_info {
    position: sticky;
    top: 80px;
    height: auto;
    .product_info_card {
      background-color: $gray;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 5%;
      margin-bottom: 10px;
      .img_container {
        min-width: 60px;
        img {
          width: 60px;
          border-radius: 5px;
        }
        .img_aomunt {
          position: absolute;
          top: -5px;
          right: -5px;
          border-radius: 50px;
          background-color: $black7;
          color: $white;
          min-width: 22px;
          height: 22px;
          padding: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .product_name {
      }
      .product_price {
        min-width: 100px;
      }
    }
    .code_container {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-left: auto;
      margin-top: 10px;
      .input_container_code {
        width: 200px;
      }
      .btn_container {
        margin-left: 10px;
        width: 60px;
        height: 40px;
        margin-bottom: 20px;
      }
    }
    .total_price {
      background-color: $gray;
      .price_row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        .delivery_fee {
          cursor: pointer;
          color: $red;
        }
      }
      .final_price {
        font-size: 1.2rem;
        font-weight: 600;
      }
    }
    .rwd_show {
      display: none;
    }
  }
  .title {
    font-weight: 600;
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  .two_half {
    display: flex;
    justify-content: space-between;
    .input_container_half {
      width: 48%;
    }
  }
  .pay_way_container {
    border: 2px solid $black2;
    padding: 10px;
    background-color: $gray;
    .pay_way {
      border: 2px solid $black2;
      border-radius: 5px;
      margin-bottom: 20px;

      .payment_option {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        input {
          margin-left: 10px;
          appearance: none; /* 移除預設樣式 */
          width: 20px;
          height: 20px;
          border: 2px solid $black3;
          border-radius: 50px;
          background-color: $white;
          cursor: pointer;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        input[type="radio"]:hover {
          background-color: $red;
        }

        input[type="radio"]:checked {
          background-color: $red;
        }

        label {
          width: 100%;
          height: 40px;
          cursor: pointer;
          display: flex;
          align-items: center;
          margin-left: 10px;
        }

        &.active {
          background-color: $wheat;
          font-weight: 600;
        }
      }
      .payment_detail {
        p {
          padding: 20px;
        }
      }
    }
  }
  .btn_confirm {
    margin-top: 50px;
  }
}
/* transition 動畫效果 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: max-height 1s ease-in-out; /* 動畫時長和緩動效果 */
  overflow: hidden;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  max-height: 0px; /* 初始或結束狀態高度為 0 */
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  max-height: 200px; /* 展開的最大高度，可根據內容調整 */
}

@media (max-width: 992px) {
  .payment_container {
    display: block;
    &::before {
      display: none;
    }
    .page_half {
      width: 100%;
    }

    .rwd_noshow {
      display: none;
    }
    .product_info {
      .rwd_show {
        display: block;
      }
    }
  }
}
</style>
