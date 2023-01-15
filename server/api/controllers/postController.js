/*
Import custom packages
*/
const dataService = require('../../services/dataService');
const { handleHTTPError } = require('../../utils');

// Todo: Write your controllers end-points
const getAllPosts = (req, res, next) => {
    try {
        const allPosts = dataService.getAllPosts();
        res.status(200).json(allPosts);
    } catch (error) {
        handleHTTPError(error, next);
    }
};

const getPosts = (req, res, next) => {
    try {
        const { authorization: userId } = req.headers;
        const posts = dataService.getPosts(userId);
        res.status(200).json(posts);
    } catch (error) {
        handleHTTPError(error, next);
    }
};

const createPost = (req, res, next) => {
    try {
        const post = req.body;
        const createPost = dataService.createPost(post);
        res.status(201).json(createPost);
    } catch (error) {
        handleHTTPError(error, next);
    }
};

const deletePost = (req, res, next) => {
    try {
        let { postId } = req.params;
        let newChangedPosts = dataService.removePost(postId);
        res.status(200).json(newChangedPosts);
    } catch (error) {
        handleHTTPError(error, next);
    }
};

const changeDiscriptionPosts = (req, res, next) => {
    try {
        let { postId } = req.params;
        const discription = req.body;
        let newChangedPosts = dataService.changeDiscriptionPosts(postId, discription);
        res.status(200).json(newChangedPosts);
    } catch (error) {
        handleHTTPError(error, next);
    }
};

const getComents = (req, res, next) => {
    try {
        const { postId } = req.params;
        let postsComents = dataService.getComents(postId);
        res.status(200).json(postsComents);
    } catch (error) {
        handleHTTPError(error, next);
    }
};

const deleteComments = (req, res, next) => {
    try {
        const { postId } = req.params;
        const { commentId } = req.params;
        let postsComents = dataService.deleteComments(postId, commentId);
        res.status(200).json(postsComents);
    } catch (error) {
        handleHTTPError(error, next);
    }
};

const getSpecificComents = (req, res, next) => {
    try {
        const { postId } = req.params;
        const { commentId } = req.params;
        let postsComents = dataService.getSpecificComent(postId, commentId);
        res.status(200).json(postsComents);
    } catch (error) {
        handleHTTPError(error, next);
    }
};

const addComents = (req, res, next) => {
    try {
        const { postId } = req.params;
        const comment = req.body;
        const createdComment = dataService.addComents(comment, postId);
        res.status(201).json(createdComment);
    } catch (error) {
        handleHTTPError(error, next);
    }
};

const addLike = (req, res, next) => {
    try {
        const { postId } = req.params;
        const { authorization: userId } = req.headers;
        const createdLike = dataService.addLike(userId, postId);
        res.status(201).json(createdLike);
    } catch (error) {
        handleHTTPError(error, next);
    }
};

const deleteLike = (req, res, next) => {
    try {
        const { postId } = req.params;
        const { authorization: userId } = req.headers;
        const deletedLike = dataService.deleteLike(userId, postId);
        res.status(201).json(deletedLike);
    } catch (error) {
        handleHTTPError(error, next);
    }
};

// Todo: Export the end-points
module.exports = {
    getPosts,
    createPost,
    deletePost,
    getComents,
    getAllPosts,
    addComents,
    getSpecificComents,
    deleteComments,
    addLike,
    deleteLike,
    changeDiscriptionPosts,
};
