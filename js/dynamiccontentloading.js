let postContainer = document.getElementById('postContainer');
let page = 1;

function loadPosts() {
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {
                let postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h3 class="posttitle">${post.title}</h3>
                    <p class="postbody">${post.body}</p>
                `;
                postContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error(`Error fetching posts: ${error.message}`);
        });
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        page++;
        loadPosts();
    }
});

loadPosts();