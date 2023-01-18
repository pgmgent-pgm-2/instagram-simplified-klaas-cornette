/*
Import packages
*/
const express = require('express');

/*
Import custom packages
*/
const followerController = require('../controllers/followerController');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const timelineController = require('../controllers/timelineController');
/*
Make a router
*/
const router = express.Router();

/*
Routes
*/

// Todo: Write your end-points: url in combination with action methods from corresponding controllers

router.get('/timeline', timelineController.getTimeline);

router.get('/followers', followerController.getFollowers);
router.get('/following', followerController.getfollowing);
router.get('/notfollowing', followerController.getPersonsToFollow);
router.post('/followers/:friendId', followerController.followNewPerson);
router.delete('/followers/:id', followerController.deleteFollower)

router.get('/allPosts', postController.getAllPosts);
router.get('/posts', postController.getPosts);
router.post('/posts', postController.createPost);
router.delete('/posts/:postId', postController.deletePost);
router.patch('/posts/:postId', postController.changeDiscriptionPosts);
router.get('/posts/:postId/comments', postController.getComents);
router.post('/posts/:postId/comments', postController.addComents);
router.get('/posts/:postId/comments/:commentId', postController.getSpecificComents);
router.delete('/posts/:postId/comments/:commentId', postController.deleteComments);
router.post('/posts/:postId/likes', postController.addLike);
router.delete('/posts/:postId/likes', postController.deleteLike);

router.get('/users', userController.getUsers);
router.get('/users/:userId', userController.getUser);


module.exports = router;
