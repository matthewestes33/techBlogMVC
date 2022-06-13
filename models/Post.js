const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// creates Post model 
class Post extends Model { }

// defines Post table columns and organization
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_created: {
            // automatically adds fields createdAt and updatedAt to every model
            type: DataTypes.DATE,
            allowNull: false,
            // the current date/time will be used to populate this column (at the moment of insertion)
            defaultValue: DataTypes.NOW,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);

module.exports = Post;