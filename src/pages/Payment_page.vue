<template>
  <div class="payment_container">
    <!-- 購買人資訊 -->
    <div class="recipient_info page_half">
      <div class="title">聯絡方式</div>
      <div class="two_half">
        <div class="input_container_half">
          <common_input
            id="phone"
            show_label="true"
            label="連絡電話"
            placeholder="連絡電話，市話請加區碼"
            v-model="form_state.phone.value"
            :errorMessage="form_state.phone.errorMessage"
            :hasError="form_state.phone.hasError"
          />
        </div>
        <div class="input_container_half">
          <common_input
            id="email"
            show_label="true"
            label="電子信箱"
            placeholder="電子信箱"
            v-model="form_state.email.value"
            :errorMessage="form_state.email.errorMessage"
            :hasError="form_state.email.hasError"
          />
        </div>
      </div>

      <div class="title">配送資訊</div>
      <div class="two_half">
        <div class="input_container_half">
          <common_input
            id="first_name"
            show_label="true"
            label="名字"
            placeholder="名字"
            v-model="form_state.first_name.value"
            :errorMessage="form_state.first_name.errorMessage"
            :hasError="form_state.first_name.hasError"
          />
        </div>
        <div class="input_container_half">
          <common_input
            id="last_name"
            show_label="true"
            label="姓氏"
            placeholder="姓氏"
            v-model="form_state.last_name.value"
            :errorMessage="form_state.last_name.errorMessage"
            :hasError="form_state.last_name.hasError"
          />
        </div>
      </div>
      <div class="input_container_full">
        <common_input
          id="address"
          show_label="true"
          label="配送地址"
          placeholder="地址"
          v-model="form_state.address.value"
          :errorMessage="form_state.address.errorMessage"
          :hasError="form_state.address.hasError"
        />
      </div>

      <!-- 付款方式 -->
      <div class="title">
        付款方式
        <span
          class="error_message"
          v-show="form_state.selected_option.hasError"
        >
          {{ form_state.selected_option.errorMessage }}
        </span>
      </div>

      <div
        class="pay_way_container"
        :class="{ error: form_state.selected_option.hasError }"
      >
        <div class="pay_way">
          <div
            class="payment_option"
            :class="{ active: selected_option === 'credit_one' }"
            @click="selectOption('credit_one')"
          >
            <input
              type="radio"
              id="credit_one"
              name="payment"
              value="credit_one"
              v-model="selected_option"
            />
            <label for="credit_one">信用卡分期</label>
          </div>
          <transition name="slide-fade">
            <div class="payment_detail" v-if="selected_option === 'credit_one'">
              <p>付款方式1</p>
            </div>
          </transition>
        </div>
        <div class="pay_way">
          <div
            class="payment_option"
            :class="{ active: selected_option === 'credit_installment' }"
            @click="selectOption('credit_installment')"
          >
            <input
              type="radio"
              id="credit_installment"
              name="payment"
              value="credit_installment"
              v-model="selected_option"
            />
            <label for="credit_installment">信用卡分期付清</label>
          </div>
          <transition name="slide-fade">
            <div
              class="payment_detail"
              v-if="selected_option === 'credit_installment'"
            >
              <p>付款方式2</p>
            </div>
          </transition>
        </div>
        <div class="pay_way">
          <div
            class="payment_option"
            :class="{ active: selected_option === 'bank_transfer' }"
            @click="selectOption('bank_transfer')"
          >
            <input
              type="radio"
              id="bank_transfer"
              name="payment"
              value="bank_transfer"
              v-model="selected_option"
            />
            <label for="bank_transfer">銀行匯款</label>
          </div>
          <transition name="slide-fade">
            <div
              class="payment_detail"
              v-if="selected_option === 'bank_transfer'"
            >
              <p>付款方式3</p>
            </div>
          </transition>
        </div>
      </div>

      <!-- 大於 992px 的確認按鈕 -->
      <div class="btn_confirm rwd_noshow">
        <common_btn text="確認訂單" @click="success_than_push()" />
      </div>
    </div>

    <!-- 商品資訊 -->
    <div class="product_info page_half">
      <div>
        <div
          class="product_info_card"
          v-for="item in selected_items"
          :key="item.product_id + item.color_id"
        >
          <div class="img_container">
            <img :src="item.image" alt="商品圖片" />
            <div class="img_amount">{{ item.quantity }}</div>
          </div>
          <div class="product_name">
            {{ item.name }}
            <br />
            {{ item.color_id ? item.color_name : "" }}
          </div>
          <div class="product_price">NT$ {{ item.price }}</div>
        </div>
      </div>
      <div class="code_container">
        <div class="input_container_code">
          <common_input
            v-model="form_state.discount.value"
            :errorMessage="form_state.discount.errorMessage"
            :hasError="form_state.discount.hasError"
            placeholder="折扣碼"
          />
        </div>
        <div class="btn_container">
          <common_btn text="使用" @click="discount()" fontSize="1" />
        </div>
      </div>

      <div class="total_price">
        <div class="price_row">
          <span>小記●{{ price_details.total_quantity }}個品項</span>
          <span>NT$ {{ price_details.sub_total }}</span>
        </div>
        <div class="price_row">
          <span class="delivery_fee">運費</span>
          <span>NT$ {{ price_details.delivery_fee }}</span>
        </div>
        <div class="price_row final_price">
          <span>總計</span> <span>NT$ {{ price_details.total_price }}</span>
        </div>
      </div>

      <!-- 小於 992px 確認按鈕 -->
      <div class="btn_confirm rwd_show">
        <common_btn text="確認訂單" @click="success_than_push()" />
      </div>
    </div>
  </div>
</template>

<script setup>
import common_btn from "../components/widgets/Common_btn.vue";
import common_input from "../components/widgets/Common_input.vue";

import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { use_cart_store } from "../stores/cart";
import payment_controller from "../controllers/payment_controller";

const router = useRouter();
const selected_option = ref("");
const cart_store = use_cart_store();

// 切換付款選項
function selectOption(option) {
  selected_option.value = option;
  form_state.selected_option.value = option;
}

// 計算已勾選的商品
const selected_items = computed(() => cart_store.selected_items);

// 訂單成功生成 跳轉畫面
async function success_than_push() {
  const is_success = await create_order();
  console.log(is_success);
  if (is_success) {
    router.push("/cart");
  }
}

onMounted(async () => {
  // 如果勾選的項目為空就跳轉
  if (cart_store.selected_items.length < 1) {
    return router.push("/cart");
  }
  await get_user_info();
  await computed_total_price();

  window.addEventListener("beforeunload", before_reload);
});

// 詢問是否要離開
function before_reload(event) {
  event.preventDefault();
}
onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", before_reload);
});

onBeforeRouteLeave((to, from, next) => {
  const answer = window.confirm("您確定要離開嗎？未完成的資料將會遺失。");
  if (answer) {
    reset_payment();
    next();
  } else {
    next(false);
  }
});

const {
  price_details,
  form_state,
  computed_total_price,
  discount,
  get_user_info,
  create_order,
  reset_payment,
} = payment_controller();
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
        position: relative;
        width: 60px;
        height: 60px;
        img {
          width: 60px;
          height: 60px;
          border-radius: 5px;
        }
        .img_amount {
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
        min-width: 160px;
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
    border-radius: 5px;
    padding: 10px;
    background-color: $gray;
    &.error {
      border: 2px solid $red;
    }
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
.error_message {
  font-weight: normal;
  font-size: 0.9rem;
  color: $red;
}
/* 動畫效果 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: max-height 1s ease-in-out;
  overflow: hidden;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  max-height: 0px;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  max-height: 200px;
}

@media (max-width: 992px) {
  .payment_container {
    display: block;
    &::before {
      display: none;
    }
    .page_half {
      width: 100%;
      .rwd_noshow {
        display: none;
      }
    }

    .product_info {
      .rwd_show {
        display: block;
      }
    }
  }
}
</style>
