const db = require("../models");
const { Op } = require("sequelize");

exports.getAllProducts = async (req, res) => {
  try {
    // 取得查詢參數
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;
    const categoryId = req.query.categoryId || null; // 分類篩選參數
    const keyword = req.query.keyword || null; // 關鍵字參數

    // 設置篩選條件
    const whereCondition = {
      status: "normal", // 僅顯示狀態為 normal 的商品
    };

    if (categoryId) {
      whereCondition.category_id = categoryId; // 如果有 categoryId，添加分類條件
    }

    if (keyword) {
      whereCondition.name = { [Op.like]: `%${keyword}%` }; // 模糊匹配商品名稱
    }

    // 查詢商品資料
    const { count, rows: products } = await db.products_info.findAndCountAll({
      where: whereCondition,
      include: [
        {
          model: db.product_images,
          attributes: ["img_url"],
          as: "product_id_hasmany_img",
          separate: true,
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
      const categoryName = product.category_id_belong_info?.name || "unknown";
      const productFolder = `${categoryName}${product.product_id}`;
      const images = product.product_id_hasmany_img.map(
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
    const categoryName = product.category_id_belong_info?.name || "unknown";
    const productFolder = `${categoryName}${product.product_id}`;
    const images = product.product_id_hasmany_img.map(
      (img) => `/product/${categoryName}/${productFolder}/${img.img_url}`
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
      categoryId: product.category_id,
      status: product.status,
      images,
      colors, // 包含顏色的數據
    });
  } catch (error) {
    console.error("無法獲取商品詳細資料:", error);
    res.status(500).json({ error: "無法獲取商品詳細資料" });
  }
};

exports.getRecommedProduct = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // 查詢同類別的商品，包含分類名稱
    const products = await db.products_info.findAll({
      where: { category_id: categoryId },
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
      ],
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ error: "該分類下沒有商品" });
    }

    // 隨機選擇 4 個商品
    const shuffled = products.sort(() => 0.5 - Math.random());
    const selectedProducts = shuffled.slice(0, 4);

    // 格式化返回數據
    const recommendedProducts = selectedProducts.map((product) => {
      const categoryName = product.category_id_belong_info?.name || "unknown";
      const productFolder = `${categoryName}${product.product_id}`;
      const images = product.product_id_hasmany_img.map(
        (img) => `/product/${categoryName}/${productFolder}/${img.img_url}`
      );

      return {
        id: product.product_id,
        name: product.name,
        price: product.price,
        link: `/product/${product.product_id}/${encodeURIComponent(
          product.name
        )}`, // 商品連結
        images, // 圖片陣列
      };
    });

    // 返回推薦商品
    res.json({
      success: true,
      products: recommendedProducts,
    });
  } catch (error) {
    console.error("無法獲取推薦商品:", error);
    res.status(500).json({ error: "無法獲取推薦商品" });
  }
};
