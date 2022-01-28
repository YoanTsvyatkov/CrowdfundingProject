const registerForm = document.getElementById('register-form');
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const email = document.getElementById('email');
const age = document.getElementById('age');
const occupation = document.getElementById('occupation');
const phoneNumber = document.getElementById('phone-number');
const profileDescription = document.getElementById('profile-description');
const password = document.getElementById('password');
const error = document.getElementById('error');
const success = document.getElementById('success');

if(registerForm != null){
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
    
        if(!validatePhoneNumber(phoneNumber.value)){
            showError("Phone number must be 10 characters.");
        }
      
    
        const requestBody = {
            firstName : firstName.value,
            lastName : lastName.value,
            age : age.value,
            occupation : occupation.value,
            email: email.value,
            phoneNumber : phoneNumber.value,
            profileDescription : profileDescription.value,
            password: password.value
        }
    
        if(validatePhoneNumber(phoneNumber.value)){
            postRequest("http://localhost:3000/api/register",  JSON.stringify(requestBody), 
            (data) => {
                localStorage.setItem('token', data.token);
                window.location.replace("home.html");

            }, 
            (err) => {
                showError("Invalid email or password");
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

function validatePhoneNumber(phoneNumber){
    if(phoneNumber.length < 10){
        return false;
    }

    return true;
}