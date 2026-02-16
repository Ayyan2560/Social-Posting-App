let editableIndex = null;
let currentUser_String = localStorage.getItem("currentUser");
let currentUser_obj = JSON.parse(currentUser_String)
if (!currentUser_obj) {
    window.location.href = "../login/index.html";
} else {
    document.querySelector(".user-mail").innerText = currentUser_obj.email;
}
 document.querySelector("#logout").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "../login/index.html";
 });
 document.querySelector('form').addEventListener('submit', (e) => {
     e.preventDefault() 
      const postInput_Title = document.querySelector("#Title").value
      const postInput_Description = document.querySelector("#description").value
      let posts_in_string = localStorage.getItem("posts");
        let all_posts = JSON.parse(posts_in_string) || [];

        if (editableIndex !==null)
        {
            all_posts[editableIndex].title = postInput_Title
            all_posts[editableIndex].description = postInput_Description
            localStorage.setItem("posts", JSON.stringify(all_posts));
            editableIndex = null;
            alert("Post updated successfully!");
        }
        let new_post ={
            title : postInput_Title,
            description : postInput_Description,
            time : new Date().getTime(),
            createdby : currentUser_obj.email,
            Likes: [],
        }
        all_posts.unshift(new_post);       

       localStorage.setItem("posts", JSON.stringify(all_posts));

        alert("Post created successfully!");


        e.target.reset()
        render_posts();
    } );

function like_post(postIndex) {
    let posts_in_string = localStorage.getItem("posts");
    let all_posts = JSON.parse(posts_in_string) || [];

    let currentPost = all_posts[postIndex];

    const alreadyLiked = currentPost.Likes.find((email) => {
        return email === currentUser_obj.email;
    });

    if (alreadyLiked) {
        
        let updatedLikes = currentPost.Likes.filter((email) => {
            return email !== currentUser_obj.email;
        });
        all_posts[postIndex].Likes = updatedLikes;
    } else {
        
        currentPost.Likes.unshift(currentUser_obj.email);
        all_posts[postIndex] = currentPost;
    }

    localStorage.setItem("posts", JSON.stringify(all_posts));
    render_posts();
}



function edit_post(postIndex) {
    let all_posts = JSON.parse(localStorage.getItem("posts")) || [];
    let post = all_posts[postIndex];

    if (post.createdby !== currentUser_obj.email) {
        alert("You can only edit your own post!");
        return;
    }

    document.querySelector("#Title").value = post.title;
    document.querySelector("#description").value = post.description;

    editableIndex = postIndex;
}



function delete_post(postIndex) {
    let posts_in_string = localStorage.getItem("posts");
    let all_posts = JSON.parse(posts_in_string) || [];

    let post = all_posts[postIndex];

    if (post.createdby !== currentUser_obj.email) {
        alert("You can only delete your own post!");
        return;
    }

    all_posts.splice(postIndex, 1);
    localStorage.setItem("posts", JSON.stringify(all_posts));
    render_posts();
}



function render_posts() {
    const posts_in_string = localStorage.getItem("posts");
    const all_posts = JSON.parse(posts_in_string) || [];

    const output = document.querySelector(".output");
    output.innerHTML = "";

    all_posts.forEach((post, index) => {

        const userLiked = post.Likes.find((email) => {
            return email === currentUser_obj.email;
        });

        output.innerHTML += `
        <div class="single-post">
            <h2>${post.title}</h2>
            <h4>${post.createdby}</h4>
            <p>${post.description}</p>
            <h5>${new Date(post.time).toLocaleString()}</h5>

            <div class="post-btns">
                <button onclick="like_post(${index})">
                    👍 Like (${post.Likes.length})
                </button>

                ${
                    post.createdby === currentUser_obj.email
                        ? `
                        <button onclick="edit_post(${index})">✏️ Edit</button>
                        <button onclick="delete_post(${index})">🗑️ Delete</button>
                        `
                        : ""
                }
            </div>
        </div>
        `;
    });
}


render_posts();
    


   