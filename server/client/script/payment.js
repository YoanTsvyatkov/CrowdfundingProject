const container = document.getElementById("titleSection");
const moneySection = document.getElementById("moneySection");
const amount = document.getElementById('amount');


const titleValue = localStorage.getItem("projectTitle");
const investmentGoalValue = localStorage.getItem("investmentGoal");
const amountRaisedValue = localStorage.getItem("amountRaised");
const startupId = localStorage.getItem("startupId");
const userId = localStorage.getItem("id");

if(token == null) {
    alert("Sorry, you cannot invest in a project, without being logged in!");
    window.location.href = "register.html";
}

setInvestData();

function setInvestData() {
    const projectTitle = document.createElement("h2");
    projectTitle.id = "projectTitle";
    projectTitle.innerHTML = titleValue;

    container.appendChild(projectTitle);

    const amountRaised = document.createElement("h2");
    amountRaised.id = "raised";
    amountRaised.innerHTML = 'BGN ' + amountRaisedValue + '<font color="black"><small> raised</small></font>';

    const investmentGoal = document.createElement("h4");
    investmentGoal.id = "investmentGoal";
    investmentGoal.innerHTML = 'pledged of <b> BGN' + investmentGoalValue + '</b>';

    moneySection.appendChild(amountRaised);
    moneySection.appendChild(investmentGoal);
}

window.addEventListener("load", function () {
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

    function sendData() {
        const requestBody = {
            projectTitle: titleValue,
            amount: amount.value,
            startupId: startupId,
            userId: userId,
        }

        postRequest("http://localhost:3000/api/checkout", JSON.stringify(requestBody),
            (data) => {
                window.location.href = data.url
            },
            (err) => {

            });
    }

    // Access the form element...
    const form = document.getElementById("mainContainer");

    // ...and take over its submit event.
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        sendData();
    });
});