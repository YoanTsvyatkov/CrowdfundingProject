const projectList = document.getElementById("project-list-container");
const technologyOption = document.getElementById("technologyOption");
const medicalOption = document.getElementById("medicalOption");
const foodAndCraftOption = document.getElementById("foodAndCraftOption");
const gamesAndFilmsOption = document.getElementById("gamesAndFilmsOption");
const musicAndArtsOption = document.getElementById("musicAndArtsOption");

displayAllProjects()

if (technologyOption) {
  technologyOption.addEventListener("click", function () {
    projectList.innerHTML = ""
    let category = "Technology";
    displayProjects(category);
  });
}

if (medicalOption) {
  medicalOption.addEventListener("click", function () {
    projectList.innerHTML = ""
    let category = "Medical";
    displayProjects(category);
  });
}

if (foodAndCraftOption) {
  foodAndCraftOption.addEventListener("click", function () {
    projectList.innerHTML = ""
    let category = "Food";
    displayProjects(category);
  });
}

if (gamesAndFilmsOption) {
  gamesAndFilmsOption.addEventListener("click", function () {
    projectList.innerHTML = ""
    let category = "Games";
    displayProjects(category);
  });
}

if (musicAndArtsOption) {
  musicAndArtsOption.addEventListener("click", function () {
    projectList.innerHTML = ""
    let category = "Music";
    displayProjects(category);
  });
}

async function displayAllProjects() {
  try {
    const result = await fetch("http://localhost:3000/api/project", {
      method: "GET"
    });

    // errorCheck(result);

    const projectList = await result.json();

    projectList.forEach((element) => {
      addProject(element);
    });
  } catch (err) {
    alert("Something went wrong");
  }
}

async function displayProjects(category) {
  try {
    const result = await fetch("http://localhost:3000/api/project", {
      method: "GET"
    });

    const projectList = await result.json();

    projectList.forEach((element) => {
      if (element.category.includes(category)) {
        addProject(element);
      }
    });
  } catch (err) {
    alert("Something went wrong");
  }
}

function addProject(project) {
  const newDiv = document.createElement("div");
  newDiv.id = "project-list-item";

  const details = document.createElement('img');
  details.id = "project-details"
  details.src = "images/info.png"

  const optionsDiv = document.createElement("div")
  optionsDiv.id = "options-project"

  const deleteBtn = document.createElement('img');
  deleteBtn.id = "delete-btn";
  deleteBtn.src = "images/bin.png"

  const editBtn = document.createElement('img');
  editBtn.id = "edit-btn";
  editBtn.src = "images/editing.png"

  optionsDiv.appendChild(deleteBtn)
  optionsDiv.appendChild(editBtn)

  const projectName = document.createElement("h3");
  projectName.id = "project-list-name";
  projectName.innerHTML = project.projectTitle;

  const projectDescription = document.createElement("p")
  projectDescription.id = "project-list-description"
  projectDescription.innerHTML = project.descriptionOfIdea;

  newDiv.appendChild(details);
  newDiv.appendChild(projectName);
  newDiv.appendChild(projectDescription);
  newDiv.appendChild(optionsDiv);
  projectList.appendChild(newDiv);
  addDeleteProjectListener(newDiv, project.ID, deleteBtn);
  addDetailsProjectListener(project, details)
}

function addDetailsProjectListener(project, details) {
  details.addEventListener("click", function () {
    localStorage.setItem("projectTitle", project.projectTitle);
    localStorage.setItem("projectDescription", project.descriptionOfIdea);
    localStorage.setItem("category", project.category);
    localStorage.setItem("investmentGoal", project.investmentGoal);
    localStorage.setItem("amountRaised", project.moneyRaised);
    window.location.href = "details.html";
  });
}

function addDeleteProjectListener(listElement, projectId, deleteButton) {
  deleteButton.addEventListener("click", async (event) => {
    try {
      const result = await fetch(
        `http://localhost:3000/api/project/${projectId}`,
        {
          method: "DELETE"
        }
      );

      projectList.removeChild(listElement);
    } catch (err) {
      alert("Something went wrong");
    }
  });
}

