//dom elements
var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");


//display issues handles api data
var displayIssues = function(issues) {

    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
      }

    for (let i =0; i < issues.length; i++) {
        //link el to git hub
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].url);
        issueEl.setAttribute("target","_blank");
        //create span el
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
        issueEl.appendChild(titleEl);
        //el for type
        var typeEl = document.createElement("span");
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent ="(Issue)";
        }
        issueEl.appendChild(typeEl);

        issueContainerEl.appendChild(issueEl);
    }
};

//get issues function
var getRepoIssues = function(repo) {
    //api format 
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayIssues(data);

                if(response.headers.get("Link")) {
                    console.log("repo has more than 30 issues");
                }
            });
        } else {
            alert("there was a problem with your request");
        }
    });
};


//call functions
getRepoIssues("facebook/react");