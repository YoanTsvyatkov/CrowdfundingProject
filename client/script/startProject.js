const startProjectForm = document.getElementById('startProject-form');
const category = document.getElementById('category')
const categoryText = category.options[category.selectedIndex].text;
const description = document.getElementById('description')
const projectName = document.getElementById('projectName');
const goal = document.getElementById('goal');


if(startProjectForm != null){
    startProjectForm.addEventListener('submit', (event) => {
        event.preventDefault();
    
        if(!validateDescription(description.value)){
            showError("Description must be at least 30 characters.");
        }

        if(!validateGoal(goal.value)){
            showError("Investment goal description must be at least 20 characters.");
        }
      
        const requestBody = {
            category : categoryText.value,
            description : description.value,
            projectName : projectName.value,
            goal : goal.value,
        }
    
        if(validateDescription(description.value) && validateGoal(goal.value)){
            postRequest("http://localhost:3000/api/startProject",  JSON.stringify(requestBody), 
            (data) => {
                localStorage.setItem('token', data.token);
                window.location.replace("home.html");

            }, 
            (err) => {
                showError("Invalid information");
            });
        }
    });    
}

function postRequest(url, body, successCallback, errorCallback){
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

function showError(text){
    error.style.display = 'block';
    const textNode = document.createTextNode(text);
    const paragraph = document.getElementById('error-message');
    paragraph.innerHTML = "";
    paragraph.appendChild(textNode);

    setTimeout(() => {
        error.style.display = 'none';
    }, 3000)
}

function validateGoal (goal){
    if(goal.length < 20){
        return false;
    }

    return true;
}

function validateDescription(description){
    if(description.length < 30){
        return false;
    }

    return true;
}