<template>
  <div class="profile_info">
    <div class="input_container">
      <common_input
        id="name"
        label="使用者帳號"
        placeholder="請輸入使用者帳號"
        :showLabel="true"
        :readonly="true"
        v-model="profile.user_name"
        disabled
      />
    </div>

    <div class="input_half_container">
      <div class="input_half">
        <common_input
          id="first_name"
          label="名字"
          placeholder="名字"
          :showLabel="true"
          :readonly="!isEditable"
          v-model="profile.first_name"
        />
      </div>

      <div class="input_half">
        <common_input
          id="last_name"
          label="姓氏"
          placeholder="姓氏"
          :showLabel="true"
          :readonly="!isEditable"
          v-model="profile.last_name"
        />
      </div>
    </div>

    <div class="input_half_container">
      <div class="input_half">
        <common_input
          id="phone"
          label="聯絡電話"
          placeholder="連絡電話"
          :showLabel="true"
          :readonly="!isEditable"
          v-model="profile.phone"
        />
      </div>

      <div class="input_half">
        <common_input
          id="email"
          label="電子信箱"
          placeholder="電子信箱"
          :showLabel="true"
          :readonly="!isEditable"
          v-model="profile.email"
        />
      </div>
    </div>

    <div class="input_container">
      <common_input
        id="house"
        label="地址"
        placeholder="地址"
        :showLabel="true"
        :readonly="!isEditable"
        v-model="profile.address"
      />
    </div>

    <div class="btn_row">
      <div class="btn_container">
        <common_btn
          :text="isEditable ? '儲存更改' : '修改資訊'"
          @click="toggle_edit"
        />
      </div>
      <div class="btn_container" v-if="isEditable">
        <common_btn text="取消" @click="cancel_changes" />
      </div>
    </div>
  </div>
</template>

<script setup>
import common_input from "../widgets/Common_input.vue";
import common_btn from "../widgets/Common_btn.vue";
import { ref, reactive, onMounted } from "vue";
import { use_profile_controller } from "../../controllers/profile_controller";

const { profile, fetch_profile, update_profile } = use_profile_controller();

// 暫存資料
const temp = reactive({
  user_name: "",
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  address: "",
});

// 編輯模式狀態
const isEditable = ref(false);

// 切換編輯模式
const toggle_edit = async () => {
  if (!isEditable.value) {
    // 開啟編輯功能 暫存舊資料
    temp.user_name = profile.user_name;
    temp.first_name = profile.first_name;
    temp.last_name = profile.last_name;
    temp.phone = profile.phone;
    temp.email = profile.email;
    temp.address = profile.address;

    isEditable.value = true;
  } else {
    await update_profile(profile);
    isEditable.value = false;
  }
};

// 取消變更 舊資料還原
const cancel_changes = () => {
  profile.first_name = temp.first_name;
  profile.last_name = temp.last_name;
  profile.phone = temp.phone;
  profile.email = temp.email;
  profile.address = temp.address;
  isEditable.value = false;
};

onMounted(async () => {
  await fetch_profile();
});
</script>

<style lang="scss" scoped>
@import "../../assets/colors.scss";
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
