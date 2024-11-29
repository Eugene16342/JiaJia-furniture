const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    user_id: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true,
      comment: "使用Nano ID生成使用者ID\n"
    },
    user_name: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "密碼使用哈希加密\n"
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: true,
      unique: "email_UNIQUE"
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00"
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "email_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
};
