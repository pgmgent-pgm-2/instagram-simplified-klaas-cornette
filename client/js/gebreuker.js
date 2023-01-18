//const
const API_URL = 'http://localhost:8080/api';
const USERS_URL = `${API_URL}/users`;
const POSTS_URL = `${API_URL}/posts`;
const FOLLOWERS_URL = `${API_URL}/followers`;
const FOLLOWING_URL = `${API_URL}/following`;
const FOLLOWERSTOADD_URL = `${API_URL}/notfollowing`;
const TIMELINE_URL = `${API_URL}/timeline`;
const LIKES_URL = `${API_URL}/posts/:postId/likes`;

//var
let currentUserId = null;

//cash 
const $gebreukerPosts = document.getElementById('gebreuker-posts');
const $gebreukerInfo = document.getElementById('gebreuker-info');
const $gebreukerFollowers = document.getElementById('gebreuker-followers');
const $gebreukerFollowing = document.getElementById('gebreuker-following');
//get functies 

const getUserPage = () => {
    fetchUsersId();  
}

//fetch

const fetchUsersId = async () => {
    const response = await fetch(USERS_URL, {method: 'get'});
    const data = await response.json();
    let currentUser = await data[Math.floor(Math.random() * data.length)];
    currentUserId = await currentUser.id;
    fetchPosts(currentUserId);
    fetchFollowers(currentUserId);
    fetchFollowing(currentUserId);
    updateInterfaceGebreuker(currentUser);
}

const fetchPosts = async (userId) => {
    const response = await fetch(POSTS_URL, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': userId
        }
    });
    const data = await response.json();
    updateInterfacePosts(data);
    
}

const fetchFollowers = async (userId) => {
    const response = await fetch(FOLLOWERS_URL, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': userId
        }
    });
    const data = await response.json();
    updateInterfaceFollowers(data);
}

const fetchFollowing = async (userId) => {
    const response = await fetch(FOLLOWING_URL, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': userId
        }
    });
    const data = await response.json();
    updateInterfaceFollowing(data);
}

//inladen
const updateInterfaceGebreuker =  (data) => {
     $gebreukerInfo.innerHTML = getHTMLGebreukerInfo(data);
}

const updateInterfacePosts =  (data) => {
    $gebreukerPosts.innerHTML = getHTMLGebreukerPosts(data);
}

const updateInterfaceFollowers =  (data) => {
    $gebreukerFollowers.innerHTML = getHTMLFollowers(data);
}

const updateInterfaceFollowing =  (data) => {
    $gebreukerFollowing.innerHTML = getHTMLFollowing(data);
}

//html crieeren 
const getHTMLFollowing = (data) => {
            return  `
                    <p>folowing ${data.length}</p>
                    `
}

const getHTMLFollowers = (data) => {
            return  `
                    <p>folowers ${data.length}</p>
                    `
}

const getHTMLGebreukerPosts = (data) => {
            return `<p>posts ${data.length}</p>
                    
            ${data.map((data) => {
            return `
                    <img src="${data.picture.small}" alt="">
                    
                    `;
          }).join('')}`
};

const getHTMLGebreukerInfo = (data) => {
    return  `
            <img src="${data.avatar}" alt="">
            <p>${data.username}</p>
            <p>${data.firstName} ${data.lastName}</p>
            `;
      
}
getUserPage();
