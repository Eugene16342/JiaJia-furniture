import { use_auth_store } from "../stores/index";
import { reactive, ref } from "vue";
import notify from "../controllers/notify_controller";
import axios from "axios";

const profile = reactive({
  user_name: "",
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  address: "",
});

const orders = ref([]);

export function use_profile_controller() {
  const auth_store = use_auth_store();
  const token = auth_store.token;

  // 獲取使用者資訊
  const fetch_profile = async () => {
    try {
      const { data } = await axios.get("/api/user/get_info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      profile.user_name = data.user_name;
      profile.first_name = data.first_name;
      profile.last_name = data.last_name;
      profile.phone = data.phone;
      profile.email = data.email;
      profile.address = data.address;
    } catch (error) {
      console.error("加載用戶資料失敗：", error);
      throw error;
    }
  };

  // 更新使用者資訊
  const update_profile = async (new_data) => {
    try {
      const { data } = await axios.put("/api/user/update_info", new_data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      profile.first_name = new_data.first_name || profile.first_name;
      profile.last_name = new_data.last_name || profile.last_name;
      profile.phone = new_data.phone || profile.phone;
      profile.email = new_data.email || profile.email;
      profile.address = new_data.address || profile.address;
      notify.success("已修改個人資訊!");
      return data;
    } catch (error) {
      console.error("更新失敗：", error);
      notify.error("修改個人資訊失敗!");
      throw error;
    }
  };

  // 獲取訂單資訊
  const fetch_orders = async () => {
    const auth_store = use_auth_store();
    const token = auth_store.token;
    try {
      const { data } = await axios.get("/api/user/get_orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // 按 created_at 降序排序
      data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      orders.value = data; // 將排序後的數據賦值給 orders
    } catch (error) {
      console.error("獲取訂單時發生錯誤", error);
    }
  };
  return {
    profile,
    fetch_profile,
    update_profile,
    orders,
    fetch_orders,
  };
}
