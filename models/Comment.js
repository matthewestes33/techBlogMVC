const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// creates Comment model 
class Comment extends Model { }

//defines Comment table columns and organization
//"WHEN I enter a comment and click on the submit button while signed in, THEN the comment is saved ...
//and the post is updated to display the comment, the comment creator’s username, and the date created"

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
        comment_text: {
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
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;