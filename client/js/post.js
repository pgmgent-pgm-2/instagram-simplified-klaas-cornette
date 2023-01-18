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
    makePost.style.display = "block";
});

inputFoto.addEventListener('keyup', (e) => {
    searchStringFoto = e.target.value;
    console.log(searchStringFoto)
});

inputBody.addEventListener('keyup', (e) => {
    searchStringBody = e.target.value;
    console.log(searchStringBody)
});

returnPost.addEventListener('click', () => {
    postToCreate = {
        body : searchStringBody,
        picture : { 
            small : searchStringFoto
        } 
    }
    addPost(postToCreate);
})
const addPost = (postToCreate) => {
    fetch(`http://localhost:8080/api/posts`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(postToCreate)
    })
    .then(response => response.json()) 
    .then(json => console.log(json))
    .catch(err => console.log(err));
    makePost.style.display = "none";
}
