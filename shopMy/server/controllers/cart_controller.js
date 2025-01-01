const db = require("../models"); // 引入 Sequelize models

// 添加項目至購物車
exports.insert_item = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { product_id, color_id, quantity } = req.body;

    // 檢查數據庫中是否已存在相同的商品（同用戶、同商品、同顏色）
    const existing_item = await db.cart.findOne({
      where: {
        user_id,
        product_id,
        color_id: color_id || null, // 顏色可以為空
      },
    });

    if (existing_item) {
      // 如果已存在，疊加數量，但總數量不能超過 10
      const total_quantity = existing_item.quantity + quantity;
      if (total_quantity > 10) {
        return res.status(200).json({
          status: "limit",
        });
      }

      // 更新數量
      const updated_quantity = Math.min(total_quantity, 10);
      await existing_item.update({ quantity: updated_quantity });

      return res.json({
        status: "updated",
        item: existing_item,
      });
    } else {
      // 如果不存在，創建新紀錄
      const newCartItem = await db.cart.create({
        user_id,
        product_id,
        color_id: color_id || null, // 存入顏色ID，允許為空
        quantity: Math.min(quantity, 10), // 數量最大限制 10
      });
      return res.json({
        status: "create",
        item: newCartItem,
      });
    }
  } catch (error) {
    console.error("同步購物車時出錯:", error);
    return res.status(500).json({ error: "同步購物車時發生錯誤" });
  }
};

// 將 localStorage 的購物車內容同步到帳號內
exports.sync_cart_items = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const cart_items = req.body.cart;
    const result = [];

    for (const item of cart_items) {
      const { product_id, color_id, quantity } = item;

      // 檢查每個筆數據
      if (!product_id || !quantity) {
        result.push({
          product_id,
          status: "failed",
          message: "商品ID 和 數量 為必填項",
        });
        continue; // 跳過此項目
      }

      // 檢查資料庫內是否已存在相同的資料(同一人同一物同一色)
      const existing_item = await db.cart.findOne({
        where: {
          user_id,
          product_id,
          color_id: color_id || null, // 顏色可為空
        },
      });

      if (existing_item) {
        const total_quantity = existing_item.quantity + quantity;
        const updated_quantity = Math.min(total_quantity, 10);

        await existing_item.update({ quantity: updated_quantity });
        result.push({
          product_id,
          color_id,
          status: "update",
          quantity: updated_quantity,
        });
      } else {
        // 購物車表內沒有資料就新建資料
        const new_item = await db.cart.create({
          user_id,
          product_id,
          color_id: color_id || null,
          quantity: Math.min(quantity, 10),
        });

        result.push({
          product_id,
          color_id,
          status: "created",
          quantity: new_item.quantity,
        });
      }
    }

    return res.json({
      message: "購物車同步成功",
      result,
    });
  } catch (error) {
    console.error("購物車同步失敗:", error);
    return res.status(500).json({ error: "購物車同步失敗!" });
  }
};

// 獲取登入後的購物車內容
exports.get_user_cart = async (req, res) => {
  try {
    const { user_id } = req.user; // 從 token 提取的 user_id

    // 查詢用戶購物車數據
    const cartItems = await db.cart.findAll({
      where: { user_id },
      include: [
        {
          model: db.products_info,
          as: "cart_belong_info",
          attributes: ["name", "price"],
          include: [
            {
              model: db.product_images,
              as: "product_id_hasmany_img",
              attributes: ["img_url"],
            },
            {
              model: db.categories,
              attributes: ["name"],
              as: "category_id_belong_info",
            },
          ],
        },
        {
          model: db.colors,
          as: "cart_belong_color",
          attributes: ["color_name"],
        },
      ],
    });

    // 格式化數據
    const cart_items = cartItems.map((item) => {
      const product = item.cart_belong_info || {};
      const categoryName = product.category_id_belong_info?.name || "unknown";
      const productFolder = `${categoryName}${item.product_id}`;
      const firstImage = product.product_id_hasmany_img?.length
        ? `/product/${categoryName}/${productFolder}/${product.product_id_hasmany_img[0].img_url}`
        : null;

      return {
        product_id: item.product_id,
        quantity: item.quantity,
        color_id: item.color_id || null,
        color_name: item.product_color_belong_color?.color_name || "無",
        product: {
          name: product.name || "未知商品",
          price: product.price || 0,
          image: firstImage,
        },
      };
    });

    res.json(cart_items); // 返回格式化數據
  } catch (error) {
    console.error("獲取購物車失敗:", error);
    res.status(500).json({ error: "伺服器錯誤，無法獲取購物車" });
  }
};

// 更新購物車內的數量
exports.update_item = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { product_id, color_id, quantity } = req.body;

    // 驗證請求參數
    if (!product_id || !quantity || quantity < 1) {
      return res.status(400).json({ error: "商品ID或數量出現異常" });
    }
    const cart_item = await db.cart.findOne({
      where: { user_id, product_id, color_id: color_id || null },
    });

    if (!cart_item) {
      return res.status(404).json({ error: "購物車項目不存在" });
      // 找不到這項目 或許可以轉成 insert_item 來新增項目?
    }

    // 更新數量 最大值為 10
    const update_quantity = Math.min(quantity, 10);
    await cart_item.update({
      quantity: update_quantity,
    });

    return res.status(200).json({
      message: "數量已更新",
    });
  } catch (error) {
    console.error("更新數量時出現錯誤", error);
    res.status(500).json({ error: "更新數量時出現錯誤" });
  }
};

// 刪除單一商品
exports.remove_item = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { product_id, color_id } = req.body;

    const remove_item = await db.cart.destroy({
      where: {
        user_id,
        product_id,
        color_id: color_id || null,
      },
    });

    if (remove_item === 0) {
      return res.status(404).json({ error: "刪除的項目不存在" });
    }

    return res.status(200).json({ message: "商品已刪除" });
  } catch (error) {
    console.error("刪除商品時出錯", error);
    res.status(500).json({ error: "刪除購物車項目時發生錯誤" });
  }
};

// 刪除多個商品
exports.remove_items = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const items = req.body;

    const remove_conditions = items.map((item) => ({
      user_id,
      product_id: item.product_id,
      color_id: item.color_id || null,
    }));

    const result = await db.cart.destroy({
      where: {
        [db.Sequelize.Op.or]: remove_conditions, // 使用 Sequelize 的 OR 操作符
      },
    });

    // 如果沒有刪除任何項目
    if (result === 0) {
      return res.status(404).json({ error: "未找到符合條件的商品" });
    }

    // 刪除成功
    return res.status(200).json({
      message: "批量刪除成功",
    });
  } catch (error) {
    console.error("批量刪除時發生錯誤", error);
  }
};

// 只獲取商品id 名稱 價格 圖片路徑
exports.get_localstorage_base_info = async (req, res) => {
  try {
    const items = req.body; // 從請求中獲取商品和顏色的詳細數據
    if (!items || !items.length) {
      return res.status(400).json({ error: "商品列表不能為空" });
    }

    // 提取商品 ID，避免重複查詢
    const productIds = items.map((item) => item.product_id);

    const products = await db.products_info.findAll({
      where: { product_id: productIds },
      attributes: ["product_id", "name", "price"], // 只獲取需要的字段
      include: [
        {
          model: db.product_images,
          attributes: ["img_url"],
          as: "product_id_hasmany_img",
        },
        {
          model: db.categories,
          attributes: ["name"],
          as: "category_id_belong_info",
        },
        {
          model: db.product_colors,
          attributes: ["color_id"],
          include: [
            {
              model: db.colors,
              attributes: ["color_name"],
              as: "product_color_belong_color",
            },
          ],
          as: "product_id_hasmany_color",
        },
      ],
    });

    if (!products.length) {
      return res.status(404).json({ error: "未找到任何商品信息" });
    }

    // 格式化商品信息
    const formattedProducts = items
      .map((item) => {
        const product = products.find((p) => p.product_id === item.product_id);
        if (!product) return null; // 若商品不存在，返回 null

        const categoryName = product.category_id_belong_info?.name || "unknown";
        const productFolder = `${categoryName}${product.product_id}`;
        const firstImage = product.product_id_hasmany_img.length
          ? `/product/${categoryName}/${productFolder}/${product.product_id_hasmany_img[0].img_url}`
          : null;

        // 找到對應的顏色名稱
        const colorName = item.color_id
          ? product.product_id_hasmany_color?.find(
              (product_color_belong_color) =>
                product_color_belong_color.color_id === item.color_id
            )?.product_color_belong_color?.color_name || "未知顏色"
          : null;

        return {
          product_id: product.product_id,
          name: product.name,
          price: product.price,
          image: firstImage, // 只返回第一張圖片
          color_name: colorName, // 返回對應的顏色名稱
          color_id: item.color_id,
        };
      })
      .filter(Boolean); // 過濾掉不存在的商品

    res.json(formattedProducts);
  } catch (error) {
    console.error("批量獲取商品信息時出錯:", error);
    res.status(500).json({ error: "批量獲取商品信息時發生錯誤" });
  }
};
