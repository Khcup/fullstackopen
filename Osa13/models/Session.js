const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db'); // Import your Sequelize instance

class Session extends Model {}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING, // You can use a string to store the session token
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER, // Reference to the user who owns the session
      allowNull: false,
      references: {
        model: 'users', // Make sure to match the actual table name for users
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'session',
    timestamps: true, // If you want to include timestamps like createdAt and updatedAt
  }
);


module.exports = Session;
