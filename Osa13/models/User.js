const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true, // Add email validation
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'user',
    timestamps: false, // Ensure timestamps created_at and updated_at are set
  }
);



module.exports = User;