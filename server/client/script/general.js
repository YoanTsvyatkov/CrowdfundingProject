const projectId = localStorage.getItem("projectId");
const token = localStorage.getItem("token");


if (localStorage.getItem('token') != null) {
    var unauthorizedOptions = document.getElementsByClassName("rightNavOptionsUnauthorized");
    for (var i = 0; i < unauthorizedOptions.length; i++) {
        unauthorizedOptions[i].style.display = "none";
    }
} else {
    var authorizedOptions = document.getElementsByClassName("rightNavOptionsAuthorized");
    for (var i = 0; i < authorizedOptions.length; i++) {
        authorizedOptions[i].style.display = "none";
    }
}


document
    .getElementById("logOutButton")
    .addEventListener("click", function () {
        localStorage.removeItem("token");
    });