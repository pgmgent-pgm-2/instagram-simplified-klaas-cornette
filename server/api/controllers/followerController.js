/*
Import custom packages
*/
const dataService = require('../../services/dataService');
const { handleHTTPError } = require('../../utils');

// Todo: Write your controllers end-points
const getFollowers = (req, res, next) => {
    try {
        const { authorization: userId } = req.headers;
        const followers = dataService.getFollowers(userId);
        res.status(200).json(followers);
    } catch (error) {
        handleHTTPError(error, next);
    }
};

const followNewPerson = (req, res, next) => {
    try {
        const newFollower = req.body;
        const addNewFollower = dataService.followNewPerson(newFollower);
        res.status(201).json(addNewFollower);
    } catch (error) {
        handleHTTPError(error, next);
    }
};

const deleteFollower = (req, res, next) => {
    try {
        const { userId } = req.params;
        const deletedFollower = dataService.deleteFollower(userId);
        res.status(200).json(deletedFollower);
    } catch (error) {
        handleHTTPError(error, next);
    }
};
// Todo: Export the end-points
module.exports = {
    getFollowers,
    followNewPerson,
    deleteFollower,
};
