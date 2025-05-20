
let posts = JSON.parse(localStorage.getItem("posts") || "[]");

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
  document.getElementById(id).classList.add('active-page');
  if (id === 'home') renderPosts();
}

function renderPosts() {
  const container = document.getElementById("postList");
  container.innerHTML = "";
  posts.forEach((post, index) => {
    const div = document.createElement("div");
    div.className = "post-card";
    div.innerHTML = `
      <img src="${post.image}" />
      <p><strong>${post.price} PKR</strong></p>
      <p>${post.location}</p>
    `;
    div.onclick = () => openPost(index);
    container.appendChild(div);
  });
}

function openPost(index) {
  const post = posts[index];
  const detail = document.getElementById("postDetails");
  detail.innerHTML = `
    <h3>${post.title}</h3>
    <img src="${post.image}" />
    <p><strong>Price:</strong> ${post.price} PKR</p>
    <p><strong>Location:</strong> ${post.location}</p>
    <p>${post.description}</p>
  `;
  showPage('blog');
}

function searchPost() {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  alert("Search: " + q);
}

document.getElementById("postForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const location = document.getElementById("location").value;
  const description = document.getElementById("description").value;
  const imageInput = document.getElementById("image");

  const reader = new FileReader();
  reader.onload = function() {
    const imageData = reader.result;
    const newPost = { title, price, location, description, image: imageData };
    posts.unshift(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
    alert("Post added!");
    showPage('home');
    document.getElementById("postForm").reset();
  };
  reader.readAsDataURL(imageInput.files[0]);
});

window.onload = renderPosts;
