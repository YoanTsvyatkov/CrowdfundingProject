const projectDetails = document.getElementById("projectDetails");
const moneySection = document.getElementById("moneyRaised");
const titleValue = localStorage.getItem("projectTitle");
const descriptionValue = localStorage.getItem("projectDescription");
const categoryValue = localStorage.getItem("category");
const investmentGoalValue = localStorage.getItem("investmentGoal");
const amountRaisedValue = localStorage.getItem("amountRaised");

setDetails();

function setDetails() {
    const projectTitle = document.createElement("h2");
    projectTitle.id = "projectTitle";
    projectTitle.innerHTML = titleValue;

    const projectDescription = document.createElement("p");
    projectDescription.id = "projectDescription";
    projectDescription.innerHTML = descriptionValue;

    const category = document.createElement("h4");
    category.id = "projectCategory";
    category.innerHTML = "<font color='black'> Category: </font>" + categoryValue;
    

    projectDetails.appendChild(projectTitle);
    projectDetails.appendChild(projectDescription);
    projectDetails.appendChild(category);

    const amountRaised = document.createElement("h2");
    amountRaised.id = "raised";
    amountRaised.innerHTML = 'BGN ' + amountRaisedValue + '<font color="black"><small> raised</small></font>';

    const investmentGoal = document.createElement("h4");
    investmentGoal.id = "investmentGoal";
    investmentGoal.innerHTML = 'pledged of <b> BGN' + investmentGoalValue + '</b>';

    moneySection.appendChild(amountRaised);
    moneySection.appendChild(investmentGoal);
}