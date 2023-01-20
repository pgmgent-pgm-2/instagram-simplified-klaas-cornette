//var
let deletePostId = '';
let follower1 = '';
let follower2 = '';
let follower3 = '';
let follower4 = '';
let follower5 = '';
let addFollower1 = '';
let addFollower2 = '';
let addFollower3 = '';
let addFollower4 = '';
let addFollower5 = '';
let like1 = '';
let like2 = '';
let like3 = '';
let like4 = '';
let disLike1 = '';
let disLike2 = '';
let disLike3 = '';
let disLike4 = '';
let showComent1 = '';
let showComent2 = '';
let showComent3 = '';
let showComent4 = '';
let displayComent1 = '';
let displayComent2 = '';
let displayComent3 = '';
let displayComent4 = '';
let showHome = '';
let showUser = ''; 
let showHomeButton = '';
let showUserButton = ''; 
//code
showHomeButton = document.getElementById('show-home-button');
showUserButton = document.getElementById('show-user-button');
showHome = document.getElementById('show-home');
showUser = document.getElementById('show-user');
showHome.style.display = "none";
showUser.style.display = "block";
showHomeButton.addEventListener('click', () => {
        showHome.style.display = "block";
        showUser.style.display = "none";
});
showUserButton.addEventListener('click', () => {
    showHome.style.display = "none";
    showUser.style.display = "block";
});
run();
function run () {
    console.log('start')
    if(currnetPostId != '' && likeArray.length == 3 && activeFollowersToAdd != null){
        deletePostId = document.getElementById(currnetPostId);
        follower1 = document.getElementById(activeFollowers[0]);
        follower2 = document.getElementById(activeFollowers[1]);
        follower3 = document.getElementById(activeFollowers[2]);
        follower4 = document.getElementById(activeFollowers[3]);
        follower5 = document.getElementById(activeFollowers[4]);
        addFollower1 = document.getElementById(activeFollowersToAdd[0]);
        addFollower2 = document.getElementById(activeFollowersToAdd[1]);         
        addFollower3 = document.getElementById(activeFollowersToAdd[2]);         
        addFollower4 = document.getElementById(activeFollowersToAdd[3]);         
        addFollower5 = document.getElementById(activeFollowersToAdd[4]);
        like1 = document.getElementById(`like:${likeArray[0]}`);
        like2 = document.getElementById(`like:${likeArray[1]}`);
        like3 = document.getElementById(`like:${likeArray[2]}`);
        like4 = document.getElementById(`like:${currnetPostId}`);
        disLike4 = document.getElementById(`dislike:${currnetPostId}`);
        disLike1 = document.getElementById(`dislike:${likeArray[0]}`);
        disLike2 = document.getElementById(`dislike:${likeArray[1]}`);
        disLike3 = document.getElementById(`dislike:${likeArray[2]}`);
        showComent1 = document.getElementById(`click:${likeArray[0]}`);
        showComent2 = document.getElementById(`click:${likeArray[1]}`);
        showComent3 = document.getElementById(`click:${likeArray[2]}`);
        showComent4 = document.getElementById(`click:${currnetPostId}`);
        displayComent1 = document.getElementById(`comment:${likeArray[0]}`);
        displayComent2 = document.getElementById(`comment:${likeArray[1]}`);
        displayComent3 = document.getElementById(`comment:${likeArray[2]}`);
        displayComent4 = document.getElementById(`comment:${currnetPostId}`);
        like1.addEventListener('click', () => {
            addLike(likeArray[0])
        });
        like2.addEventListener('click', () => {
            addLike(likeArray[1])
        });
        like3.addEventListener('click', () => {
            addLike(likeArray[2])
        });
        like4.addEventListener('click', () => {
            addLike(currnetPostId)
        });
        disLike4.addEventListener('click', () => {
            deleteLike(currnetPostId)
        });
        disLike1.addEventListener('click', () => {
            deleteLike(likeArray[0])
        });
        disLike2.addEventListener('click', () => {
            deleteLike(likeArray[1])
        });
        disLike3.addEventListener('click', () => {
            deleteLike(likeArray[2])
        });
        console.log(showComent1)
        displayComent1.style.display = "none";
        displayComent2.style.display = "none";
        displayComent3.style.display = "none";
        displayComent4.style.display = "none";

        showComent1.addEventListener('click', () => {
            if(displayComent1.style.display ==="block"){
                displayComent1.style.display = "none";
            }else{
                displayComent1.style.display = "block";
            }
        });
        showComent2.addEventListener('click', () => {
            if(displayComent2.style.display === "none"){
                displayComent2.style.display = "block";
            }
            else{
                displayComent2.style.display = "none";
            }
        });
        showComent3.addEventListener('click', () => {
            if(displayComent3.style.display == "none"){
                displayComent3.style.display = "block";
            }
            else{
                displayComent3.style.display = "none";
            }
        });
        showComent4.addEventListener('click', () => {
            if(displayComent4.style.display == "none"){
                displayComent4.style.display = "block";
            }
            else{
                displayComent4.style.display = "none";
            }
        });

            addFollower1.addEventListener('click', () => {
                addFollower(activeFollowersToAdd[0]);
            });
    
            addFollower2.addEventListener('click', () => {
                addFollower(activeFollowersToAdd[1]);
            });
    
            addFollower3.addEventListener('click', () => {
                addFollower(activeFollowersToAdd[2]);
            });
    
            addFollower4.addEventListener('click', () => {
                addFollower(activeFollowersToAdd[3]);
            });
    
            addFollower5.addEventListener('click', () => {
                addFollower(activeFollowersToAdd[4]);
            });
        
       

        follower1.addEventListener('click', () => {
            deleteFollower(activeFollowers[0])
        })
        follower2.addEventListener('click', () => {
            deleteFollower(activeFollowers[1])
        })
        follower3.addEventListener('click', () => {
            deleteFollower(activeFollowers[2])
        })
        follower4.addEventListener('click', () => {
            deleteFollower(activeFollowers[3])
        })
        follower5.addEventListener('click', () => {
            deleteFollower(activeFollowers[4])
        })
        deletePostId.addEventListener('click', () => {
            deleteFollower(currnetPostId);
        });

    }else{
        setTimeout(run, 1000);
    }
}       

const addLike = (data) => {
    fetch(`http://localhost:8080/api/posts/${data}/likes`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': activeUser
        }
    })
    .then(response => response.json()) 
    .then(json => console.log(json))
    .catch(err => console.log(err));
}

const deleteLike = (data) => {
    fetch(`http://localhost:8080/api/posts/${data}/likes`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': activeUser
        }
    })
    .then(response => response.json()) 
    .then(json => console.log(json))
    .catch(err => console.log(err));
}

const addFollower = (data) => {  
    fetch(`http://localhost:8080/api/followers/${data}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': activeUser
        }
    })
    .then(response => response.json()) 
    .then(json => console.log(json))
    .catch(err => console.log(err));
}

const deleteFollower = (data) => {  
    fetch(`http://localhost:8080/api/followers/${data}`, { method: 'DELETE'})
    .then(response => response.json()) 
    .then(json => console.log(json))
    .catch(err => console.log(err));
}

const deletePosts = (data) => {  
        fetch(`http://localhost:8080/api/posts/${data}`, {method: 'DELETE'})
        .then(response => response.json()) 
        .then(json => console.log(json))
        .catch(err => console.log(err));
}