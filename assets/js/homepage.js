var getUserRepos = function(user) {
    //user api string
    var userApi = "https://api.github.com/users/" + user + "/repos";
    //fetch
    fetch(userApi).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};


getUserRepos("microsoft");