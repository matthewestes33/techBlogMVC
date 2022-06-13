const sequelize = require('../config/connection');
const { Comment, Post, User } = require('../models');

const commentData = require('./comment-data.json');
const postData = require('./post-data.json');
const userData = require('./user-data.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Comment.bulkCreate(commentData, {
    returning: true,
  });
  
  await Post.bulkCreate(postData, {
    returning: true,
  });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();