document.addEventListener('DOMContentLoaded', (event) => {
    loadPosts();
});

function loadPosts() {
    fetch('posts.json')
        .then(response => response.json())
        .then(data => {
            const postsContainer = document.getElementById('posts');
            postsContainer.innerHTML = '';
            data.posts.forEach((post, index) => {
                const postDiv = document.createElement('div');
                postDiv.classList.add('post');
                postDiv.innerHTML = `
                    <div class="post-title">${post.title}</div>
                    <div class="post-content">${post.content}</div>
                `;
                postsContainer.appendChild(postDiv);
            });
        })
        .catch(error => console.error('Error loading posts:', error));
}

function submitPost() {
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    if (title && content) {
        const newPost = { title, content };

        fetch('posts.json')
            .then(response => response.json())
            .then(data => {
                data.posts.push(newPost);
                savePosts(data);
            })
            .catch(error => console.error('Error loading posts:', error));
    } else {
        alert('Please enter both a title and content for the post.');
    }
}

function savePosts(data) {
    const json = JSON.stringify(data, null, 2);

    console.log('Updated posts data:', json);

    loadPosts();
}
