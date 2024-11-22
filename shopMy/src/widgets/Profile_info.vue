<template>
  <div class="profile_info">
    <div class="input_container">
      <common_input
        id="name"
        label="使用者名稱"
        placeholder="請輸入使用者名稱"
        :showLabel="true"
        :readonly="true"
        v-model="userName"
        disabled
      />
    </div>

    <!-- 名字與姓氏 -->
    <div class="input_half_container">
      <div class="input_half">
        <common_input
          id="first_name"
          label="名字"
          placeholder="名字"
          :showLabel="true"
          :readonly="!isEditable"
          v-model="firstName"
        />
      </div>

      <div class="input_half">
        <common_input
          id="last_name"
          label="姓氏"
          placeholder="姓氏"
          :showLabel="true"
          :readonly="!isEditable"
          v-model="lastName"
        />
      </div>
    </div>

    <!-- 公寓地址 -->
    <div class="input_container">
      <common_input
        id="house"
        label="公寓套房等(選填)"
        placeholder="地址"
        :showLabel="true"
        :readonly="!isEditable"
        v-model="houseAddress"
      />
    </div>

    <!-- 市與郵遞區號 -->
    <div class="input_half_container">
      <div class="input_half">
        <common_input
          id="city"
          label="市"
          placeholder="市"
          :showLabel="true"
          :readonly="!isEditable"
          v-model="city"
        />
      </div>

      <div class="input_half">
        <common_input
          id="code"
          label="郵遞區號(選填)"
          placeholder="郵遞區號"
          :showLabel="true"
          :readonly="!isEditable"
          v-model="postalCode"
        />
      </div>
    </div>

    <!-- 按鈕區域 -->
    <div class="btn_row">
      <div class="btn_container">
        <!-- 編輯模式按鈕 -->
        <common_btn
          :text="isEditable ? '儲存更改' : '修改資訊'"
          @click="toggleEditMode"
        />
      </div>
      <div class="btn_container" v-if="isEditable">
        <!-- 取消按鈕 -->
        <common_btn text="取消" @click="cancelChanges" />
      </div>
    </div>
  </div>
</template>

<script setup>
import common_input from "./Common_input.vue";
import common_btn from "./Common_btn.vue";
import { ref } from "vue";

// 初始資料
const userName = ref("使用者帳號");
const firstName = ref("John");
const lastName = ref("Doe");
const houseAddress = ref("123 假地址");
const city = ref("假城市");
const postalCode = ref("10000");

// 暫存資料，用於取消變更時還原
const tempFirstName = ref(firstName.value);
const tempLastName = ref(lastName.value);
const tempHouseAddress = ref(houseAddress.value);
const tempCity = ref(city.value);
const tempPostalCode = ref(postalCode.value);

// 編輯模式狀態
const isEditable = ref(false);

// 切換編輯模式
function toggleEditMode() {
  if (isEditable.value) {
    // 儲存變更
    saveChanges();
  } else {
    // 進入編輯模式，複製當前資料到暫存區
    tempFirstName.value = firstName.value;
    tempLastName.value = lastName.value;
    tempHouseAddress.value = houseAddress.value;
    tempCity.value = city.value;
    tempPostalCode.value = postalCode.value;
  }
  isEditable.value = !isEditable.value;
}

// 儲存變更
function saveChanges() {
  console.log("資訊已儲存：", {
    firstName: firstName.value,
    lastName: lastName.value,
    houseAddress: houseAddress.value,
    city: city.value,
    postalCode: postalCode.value,
  });
}

// 取消變更
function cancelChanges() {
  // 還原暫存資料
  firstName.value = tempFirstName.value;
  lastName.value = tempLastName.value;
  houseAddress.value = tempHouseAddress.value;
  city.value = tempCity.value;
  postalCode.value = tempPostalCode.value;

  // 退出編輯模式
  isEditable.value = false;
}
</script>

<style lang="scss" scoped>
@import "../assets/colors.scss";
.profile_info {
  .input_container {
    width: 100%;
    margin: auto;
  }

  .input_half_container {
    width: 100%;
    display: flex;
    margin: auto;
    gap: 20px;
    .input_half {
      width: 50%;
      margin: auto;
    }
  }
  .btn_row {
    display: flex;
    gap: 10%;
    .btn_container {
      width: 100%;
      margin: auto;
    }
  }
}
</style>
