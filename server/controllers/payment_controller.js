const { where } = require("sequelize");
const db = require("../models");
const { customAlphabet } = require("nanoid");

// 使用大寫字母 隨機生成6碼作為單號
const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);

// 運費
let delivery_fee = 1000;
// 免運門檻
const delivery_is_free = 100000;

// 計算小計 運費 總價
const total_price_calculator = async (items) => {
  let sub_total = 0;
  let total_quantity = 0;
  // 用於完成訂單
  const item_details = [];

  for (const item of items) {
    const { product_id, quantity, color_id } = item;

    // 從資料庫獲取商品價格
    const product = await db.products_info.findOne({
      where: { product_id },
      attributes: ["price"],
    });

    const price = product.price;

    // 累加小計與數量
    sub_total += price * quantity;
    total_quantity += quantity;

    // 保存商品明细
    item_details.push({
      product_id,
      color_id,
      quantity,
      price,
    });
  }

  // 計算運費
  delivery_fee = sub_total > delivery_is_free ? 0 : delivery_fee;

  // 計算總價
  const total_price = sub_total + delivery_fee;

  return {
    total_quantity,
    sub_total,
    delivery_fee,
    total_price,
    item_details,
  };
};

// 將計算結果返回
exports.computed_total_price = async (req, res) => {
  try {
    const items = req.body;
    const result = await total_price_calculator(items);
    return res.status(200).json(result);
  } catch (error) {
    console.error("計算總價時出錯:", error);
    return res.status(500).json({ error: "計算總價時出錯" });
  }
};

// 完成訂單
exports.order_confirm = async (req, res) => {
  const create_order = await db.sequelize.transaction();
  const { user_id } = req.user;
  try {
    const { user_info, items, payway } = req.body;

    if (!user_info || !items || !payway) {
      return res.status(400).json({ error: "訂單資訊不完整" });
    }

    // 計算總價
    const { total_price, item_details } = await total_price_calculator(items);

    // 更新存貨和銷量
    for (const item of item_details) {
      const { product_id, quantity } = item;

      // 獲取當前商品的存貨
      const stock = await db.stocks.findOne({
        where: { product_id },
        transaction: create_order,
        lock: true,
      });

      // 更新存貨和銷量
      await db.stocks.update(
        {
          stock: stock.stock - quantity,
          sales: stock.sales + quantity,
        },
        {
          where: { product_id },
          transaction: create_order,
        }
      );
    }

    // 隨機生成單號
    const order_id = nanoid();

    console.log("訂單內 user_info:", user_info);
    console.log("插入前的 user_name:", user_info.user_name);

    // 保存訂單資訊到 orders 表
    await db.orders.create(
      {
        order_id,
        user_id,
        user_name: user_info.user_name,
        name: user_info.name,
        phone: user_info.phone,
        email: user_info.email,
        address: user_info.address,
        payment: payway,
        total_price,
        status: "pending",
      },
      { transaction: create_order }
    );

    // 確認訂單明細
    const order_items = item_details.map((item) => ({
      order_id,
      product_id: item.product_id,
      color_id: item.color_id,
      quantity: item.quantity,
      price: item.price,
    }));

    await db.order_items.bulkCreate(order_items, { transaction: create_order });

    // 清除購物車中被購買的商品
    await db.cart.destroy({
      where: {
        user_id,
        [db.Sequelize.Op.or]: item_details.map((item) => ({
          product_id: item.product_id,
          color_id: item.color_id,
        })),
      },
      transaction: create_order,
    });

    await create_order.commit();
    return res.status(200).json({ message: "訂單成功建立", order_id });
  } catch (error) {
    await create_order.rollback();
    console.error("訂單生成失敗", error);
  }
};
