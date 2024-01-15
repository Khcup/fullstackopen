const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

class ReadingList extends Model {}

ReadingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Assuming you have a 'users' table
        key: 'id',
      },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'blogs', // Assuming you have a 'blogs' table
        key: 'id',
      },
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'reading_list',
    timestamps: false, // Ensure timestamps created_at and updated_at are not set
  }
);

module.exports = ReadingList;
