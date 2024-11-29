var DataTypes = require("sequelize").DataTypes;
var _cart = require("./cart");
var _categories = require("./categories");
var _order_items = require("./order_items");
var _orders = require("./orders");
var _product_images = require("./product_images");
var _products_info = require("./products_info");
var _reviews = require("./reviews");
var _stocks = require("./stocks");
var _user_login_log = require("./user_login_log");
var _users = require("./users");

function initModels(sequelize) {
  var cart = _cart(sequelize, DataTypes);
  var categories = _categories(sequelize, DataTypes);
  var order_items = _order_items(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var product_images = _product_images(sequelize, DataTypes);
  var products_info = _products_info(sequelize, DataTypes);
  var reviews = _reviews(sequelize, DataTypes);
  var stocks = _stocks(sequelize, DataTypes);
  var user_login_log = _user_login_log(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  products_info.belongsTo(categories, { as: "category", foreignKey: "category_id"});
  categories.hasMany(products_info, { as: "products_infos", foreignKey: "category_id"});
  order_items.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(order_items, { as: "order_items", foreignKey: "order_id"});
  cart.belongsTo(products_info, { as: "product", foreignKey: "product_id"});
  products_info.hasMany(cart, { as: "carts", foreignKey: "product_id"});
  order_items.belongsTo(products_info, { as: "product", foreignKey: "product_id"});
  products_info.hasMany(order_items, { as: "order_items", foreignKey: "product_id"});
  product_images.belongsTo(products_info, { as: "product", foreignKey: "product_id"});
  products_info.hasMany(product_images, { as: "product_images", foreignKey: "product_id"});
  reviews.belongsTo(products_info, { as: "product", foreignKey: "product_id"});
  products_info.hasMany(reviews, { as: "reviews", foreignKey: "product_id"});
  stocks.belongsTo(products_info, { as: "product", foreignKey: "product_id"});
  products_info.hasOne(stocks, { as: "stock", foreignKey: "product_id"});
  cart.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(cart, { as: "carts", foreignKey: "user_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});
  reviews.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(reviews, { as: "reviews", foreignKey: "user_id"});
  user_login_log.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_login_log, { as: "user_login_logs", foreignKey: "user_id"});

  return {
    cart,
    categories,
    order_items,
    orders,
    product_images,
    products_info,
    reviews,
    stocks,
    user_login_log,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
