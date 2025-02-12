const db = require("../models");
const { Op } = require("sequelize");

// 查詢商品功能
exports.get_all_products = async (req, res) => {
  try {
    // 取得查詢參數
    const page = parseInt(req.query.page) || 1;
    const category_id = req.query.category_id || null;
    const keyword = req.query.keyword || null;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;

    // 設置篩選條件
    const condition = {
      status: "normal", // 僅顯示狀態為 normal 的商品
    };

    if (category_id) {
      condition.category_id = category_id; // 如果有 category_id 添加分類條件
    }

    if (keyword) {
      condition.name = { [Op.like]: `%${keyword}%` }; // 模糊匹配商品名稱
    }

    // 查詢商品資料
    const { count, rows: products } = await db.products_info.findAndCountAll({
      where: condition,
      include: [
        {
          model: db.product_images,
          attributes: ["img_url"],
          as: "product_id_hasmany_img",
          limit: 2,
          order: [["img_id", "ASC"]],
        },
        {
          model: db.categories,
          attributes: ["name"],
          as: "category_id_belong_info",
        },
      ],
      limit,
      offset,
    });

    // 格式化商品數據
    const formattedProducts = products.map((product) => {
      const category_name = product.category_id_belong_info?.name || "unknown";
      const product_folder = `${category_name}${product.product_id}`;
      const images = product.product_id_hasmany_img.map(
        (img) => `product/${category_name}/${product_folder}/${img.img_url}`
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

    // 返回結果
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

// 個別商品頁
exports.get_product_by_id = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await db.products_info.findOne({
      where: { product_id: productId },
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
          attributes: ["product_color_id", "color_id"], // 至少包含關鍵字段
          include: [
            {
              model: db.colors,
              attributes: ["color_name", "hex_code"],
              as: "product_color_belong_color",
            },
          ],
          as: "product_id_hasmany_color",
        },
      ],
    });

    if (!product) {
      console.error("商品不存在");
      return res.status(404).json({ error: "商品不存在" });
    }

    // 處理圖片路徑
    const category_name = product.category_id_belong_info?.name || "unknown";
    const product_folder = `${category_name}${product.product_id}`;
    const images = product.product_id_hasmany_img.map(
      (img) => `/product/${category_name}/${product_folder}/${img.img_url}`
    );

    // 處理顏色數據
    const colors = product.product_id_hasmany_color?.length
      ? product.product_id_hasmany_color.map((productColor) => ({
          color_id: productColor.color_id, // 傳回顏色 id
          name: productColor.product_color_belong_color?.color_name || "未知",
          hex: productColor.product_color_belong_color?.hex_code || "#000000",
        }))
      : [];

    // 返回商品詳細資料
    res.json({
      product_id: product.product_id,
      name: product.name,
      description: product.description,
      materials: product.materials,
      dimensions: {
        length: parseFloat(product.length).toFixed(1),
        width: parseFloat(product.width).toFixed(1),
        height: parseFloat(product.height).toFixed(1),
      },
      price: product.price,
      discount_price: product.discount_price || null,
      category_id: product.category_id,
      status: product.status,
      images,
      colors, // 包含顏色的數據
    });
  } catch (error) {
    console.error("無法獲取商品詳細資料:", error);
    res.status(500).json({ error: "無法獲取商品詳細資料" });
  }
};
