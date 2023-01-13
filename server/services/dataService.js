/*
Import packages
*/
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

/*
Import custom packages
*/
const { HTTPError, convertArrayToPagedObject } = require('../utils');

/*
File paths
*/
const filePathFollowers = path.join(__dirname, '..', 'data', 'followers.json');
const filePathPosts = path.join(__dirname, '..', 'data', 'posts.json');
const filePathUsers = path.join(__dirname, '..', 'data', 'users.json');

/*
Read and write data
*/
const readDataFromFollowersFile = () => {
  const data = fs.readFileSync(filePathFollowers, { encoding: 'utf8', flag: 'r' });
  const followers = JSON.parse(data);

  return followers;
};

const readDataFromPostsFile = () => {
  const data = fs.readFileSync(filePathPosts, { encoding: 'utf8', flag: 'r' });
  const posts = JSON.parse(data);

  return posts;
};

const readDataFromUsersFile = () => {
  const data = fs.readFileSync(filePathUsers, { encoding: 'utf8', flag: 'r' });
  const users = JSON.parse(data);

  return users;
};

// Todo: Write your CRUD operations

// Todo: Export the data services nethods / functions
module.exports = {
};
