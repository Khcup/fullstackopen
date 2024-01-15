require('dotenv').config();
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');



class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING, // Change the data type to STRING to match User.name
      allowNull: false,
      references: {
        model: 'users',
        key: 'name', // Change the key to 'name' to reference User.name
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
  }
);




module.exports = Blog;
