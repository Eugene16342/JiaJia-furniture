const db = require("../models"); // 引入資料庫模型

// 獲取分類資料
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await db.categories.findAll({
      attributes: ["category_id", "name_zh"], // 選擇需要的字段
    });
    res.json(categories); // 返回資料
  } catch (error) {
    console.error("無法獲取分類資料:", error);
    res.status(500).json({ error: "無法獲取分類資料" });
  }
};
