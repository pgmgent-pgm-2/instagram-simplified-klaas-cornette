/*
Import custom packages
*/
const e = require('express');
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

const getfollowing = (req, res, next) => {
    try {
        const { authorization: userId } = req.headers;
        const following = dataService.getFollowing(userId);
        res.status(200).json(following);
    } catch (error) {
        handleHTTPError(error, next);
    }
};

const getPersonsToFollow = (req, res, next) => {
    try {
        let followersToFollow = [];
        let personsToFollowIndex = [];
        let personsToFollowTempIndex;
        const { authorization: userId } = req.headers;
        const followers = dataService.getFollowers(userId);//volgt mij 
        const following = dataService.getFollowing(userId);//volg ik
        following.forEach(e => { //alle mensen die ik volg
            personsToFollowTempIndex = followers.findIndex(data => data.userId === e.friendId) //alle mensen die mij volgen
            if(personsToFollowTempIndex != -1){
                personsToFollowIndex.push(personsToFollowTempIndex)    
            }
        });
        personsToFollowIndex.forEach(e => {
            delete followers[e];
        });
        followers.forEach(e => {
            if(e !== null){
                followersToFollow.push(e)
            }
        });
        
        res.status(200).json(followersToFollow);
    } catch (error) {
        handleHTTPError(error, next);
    }
};

const followNewPerson = (req, res, next) => {
    try {
        const { friendId } = req.params;
        const { authorization: userId } = req.headers;
        const addNewFollower = dataService.followNewPerson(friendId, userId);
        res.status(201).json(addNewFollower);
    } catch (error) {
        handleHTTPError(error, next);
    }
};

const deleteFollower = (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedFollower = dataService.deleteFollower(id);
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
    getfollowing,
    getPersonsToFollow
};
