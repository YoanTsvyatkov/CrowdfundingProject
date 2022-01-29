const editProjectForm = document.getElementById("edit-project-form");
const editID = localStorage.getItem("editProjectId");
const editProjectTitle = localStorage.getItem("editProjectTitle");
const editProjectDescription = localStorage.getItem("editProjectDescription");
const editCategory = localStorage.getItem("editCategory");

const editCategoryField = document.getElementById("edit-category");
const editDescriptionField = document.getElementById("edit-description");
const editProjectNameField = document.getElementById("edit-project-name");

const saveChangesBtn = document.getElementById("saveChangesButton");

setInput()

function setInput() {
    let categoryOption;
    switch (true) {
        case editCategory.includes("Technology"): categoryOption = 1; break;
        case editCategory.includes("Medical"): categoryOption = 2; break;
        case editCategory.includes("Food"): categoryOption = 3; break;
        case editCategory.includes("Games"): categoryOption = 4; break;
        case editCategory.includes("Music"): categoryOption = 5; break;
        default: categoryOption = 1; break;
    }

    editCategoryField.value = categoryOption;
    editDescriptionField.value = editProjectDescription;
    editProjectNameField.value = editProjectTitle;
}

saveChangesBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const data = {
        category: editCategoryField.options[editCategoryField.selectedIndex].text,
        descriptionOfIdea: editDescriptionField.value,
        projectTitle: editProjectNameField.value
    }

    try {
        const result = await fetch(
            `http://localhost:3000/api/project/${editID}`,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }
        );

        if (result.status == 200) {
            const json = await result.json();
            window.location.href = "projects.html";
        } else {
            alert("Something went wrong");
        }
    } catch (error) {
        alert("Something went wrong");
    }
});
