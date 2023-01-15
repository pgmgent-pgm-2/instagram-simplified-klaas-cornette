/*
Import packages
*/
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { post } = require('../api/routes');

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
const getUsers = () => {
  try {
    const users = readDataFromUsersFile();
    return users;
  } catch (error){
    throw new HTTPError('can\'t get all the users', 500);
  }
};

const getUser = (userId) => {
  try {
    const users = readDataFromUsersFile();
    const user = users.find(u => u.id === userId);
    if(!user){
      throw new HTTPError(`can't get the user with is ${userId}!`, 500);
    }
    return user;
  } catch (error){
    throw error;
  }
};

const getAllPosts = () => {
  try {
    const allPosts = readDataFromPostsFile();
    return allPosts;
  } catch (error){
    throw new HTTPError('can\'t get all the users', 500);
  }
};

const getPosts = (userId) => {
  try {
    let posts = readDataFromPostsFile();
    posts = posts.filter(p => p.authorId === userId);
    return posts;
  } catch (error){
    throw new HTTPError('can\'t get all the posts', 500);
  }
};

const getPostsDetail = (userId) => {
  try {
    let posts = readDataFromPostsFile();
    posts = posts.filter(p => p.authorId === userId);
    return posts.detail;
  } catch (error){
    throw new HTTPError('can\'t get all the posts details', 500);
  }
};

const createPost = (post) => {
  try {
    let posts = readDataFromPostsFile();
    
    const postToCreate = {
      ...post,
      id: uuidv4(),
      createdAt: Date.now(),
    }
    posts.push(postToCreate);
    fs.writeFileSync(filePathPosts, JSON.stringify(posts, null, 2));
    return postToCreate;
  } catch (error){
    throw new HTTPError('can\'t create the post', 500);
  }
};

const removePost = (postId) => {
  try {
    let posts = readDataFromPostsFile();
    let newChangedPosts = posts.filter(p => p.id !== postId);
    fs.writeFileSync(filePathPosts, JSON.stringify(newChangedPosts, null, 2));
    return newChangedPosts;
  } catch (error){
    throw new HTTPError(`can't delete post white id ${postId}`, 500);
  }
};

const changeDiscriptionPosts = (postId, discription) => {
  try {
    let posts = readDataFromPostsFile();
    let indexPost = posts.findIndex(p => p.id === postId);
    
    const bodyTochange = {
      ...discription
    }
    delete posts[indexPost].body;
    posts[indexPost].push(bodyTochange);
    //fs.writeFileSync(filePathPosts, JSON.stringify(posts, null, 2));
    return posts[indexPost];
  } catch (error){
    throw new HTTPError('can\'t create the comment', 500);
  }
    
};

const getComents = (postId) => {
  try {
    let comments = [];
    let posts = readDataFromPostsFile();
    let commentPosts = posts.filter(p => p.id === postId);
    commentPosts.forEach(e => {
       comments = e.comments
    });
    return comments;
  } catch (error){
    throw new HTTPError('can\'t get all the commands', 500);
  }
};

const getSpecificComent = (postId, commentId) => {
  try {
    let specificComent;
    let comments = [];
    let posts = readDataFromPostsFile();
    let commentPosts = posts.filter(p => p.id === postId);
    commentPosts.forEach(e => {
      comments = e.comments
    });
    comments.forEach(e => {
      if(e.id == commentId){
        specificComent = e; 
      } 
    });
    return specificComent;
  } catch (error){
    throw new HTTPError('can\'t get all the specific command', 500);
  }
};

const deleteComments = (postId, commentId) => {
  try {
    let posts = readDataFromPostsFile();
    let indexOfPost = posts.findIndex(p => p.id === postId);
    let indexOfComment = posts[indexOfPost].comments.findIndex(c => c.id === commentId);
    delete posts[indexOfPost].comments[indexOfComment];
    fs.writeFileSync(filePathPosts, JSON.stringify(posts, null, 2));
    return posts[indexOfPost];
  } catch (error){
    throw new HTTPError('can\'t delete the comment', 500);
  }
};

const addComents = (comment, postId) => {
  try {
    let posts = readDataFromPostsFile();
    let index = posts.findIndex(p => p.id === postId);
    const commentToCreate = {
      ...comment,
      id: uuidv4(),
      createdAt: Date.now(),
    }
    posts[index].comments.push(commentToCreate);
    fs.writeFileSync(filePathPosts, JSON.stringify(posts, null, 2));
    return posts[index].comments;
  } catch (error){
    throw new HTTPError('can\'t create the comment', 500);
  }
};

const addLike = (like, postId) => {
  try {
    let posts = readDataFromPostsFile();
    let index = posts.findIndex(p => p.id === postId);
    const likeToCreate = {
      userId : like,
      createdAt: Date.now()
    }
    posts[index].likes.push(likeToCreate);
    fs.writeFileSync(filePathPosts, JSON.stringify(posts, null, 2));
    return posts[index];
  } catch (error){
    throw new HTTPError('can\'t add the like', 500);
  }
};

const deleteLike = (likeId, postId) => {
  try {
    let posts = readDataFromPostsFile();
    let indexOfPost = posts.findIndex(p => p.id === postId);
    let indexOfLike = posts[indexOfPost].likes.findIndex(l => l.userId === likeId);
    delete posts[indexOfPost].likes[indexOfLike];
    fs.writeFileSync(filePathPosts, JSON.stringify(posts, null, 2));
    return posts[indexOfPost];
  } catch (error){
    throw new HTTPError('can\'t delete the like', 500);
  }
};

const getFollowers = (userId) => {
  try {
    let followers = readDataFromFollowersFile();
    followers = followers.filter(f => f.userId === userId);
    return followers;
  } catch (error){
    throw new HTTPError('can\'t get all the followers', 500);
  }
};

const followNewPerson = (newFollower) => {
  try {
    let followers = readDataFromFollowersFile();
    const followerToCreate = {
      ...newFollower,
      id: uuidv4(),
      createdAt: Date.now(),
    }
    followers.push(followerToCreate);
    fs.writeFileSync(filePathFollowers, JSON.stringify(followers, null, 2));
    return followerToCreate;
  } catch (error){
    throw new HTTPError('can\'t add the follower', 500); 
  }
};

const deleteFollower = (userId) => {
  try {
    let followers = readDataFromFollowersFile();
    let deletedFollowers = followers.filter(f => f.id !== userId);
    fs.writeFileSync(filePathFollowers, JSON.stringify(deletedFollowers, null, 2));
    return deletedFollowers;
  } catch (error){
    throw new HTTPError('can\'t get all the followers', 500);
  }
};

const getTimeline = (userId) => {
  try {
    let posts = readDataFromPostsFile();
    let followers = readDataFromFollowersFile();
    followers = followers.filter(p => p.userId === userId);
    let timelinePosts = [];
    let filterPost;
    followers.forEach(e => {
      filterPost = posts.filter(pf => pf.authorId === e.friendId);
      timelinePosts.push(filterPost);
    });
    
    return timelinePosts;
  } catch (error){
    throw new HTTPError('can\'t get all the posts of all the followers', 500);
  }
};

// Todo: Export the data services nethods / functions
module.exports = {
  getUsers,
  getUser,
  getPosts,
  getFollowers,
  getTimeline,
  followNewPerson,
  createPost,
  deleteFollower,
  removePost,
  getComents,
  getAllPosts,
  addComents,
  getSpecificComent,
  deleteComments,
  addLike,
  deleteLike,
  changeDiscriptionPosts,
};
