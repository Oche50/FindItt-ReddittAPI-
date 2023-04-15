// import reddit from './redditAPI'

let searchForm = document.getElementById("search-form");
let searchInput = document.getElementById("search-input");
// form eventListener
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // get search term
  let searchTerm = searchInput.value;
  // get sort field
  let sortBy = document.querySelector('input[name="sortby"]:checked').value;
  console.log(sortBy);
  // get limit field
  let searchLimit = document.querySelector("#limit").value;
  console.log(searchLimit);
  // check if input is empty
  if (searchTerm == "") {
    showMessage("Please add a search term", "alert-danger");
  }
  //   clear input field
  searchInput.value = "";

  // search reddit
  fetch(
    `http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`
  )
    .then(function (response) {
      return response.json();
    })
    .then((data) => data.data.children.map((data) => data.data))
    .then(function (results) {
      let output = '<div class="card-columns">';
      results.forEach(function (post) {
        output += `
        <div class="card>
        <img class="card-img-top" src="" alt="card image cap">
        <div class="card-body">
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text"> ${post.selftext} </p>
        <a href="${post.url}" class="btn btn-primary"> Read More</a>
        </div>
        </div>
        `;
        output += "</div>";
        document.getElementById("results").innerHTML = output;
      });
    });
  // reddit.search(searchTerm,searchLimit,sortBy)
});

function showMessage(message, className) {
  // create div
  let div = document.createElement("div");
  // add class
  div.className = `alert ${className}`;
  // add text
  div.appendChild(document.createTextNode(message));
  // get the parent container
  let searchContainer = document.getElementById("search-container");
  // get search
  let search = document.getElementById("search");
  // insert message
  searchContainer.insertBefore(div, search);
  //   set Timeout
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
}
