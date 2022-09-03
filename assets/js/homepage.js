//html elements
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");




//Fetch function
var getUserRepos = function(user) {
    //user api string
    var userApi = "https://api.github.com/users/" + user + "/repos";
    //fetch
    fetch(userApi)
        .then(function(response) {
            if (response.ok){
                response.json().then(function(data) {
                    displayRepos(data, user);
                });
            } else {
                alert("Error: user not found");
            }
        })
        .catch(function(error){
            alert("Unabletoconnect to GitHub");
        });

};

//Display repository function
var displayRepos = function(repos, searchTerm) {
    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    //clear old data
    repoContainerEl.textContent = "";

    repoSearchTerm.textContent = searchTerm;

    //loop through repos
    for (let i = 0; i < repos.length; i++) {
        //repo name format
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //container for repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        //span el for repo name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        //append span to repo el
        repoEl.appendChild(titleEl);

        // append to container
        repoEl.appendChild(statusEl);

        // append repo to repo container 
        repoContainerEl.appendChild(repoEl);
    }
};



//user-form handler
var formSubmitHandler = function(event) {
    event.preventDefault();
    
    var userName = nameInputEl.value.trim();
    if (userName) {
        getUserRepos(userName);
        nameInputEl.value = "";
    } else {
        alert("Please enter valid github username.");
    }


};








//Call functions and event listners
userFormEl.addEventListener("submit",formSubmitHandler);