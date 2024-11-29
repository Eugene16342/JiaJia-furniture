"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    ...config,
    define: {
      timestamps: true, // 啟用時間戳記
      createdAt: "created_at", // 全局設置 createdAt 對應到 created_at
      updatedAt: "updated_at", // 全局設置 updatedAt 對應到 updated_at
    },
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    define: {
      timestamps: true, // 啟用時間戳記
      createdAt: "created_at", // 全局設置 createdAt 對應到 created_at
      updatedAt: "updated_at", // 全局設置 updatedAt 對應到 updated_at
    },
  });
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// 添加模型之間的關聯
db.products_info.hasMany(db.product_images, {
  foreignKey: "product_id",
  as: "product_images", // 別名，與 API include 的別名一致
});

db.product_images.belongsTo(db.products_info, {
  foreignKey: "product_id",
});

db.products_info.belongsTo(db.categories, {
  foreignKey: "category_id",
  as: "category", // 設置關聯別名
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
