/*
Import custom packages
*/
const dataService = require('../../services/dataService');
const { handleHTTPError } = require('../../utils');

// Todo: Write your controllers end-points
const getUsers = (req, res, next) => {
    try {
        const users = dataService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        handleHTTPError(error, next);
    }
};

const getUser = (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = dataService.getUser(userId);
        res.status(200).json(user);
    } catch (error) {
        handleHTTPError(error, next);
    }
    
};
// Todo: Export the end-points
module.exports = {
    getUsers,
    getUser,
};
