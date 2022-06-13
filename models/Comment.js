const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// creates Comment model 
class Comment extends Model { }

//defines Comment table columns and organization
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            }
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
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;