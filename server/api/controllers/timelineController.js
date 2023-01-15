/*
Import custom packages
*/
const dataService = require('../../services/dataService');
const { handleHTTPError } = require('../../utils');
const { getFollowers } = require('./followerController');

// Todo: Write your controllers end-points
const getTimeline = (req, res, next) => {
    try {
        const { authorization: userId } = req.headers;
        const getTimeline = dataService.getTimeline(userId);
        res.status(200).json(getTimeline);
    } catch (error) {
        handleHTTPError(error, next);
    }
};
// Todo: Export the end-points
module.exports = {
    getTimeline,
};
