const form = document.getElementById("search-form");
const userList = document.getElementById("user-list");
const reposList = document.getElementById("repos-list");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const query = document.getElementById("search").value.trim();

  if (!query) return;

  fetch(`https://api.github.com/search/users?q=${query}`, {
    headers: {
      Accept: "application/vnd.github.v3+json"
    }
  })
    .then(res => res.json())
    .then(data => {
      userList.innerHTML = "";
      reposList.innerHTML = "";

      data.items.forEach(user => {
        const li = document.createElement("li");
        li.innerHTML = `
          <img src="${user.avatar_url}" width="50" height="50" />
          <a href="${user.html_url}" target="_blank">${user.login}</a>
        `;
        li.addEventListener("click", () => fetchRepos(user.login));
        userList.appendChild(li);
      });
    })
    .catch(error => console.error("Error fetching users:", error));
});

function fetchRepos(username) {
  fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      Accept: "application/vnd.github.v3+json"
    }
  })
    .then(res => res.json())
    .then(repos => {
      reposList.innerHTML = "";
      repos.forEach(repo => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        reposList.appendChild(li);
      });
    })
    .catch(error => console.error("Error fetching repos:", error));
}
