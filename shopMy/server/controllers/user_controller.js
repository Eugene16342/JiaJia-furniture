const db = require("../models");
const { formatTime } = require("../utils/time");

// 獲取使用者資料
exports.get_info = async (req, res) => {
  try {
    const { user_id } = req.user;

    // 查詢用戶基本信息和詳細信息
    const user = await db.users.findOne({
      where: { user_id }, // 根據 token 提供的 user_id 查詢
      include: [
        {
          model: db.user_detail, // 關聯 user_detail 表
          as: "user_detail", // 關聯別名，需與模型中定義一致
        },
      ],
    });

    // 如果用戶不存在，返回 404
    if (!user) return res.status(404).json({ message: "用戶不存在" });

    // 返回用戶基本信息和詳細信息
    res.json({
      user_name: user.user_name,
      email: user.email,
      first_name: user.user_detail.first_name,
      last_name: user.user_detail.last_name,
      phone: user.user_detail.phone,
      address: user.user_detail.address,
    });
  } catch (error) {
    console.error("加載用戶資料失敗:", error);
    res.status(500).json({ message: "伺服器錯誤" });
  }
};

// 更新使用者資料
exports.update_info = async (req, res) => {
  try {
    const { user_id } = req.user;

    const { email, first_name, last_name, phone, address } = req.body;
    console.log("req.body", req.body);
    // 查詢用戶基本信息
    const user = await db.users.findOne({
      where: { user_id },
      include: [
        {
          model: db.user_detail,
          as: "user_detail",
        },
      ],
    });

    if (email) user.email = email;
    await user.save();

    const user_detail = user.user_detail;
    if (first_name) user_detail.setDataValue("first_name", first_name);
    if (last_name) user_detail.setDataValue("last_name", last_name);
    if (phone) user_detail.setDataValue("phone", phone);
    if (address) user_detail.setDataValue("address", address);

    await user_detail.save();
    res.status(200).json({ message: "已更新使用者資訊" });
  } catch (error) {
    console.error("更新使用者資訊失敗:", error);
    res.status(500).json({ message: "更新使用者資訊失敗" });
  }
};

function translate(status) {
  switch (status) {
    case "pending":
      return "備貨中";
    case "shipped":
      return "運送中";
    case "delivered":
      return "已完成";
    default:
      return "異常";
  }
}

// 獲取訂單資料
exports.get_orders = async (req, res) => {
  const { user_id } = req.user;

  try {
    // 查詢訂單及相關聯的資料
    const orders = await db.orders.findAll({
      where: { user_id },
      include: [
        {
          model: db.order_items,
          attributes: ["product_id", "color_id", "quantity", "price"],
          as: "orders_hasmany_order_items",
          include: [
            {
              model: db.colors,
              attributes: ["color_name"],
              as: "order_item_belong_colors",
            },
            {
              model: db.products_info, // 關聯商品表
              attributes: ["name", "category_id"],
              as: "order_items_belong_product_info",
              include: [
                {
                  model: db.categories, // 關聯分類表
                  attributes: ["name"],
                  as: "category_id_belong_info",
                },
                {
                  model: db.product_images, // 關聯圖片表
                  attributes: ["img_url"],
                  as: "product_id_hasmany_img",
                },
              ],
            },
          ],
        },
      ],
    });

    const processedOrders = orders.map((order) => ({
      order_id: order.order_id,
      total_price: order.total_price,
      status: translate(order.status), // 狀態翻譯
      created_at: formatTime(order.created_at, "YYYY-MM-DD"),
      items: order.orders_hasmany_order_items.map((item) => {
        // 圖片路徑最後一部分
        const img_url =
          item.order_items_belong_product_info?.product_id_hasmany_img?.[0]
            ?.img_url || null;

        // 組合完整圖片路徑
        const image_path = `/product/${item.order_items_belong_product_info.category_id_belong_info.name}/${item.order_items_belong_product_info.category_id_belong_info.name}${item.product_id}/${img_url}`;
        return {
          // 商品數量
          quantity: item.quantity,
          // 商品價格
          price: item.price,

          // 商品名稱
          product_name:
            item.order_items_belong_product_info?.name || "未知品項",
          // 商品圖片路徑
          product_images: image_path || "未提供圖片",

          // 商品顏色名稱
          color_name: item.order_item_belong_colors?.color_name || "",
        };
      }),
    }));

    // 返回處理後的訂單資料
    res.json(processedOrders);
  } catch (error) {
    console.error("加載訂單資料失敗:", error);
    res.status(500).json({ message: "伺服器錯誤" });
  }
};
