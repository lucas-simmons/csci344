import { getAccessToken } from "./utilities.js";
const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "lucas";
let password = "password";

async function initializeScreen() {
  // this function is getting invoked when the page first loads:
  token = await getAccessToken(rootURL, username, password);
  showNav();
  // get posts:
  getPosts();
  getProfile();
  getSuggestions();
  getStories();
}

function showNav() {
  document.querySelector("#nav").innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button aria-label="signs you out of your account" class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
}

// implement remaining functionality below:
//await / async syntax:
async function getPosts() {
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/posts/?limit=10",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  renderPosts(data);
}

function renderBookmarkButton(postJSON) {
  let template = "";
  if (postJSON.current_user_bookmark_id) {
    template = `
            <button aria-label="remove your bookmark from the post" onclick="window.removeBookmark(${postJSON.current_user_bookmark_id})">
                <i class="fas fa-bookmark"></i>
            </button>
        `;
  } else {
    template = `
            <button aria-label="bookmarks the post" onclick="window.createBookmark(${postJSON.id})">
                <i class="far fa-bookmark"></i>
            </button>
        `;
  }
  return template;
}
function renderLikeButton(postJSON) {
  let template = "";
  if (postJSON.current_user_like_id) {
    template = `
            <button aria-label="deletes a like from the post" onclick="window.removeLike(${postJSON.current_user_like_id})">
             <i class="fa-solid fa-heart" style="color: #e66572;"></i>
            </button>
        `;
  } else {
    template = `
            <button aria-label="adds a like to the post" onclick="window.createLike(${postJSON.id})">
              <i class="far fa-heart"></i>
            </button>
        `;
  }
  return template;
}

//PROFILE RENDER AND GET
// PROFILE RENDER AND GET -----------------------------------------------------
//PROFILE RENDER AND GET
function renderProfile(postJSON) {
  const template = `
  <header class="flex gap-4 items-center">
            <img src="${postJSON.image_url}" alt="profile picture" class="h-16 w-16 rounded-full" />
            <h2 class="font-Comfortaa font-bold text-2xl">${postJSON.username}</h2>
  </header>
  `;
  const container = document.querySelector(".profile");
  container.insertAdjacentHTML("beforeend", template);
}
//await / async syntax:
async function getProfile() {
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/profile/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  renderProfile(data);
}
// SUGGESTIONS GET AND RENDER -----------------------------------------------------
//
//await / async syntax:
async function getSuggestions() {
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/suggestions/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  renderSuggestions(data);
}
function renderSuggestion(postJSON) {
  const template = `
              <section class="flex justify-between items-center mb-4 gap-2">
                <img src="${postJSON.image_url}" alt="${postJSON.username}'s profile photo" class="rounded-full w-10 h-10" />
                <div class="w-[180px]">
                    <p class="font-bold text-sm">${postJSON.username}</p>
                    <p  class="text-gray-600 text-xs">suggested for you</p>
                </div>
                <button aria-label="follow the user" class="text-blue-600 text-sm py-2">follow</button>
            </section>
  `;
  const container = document.querySelector(".suggestions");
  container.insertAdjacentHTML("beforeend", template);
}

function renderSuggestions(postListJSON) {
  postListJSON.forEach(renderSuggestion);
}

// STORIES GET AND RENDER  -----------------------------------------------------

//await / async syntax:
async function getStories() {
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/stories/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  renderStories(data);
}
function renderStory(postJSON) {
  const template = `
      <div class="flex flex-col justify-center items-center flex-none">
                  <img src="${postJSON.user.image_url}" class="rounded-full h-12 w-12 border-2 border-gray-300" alt="${postJSON.user.username}'s profile photo" />
                  <p class="text-xs text-gray-500">${postJSON.user.username}</p>
      </div>
   
  `;
  const container = document.querySelector(".stories");
  container.insertAdjacentHTML("beforeend", template);
}
function renderStories(postListJSON) {
  postListJSON.forEach(renderStory);
}

function renderComment(postJSON) {
  const template = `
                <p class="text-sm mb-3">
                    <strong>${postJSON.user.username}</strong>
                    ${postJSON.text}
                </p>
  `;
  return template;
}
function renderComments(postListJSON) {
  let template = "";
  if (postListJSON.length > 1) {
    template = `
    ${renderComment(postListJSON[0])}
    <button class="link text-sm text-sky-700">View all ${
      postListJSON.length
    } comments</button>
  `;
  } else if (postListJSON.length === 1) {
    console.log(` less than or equal to 1  | ${postListJSON.length}`);
    template = `
    ${renderComment(postListJSON[0])}
  `;
  }
  return template;
}

// POST RENDER -----------------------------------------------------

function renderPost(postJSON) {
  const template = `
        <section class="bg-white border mb-10">
            <div class="p-4 flex justify-between">
                <h3 class="text-lg font-Comfortaa font-bold">${
                  postJSON.user.username
                }</h3>
                <button aria-label="options menu for the post" class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
            </div>
            <img src="${postJSON.image_url}" alt="${
    postJSON.alt_text
  }" width="300" height="300"
                class="w-full bg-cover">
            <div class="p-4">
                <div class="flex justify-between text-2xl mb-3">
                    <div>
                
                        ${renderLikeButton(postJSON)}
                        <button aria-label="make a comment on the post"><i class="far fa-comment"></i></button>
                        <button aria-label="share the post"><i class="far fa-paper-plane"></i></button>
                    </div>
                    <div>
                        ${renderBookmarkButton(postJSON)}
                    </div>
                </div>
                <p class="font-bold mb-3">${postJSON.likes.length} likes</p>
                <div class="text-sm mb-3">
                    <p>
                        <strong>${postJSON.user.username}</strong>
                        ${
                          postJSON.caption
                        } <button aria-label="see the rest of the caption" class="button">more</button>
                    </p>
                </div>
                  ${renderComments(postJSON.comments)}
                <p class="uppercase text-gray-500 text-xs">${
                  postJSON.display_time
                }</p>
            </div>
            <div class="flex justify-between items-center p-3">
                <div class="flex items-center gap-3 min-w-[80%]">
                    <i class="far fa-smile text-lg"></i>
                    <input aria-label="type the text of the comment" type="text" class="min-w-[80%] focus:outline-none" placeholder="Add a comment...">
                </div>
                <button aria-label="post a comment" class="text-blue-600 py-2">Post</button>
            </div>
        </section>
    `;
  const container = document.querySelector("main");
  container.insertAdjacentHTML("beforeend", template);
}

function renderPosts(postListJSON) {
  // option 1:
  postListJSON.forEach(renderPost);
}
window.createComment = async function (postId) {
  const postData = {
    post_id: postId,
    text: postId.comments.text,
  };
  const response = await fetch(
    `https://photo-app-secured.herokuapp.com/api/comments/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    }
  );
  const data = await response.json();
  console.log(data);
};
window.createComment = async function (postId) {
  const postData = {
    post_id: postId,
    text: postId.comments.text,
  };
  const response = await fetch(
    `https://photo-app-secured.herokuapp.com/api/comments/${postId.comments}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    }
  );
  const data = await response.json();
  console.log(data);
};

//await / async syntax:
window.createBookmark = async function (postId) {
  const postData = {
    post_id: postId,
  };
  console.log(postId);
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/bookmarks/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    }
  );
  const data = await response.json();
  console.log(data);
};
//await / async syntax:
window.removeBookmark = async function (postId) {
  const postData = {
    post_id: postId,
  };
  console.log(postId);
  const response = await fetch(
    `https://photo-app-secured.herokuapp.com/api/bookmarks/${postId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    }
  );
  const data = await response.json();
  console.log(data);
  //  console.log(postId.current_user_bookmark_id);
};

//await / async syntax:
window.createLike = async function (postId) {
  const postData = {
    post_id: postId,
  };
  console.log(postId);
  const response = await fetch(
    `https://photo-app-secured.herokuapp.com/api/likes/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    }
  );
  const data = await response.json();
  console.log(data);
};
window.removeLike = async function (postId) {
  const postData = {
    post_id: postId,
  };
  const response = await fetch(
    `https://photo-app-secured.herokuapp.com/api/likes/${postId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    }
  );
  const data = await response.json();
  console.log(data);
};

// after all of the functions are defined, invoke initialize at the bottom:
initializeScreen();
