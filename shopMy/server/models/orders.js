const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    order_id: {
      type: DataTypes.CHAR(6),
      allowNull: false,
      primaryKey: true,
      comment: "亂數生成單號"
    },
    user_id: {
      type: DataTypes.CHAR(10),
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    total_price: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: false
    },
    addresses: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending','shipped','delivered'),
      allowNull: false,
      defaultValue: "pending"
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "fk_orders_user",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
