//const
const API_URL = 'http://localhost:8080/api';
const USERS_URL = `${API_URL}/users`;
const POSTS_URL = `${API_URL}/posts`;
const FOLLOWERS_URL = `${API_URL}/followers`;
const TIMELINE_URL = `${API_URL}/timeline`;
const LIKES_URL = `${API_URL}/posts/:postId/likes`;

//var
let currentUserId = null;

//functions
const fetchUsers = async () => {
    const response = await fetch(USERS_URL, {method: 'get'});
    const data = await response.json();
    console.log('users');
    console.log(data);
    //random user
    let currentUser = data[Math.floor(Math.random() * data.length)];
    currentUserId = currentUser.id;
    //random user posts
    
    fetchPosts(currentUserId);
    fetchFollowers(currentUserId);
    fetchTimeline(currentUserId);
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
    console.log(`followers van ${userId}`);
    console.log(data);
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
    console.log(`posts van ${userId}`);
    console.log(data);
    
}

const fetchTimeline= async (userId) => {
    const response = await fetch(TIMELINE_URL, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': userId
        }
    });
    const data = await response.json();
    console.log(`timeline-posts van ${userId}`);
    console.log(data);
}

//const fetchLikes = async (userId) => {
  //  const response = await fetch(LIKES_URL, {
  //      method: 'get',
  //      mode: 'cors',
  //      headers: {
//            'Content-Type': 'application/json',
     //       'Authorization': userId
    //    }
    //});
//    const data = await response.json();
//    console.log(data);
//}



const init = () => {
    fetchUsers();
};

init();