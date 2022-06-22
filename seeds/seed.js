const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./user-data.json');
const postData = require('./post-data.json');
const commentData = require('./comment-data.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(postData, {
    returning: true,
  });

  await Comment.bulkCreate(commentData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();