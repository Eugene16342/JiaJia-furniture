import { use_cart_store, use_auth_store } from "../stores/index";
import notification_method from "../controllers/notify_controller";
import axios from "axios";
import { reactive, ref } from "vue";

export default function payment_controller() {
  const form_state = reactive({
    phone: { value: "", errorMessage: "", hasError: false },
    email: { value: "", errorMessage: "", hasError: false },
    first_name: { value: "", errorMessage: "", hasError: false },
    last_name: { value: "", errorMessage: "", hasError: false },
    address: { value: "", errorMessage: "", hasError: false },
    selected_option: { value: "", errorMessage: "", hasError: false },
    discount: { value: "", errorMessage: "", hasError: false },
  });

  const price_details = ref({
    total_quantity: 0,
    sub_total: 0,
    delivery_fee: 0,
    total_price: 0,
  });

  async function computed_total_price() {
    const cart_store = use_cart_store();
    const auth_store = use_auth_store();
    const token = auth_store.token;
    const select_items = cart_store.selected_items;
    try {
      const { data } = await axios.post(
        "/api/payment/computed_total_price",
        select_items,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      price_details.value = {
        total_quantity: data.total_quantity,
        sub_total: data.sub_total,
        delivery_fee: data.delivery_fee,
        total_price: data.total_price,
      };
    } catch (error) {
      console.error("計算商品價格時出現錯誤", error);
    }
  }

  // 驗證折扣碼(暫時無用)
  function discount() {
    if (form_state.discount.value) {
      form_state.discount.errorMessage = "該折扣碼無效";
      form_state.discount.hasError = true;
    } else {
      form_state.discount.errorMessage = "";
      form_state.discount.hasError = false;
    }
  }

  // 自動填入使用者資訊
  async function get_user_info() {
    try {
      const auth_store = use_auth_store();
      const token = auth_store.token;

      const { data } = await axios.get("/api/user/get_info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      form_state.first_name.value = data.first_name || "";
      form_state.last_name.value = data.last_name || "";
      form_state.phone.value = data.phone || "";
      form_state.email.value = data.email || "";
      form_state.address.value = data.address || "";

      return true;
    } catch (error) {
      console.error("加載用戶資料失敗：", error);
      return false;
    }
  }

  // 確認表單填寫
  function order_confirm() {
    let is_valid = true;

    // 驗證電話
    const phone_regex = /^[0-9]{10}$/;
    if (!phone_regex.test(form_state.phone.value)) {
      form_state.phone.errorMessage = "電話號碼格式錯誤";
      form_state.phone.hasError = true;
      is_valid = false;
    } else {
      form_state.phone.errorMessage = "";
      form_state.phone.hasError = false;
    }

    // 驗證信箱
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email_regex.test(form_state.email.value)) {
      form_state.email.errorMessage = "電子信箱格式錯誤";
      form_state.email.hasError = true;
      is_valid = false;
    } else {
      form_state.email.errorMessage = "";
      form_state.email.hasError = false;
    }

    // 驗證名
    if (form_state.first_name.value.trim() === "") {
      form_state.first_name.errorMessage = "請輸入收件人名稱";
      form_state.first_name.hasError = true;
      is_valid = false;
    } else {
      form_state.first_name.errorMessage = "";
      form_state.first_name.hasError = false;
    }

    // 驗證姓
    if (form_state.last_name.value.trim() === "") {
      form_state.last_name.errorMessage = "請輸入收件人姓氏";
      form_state.last_name.hasError = true;
      is_valid = false;
    } else {
      form_state.last_name.errorMessage = "";
      form_state.last_name.hasError = false;
    }

    // 驗證地址
    if (form_state.address.value.trim() === "") {
      form_state.address.errorMessage = "請輸入收件人地址";
      form_state.address.hasError = true;
      is_valid = false;
    } else {
      form_state.address.errorMessage = "";
      form_state.address.hasError = false;
    }

    // 驗證付款方式
    if (!form_state.selected_option.value) {
      form_state.selected_option.errorMessage = "請選擇付款方式";
      form_state.selected_option.hasError = true;
      is_valid = false;
    } else {
      form_state.payway_error = "";
    }

    return is_valid;
  }

  // 送出表單
  async function create_order() {
    const cart_store = use_cart_store();
    const auth_store = use_auth_store();

    const token = auth_store.token;
    const select_items = cart_store.selected_items;

    const payload = {
      user_info: {
        name: form_state.last_name.value + form_state.first_name.value,
        phone: form_state.phone.value,
        email: form_state.email.value,
        address: form_state.address.value,
      },
      items: select_items,
      payway: form_state.selected_option.value,
      discount_code: form_state.discount.value || null,
    };
    if (await order_confirm()) {
      try {
        const { data } = await axios.post(
          "/api/payment/order_confirm",
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        notification_method.success(`訂單成立！單號為：${data.order_id}`);

        cart_store.clear_selected();
        return true;
      } catch (error) {
        console.error("發送訂單失敗:", error);
      }
    } else {
      notification_method.info("資訊尚未填寫完整");

      return false;
    }
  }

  // 離開付款頁之前 清空資料
  function reset_payment() {
    const cart_store = use_cart_store();
    cart_store.clear_selected();
    form_state.phone.value = "";
    form_state.email.value = "";
    form_state.first_name.value = "";
    form_state.last_name.value = "";
    form_state.address.value = "";
    form_state.selected_option.value = "";
    form_state.discount.value = "";
  }

  return {
    price_details,
    form_state,
    computed_total_price,
    get_user_info,
    discount,
    order_confirm,
    create_order,
    reset_payment,
  };
}
