//links to other Models
const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

//associations (User can have many Posts and Comments, each Post and Comment belong to a User) 
//associations (Post can have many Comments, each Comment belongs to a Post)

User.hasMany(Post, {
    foreignKey: 'user_id',
    //update the matching records from the child table when the rows in the parent table are updated
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

module.exports = { Comment, Post, User };