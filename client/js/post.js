let makePost = document.getElementById("make-post");
let inputFoto = document.getElementById("input-foto");
let inputBody = document.getElementById("input-body");
let returnPost = document.getElementById("return-post");
let newPost = document.getElementById("new-post");
let searchStringBody = '';
let searchStringFoto = '';
let postToCreate;
makePost.style.display = "none";
newPost.addEventListener('click', () => {
    if(makePost.style.display == 'block'){
        makePost.style.display = "none"; 
    }else {
        makePost.style.display = "block";
    }
    
});

returnPost.addEventListener('click', () => {
    postToCreate = {
        body : inputBody.value,
        picture : { 
            small : inputFoto.value
        } 
    }
    addPost(postToCreate);
})
const addPost = (postToCreate) => {
    fetch(`http://localhost:8080/api/posts`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(postToCreate)
    })
    .then(response => response.json()) 
    .then(json => console.log(json))
    .catch(err => console.log(err));
    makePost.style.display = "none";
}
