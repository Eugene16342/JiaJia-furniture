const db = require("../models");

exports.getAllProducts = async (req, res) => {
  try {
    // 取得分頁參數，若未提供則使用默認值
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;

    // 查詢商品資料
    const { count, rows: products } = await db.products_info.findAndCountAll({
      where: { status: "normal" },
      include: [
        {
          model: db.product_images,
          attributes: ["img_url"],
          as: "product_images",
          separate: true,
          limit: 2,
          order: [["img_id", "ASC"]],
        },
        {
          model: db.categories,
          attributes: ["name"],
          as: "category",
        },
      ],
      limit,
      offset,
    });

    const formattedProducts = products.map((product) => {
      const categoryName = product.category?.name || "unknown";
      const productFolder = `${categoryName}${product.product_id}`;
      const images = product.product_images.map(
        (img) => `product/${categoryName}/${productFolder}/${img.img_url}`
      );

      return {
        id: product.product_id,
        name: product.name,
        price: product.price,
        discount_price: product.discount_price || null,
        default_img: images[0] || null,
        hover_img: images[1] || null,
      };
    });

    res.json({
      products: formattedProducts,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("無法獲取商品資料:", error);
    res.status(500).json({ error: "無法獲取商品資料" });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.query.categoryId); // 獲取分類 ID
    const page = parseInt(req.query.page) || 1; // 獲取頁碼
    const limit = parseInt(req.query.limit) || 12; // 每頁顯示數量
    const offset = (page - 1) * limit; // 計算偏移量

    // 設定篩選條件
    const whereCondition = categoryId
      ? { category_id: categoryId, status: "normal" } // 根據分類篩選
      : { status: "normal" }; // 如果沒有分類 ID，返回所有正常商品

    // 查詢商品資料
    const { count, rows: products } = await db.products_info.findAndCountAll({
      where: whereCondition,
      include: [
        {
          model: db.product_images,
          attributes: ["img_url"],
          as: "product_images",
          separate: true,
          limit: 2,
          order: [["img_id", "ASC"]],
        },
        {
          model: db.categories,
          attributes: ["name"],
          as: "category",
        },
      ],
      limit,
      offset,
    });

    // 格式化商品資料
    const formattedProducts = products.map((product) => {
      const categoryName = product.category?.name || "unknown";
      const productFolder = `${categoryName}${product.product_id}`;
      const images = product.product_images.map(
        (img) => `product/${categoryName}/${productFolder}/${img.img_url}`
      );

      return {
        id: product.product_id,
        name: product.name,
        price: product.price,
        discount_price: product.discount_price || null,
        default_img: images[0] || null,
        hover_img: images[1] || null,
      };
    });

    // 返回 JSON 響應
    res.json({
      products: formattedProducts,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("無法根據分類獲取商品資料:", error);
    res.status(500).json({ error: "無法獲取商品資料" });
  }
};
