//var
let currnetPostId = '';
let dataUser = '';
let activeUser = '';
let activeFollowers = [];
let activeFollowersToAdd = [];
let likeArray = [];
//cash 
const $home = document.getElementById('home');
const $homeRemovefollowers = document.getElementById('home-remove-followers');
const $homeAddfollowers = document.getElementById('home-add-followers');
const $homePost = document.getElementById('home-active-user-post');
//get functies 

const getHomePage = () => {
    fetchUsersIdHome(); 
}

//fetch
const fetchpage = () => {
    fetchTimeline(activeUser);
    fetchFollowersHome(activeUser);
    fetchActiveUserPost(activeUser);
    fetchToAddFollowers(activeUser);
}

const fetchUsersIdHome = async () => {
    const response = await fetch(USERS_URL, {method: 'get'});
    const data = await response.json();
    let currentUser = await data[Math.floor(Math.random() * data.length)];
    currentUserId = await currentUser.id;
    getDataUsers(data);
    getCurrentId(currentUserId);
    fetchpage();
    
}

const fetchActiveUserPost = async (userId) => {
    const response = await fetch(POSTS_URL, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': userId
        }
    });
    const data = await response.json();
    updateInterfaceHomePosts(data);
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
    updateInterfaceHome(data);
}

const fetchFollowersHome = async (userId) => {
    const response = await fetch(FOLLOWING_URL, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': userId
        }
    });
    const data = await response.json();
    let updatedData = dataSpliter(data);
    updateInterfaceHomeRemoveFollowers(updatedData)
}

const fetchToAddFollowers = async (userId) => {
    const response = await fetch(FOLLOWERSTOADD_URL, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': userId
        }
    });
    const data = await response.json();
    let updatedData = dataSpliter(data);
    updateInterfaceHomeAddFollowers(updatedData)
}

//inladen
const updateInterfaceHome =  (data) => {
     $home.innerHTML = getHTMLHome(data);
}

const updateInterfaceHomePosts =  (data) => {
    $homePost.innerHTML = getHTMLHomePost(data);
}

const updateInterfaceHomeRemoveFollowers =  (data) => {
    let userFollowers = [];
    let userFollowersTemp;
    let followers = [];
    let followersTemp;
    console.log(data)
    data.forEach(e => {
      userFollowersTemp = dataUser.filter(f => f.id === e.friendId);
      userFollowers.push(...userFollowersTemp);
    });
    userFollowers.forEach(e => {
        followersTemp = data.filter(f => f.friendId === e.id);
        followers.push(...followersTemp);
    });
    $homeRemovefollowers.innerHTML = getHTMLremoveFollowers(userFollowers, followers);
}

const updateInterfaceHomeAddFollowers = (data) => {
    let userFollowers = [];
    let userFollowersTemp;
    let followers = [];
    let followersTemp;
    data.forEach(e => {
      userFollowersTemp = dataUser.filter(f => f.id === e.userId);
      userFollowers.push(...userFollowersTemp);
    });
    userFollowers.forEach(e => {
        followersTemp = data.filter(f => f.userId === e.id);
        followers.push(...followersTemp);
    });
    $homeAddfollowers.innerHTML = getHTMLAddFollowers(userFollowers, followers);
}

//hulp code
const getDataUsers = (data) => {
    dataUser = data;
}

const getCurrentId = (data) => {
    activeUser = data;
    console.log('activeUser')
    console.log(activeUser)
}

const dataSpliter = (data) => {
    let index = 5;
    if(index > data.length){
        index = data.length;
    }
    data = data.slice(0, index);
    return data;
}
 
const getRandomComment = (data) => {
    let randomNummer = Math.floor(Math.random() * data.length);
    return randomNummer;
}

const checkComment = (data) => {
    if(data == null){
        return "empty comment";
    }else{
        return data;
    }
}

const epochTimeConverter = (data) => {
    if(data.updatedAt == null){
        let time = new Date(data.createdAt);
        let date = time.toISOString().split('T')[0];
        return date;
    }else{
        let time = new Date(data.updatedAt);
        let date = time.toISOString().split('T')[0];
        let uur = time.toISOString().split('T')[1].slice(0,8);
        return uur + ' ' + date;
    }
}

//html crieeren 
const getHTMLHome = (data) => {
    data.forEach(e => {
        likeArray.push(e.id); 
    });
    return data.map((data) => {
        return `
                <img src="${data.picture.small}" alt="">
                <a>${data.likes.length} likes</a>
                <button id="like:${data.id}">like</button>
                <button id="dislike:${data.id}">dislike</button>
                <p>${checkComment(data.comments[getRandomComment(data.comments)].body)}</p>
                <button  id="click:${data.id}">view all ${data.comments.length-1} other comments</button> 
                <div id="comment:${data.id}">
                    ${data.comments.map((comments) => {
                        return `<p>${comments.body}</p>`
                    }).join('')
                }
                </div>
                <p>${epochTimeConverter(data)}</p>
                <input type="text" id="${data.id}" name="comment" placeholder="add comment">
                

                `
      }).join('')
}

const getHTMLAddFollowers = (userData, data) => {
    let htmlString;
    data.forEach(e => {
        console.log(e.id)
       activeFollowersToAdd.push(e.id); 
    });
    for(let i = 0; i < activeFollowersToAdd.length; i++){
        htmlString = (`<img src="${userData[i].avatar}" alt="">
                        <p>${userData[i].username}</p>
                        <button id="${data[i].id}">follow</button>`+ htmlString);
    }
    htmlString = htmlString.slice(0, -9)
    return htmlString
}

const getHTMLremoveFollowers = (userData, data) => {
    let htmlString;
    data.forEach(e => {
       activeFollowers.push(e.id); 
    });
    for(let i = 0; i < activeFollowers.length; i++){
        htmlString =    (`<img src="${userData[i].avatar}" alt="">
                        <p>${userData[i].username}</p>
                        <button id="${data[i].id}">unfollow</button>` + htmlString);
    }
    htmlString = htmlString.slice(0, -9)
    console.log(activeFollowers)
    return htmlString
}

const getHTMLHomePost = (data) => {
    data = data.slice(0, 1);
    data.forEach(e => {
        currnetPostId = e.id; 
    });
    return data.map((data) => {
        return  `
                <button id="${data.id}">Delete</button>
                <img src="${data.picture.small}" alt="">
                <p>${data.likes.length} likes</p>
                <button id="like:${data.id}">like</button>
                <button id="dislike:${data.id}">like</button>
                <p>${checkComment(data.comments[getRandomComment(data.comments)].body)}</p> 
                <button id="click:${data.id}">view all ${data.comments.length-1} other comments</button>
                <div id="comment:${data.id}">
                    ${data.comments.map((comments) => {
                        return `<p>${comments.body}</p>`
                    }).join('')
                }
                </div>
                <p>${epochTimeConverter(data)}</p>
                <input type="text" id="${data.id}" name="comment" placeholder="add comment">
                  
                `
      }).join('')
}

getHomePage();
