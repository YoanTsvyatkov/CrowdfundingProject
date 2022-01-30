const startProjectForm = document.getElementById('startProject-form');
const category = document.getElementById('category')
const categoryText = category.options[category.selectedIndex].text;
const description = document.getElementById('description')
const projectName = document.getElementById('projectName');
const goal = document.getElementById('goal');
const sharesIssued = document.getElementById('sharesIssued');

const userId = localStorage.getItem("id");

if(token == null) {
    alert("Sorry, you cannot create a project, without being logged in!");
    window.location.href = "login.html";
}

if (startProjectForm != null) {
    startProjectForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const requestBody = {
            investmentGoal: goal.value,
            category: categoryText,
            descriptionOfIdea: description.value,
            projectTitle: projectName.value,
            moneyRaised: 0,
            sharesIssued: sharesIssued.value,
            creatorID: userId
        }


        postRequest("http://localhost:3000/api/project", JSON.stringify(requestBody),
            (data) => {
                window.location.replace("projects.html");
            },
            (err) => {
                showError("Invalid information");
            });
    });
}

function postRequest(url, body, successCallback, errorCallback) {
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: body
    })
        .then(resonse => resonse.json())
        .then(data => {
            successCallback(data);
        }).catch(err => {
            errorCallback(err);
        })
}

function showError(text) {
    error.style.display = 'block';
    const textNode = document.createTextNode(text);
    const paragraph = document.getElementById('error-message');
    paragraph.innerHTML = "";
    paragraph.appendChild(textNode);

    setTimeout(() => {
        error.style.display = 'none';
    }, 3000)
}