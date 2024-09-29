let postContainer = document.getElementById('postContainer');
let page = 1;

function loadPosts() {
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=3`)
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {
                let postElement = document.createElement('div');
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                `;
                postContainer.appendChild(postElement);
            });
        });
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        page++;
        loadPosts();
    }
});

loadPosts();