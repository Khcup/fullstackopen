const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 5000));


    await queryInterface.createTable('blogs', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
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
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: new Date(),
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: new Date(),
        },
      });
      
    /*await queryInterface.addColumn('blogs', 'year', {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1991,
          max: new Date().getFullYear(),
        },
      });  */
      
      await queryInterface.createTable('reading_lists', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        blogId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'blogs',
            key: 'id',
          },
        },
        isRead: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
    });
    
    // Migration 2
await queryInterface.createTable('sessions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
  },

  down: async ({ context: queryInterface }) => {
    console.log("removing unnecessary stuff");
    await queryInterface.dropTable('sessions');
    await queryInterface.dropTable('reading_lists');
    await queryInterface.dropTable('blogs');
    await queryInterface.dropTable('users');
  },
};
