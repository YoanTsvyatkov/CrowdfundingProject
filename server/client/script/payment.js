const formTitle = document.getElementById('title');
const formAmount = document.getElementById('amount');
const formStartupId = document.getElementById('startup_id');
const formUserId = document.getElementById('user_id');

window.addEventListener("load", function() {
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
            projectTitle: formTitle.value,
            amount: formAmount.value,
            startupId: formStartupId.value,
            userId: formUserId.value,
        }

        postRequest("http://localhost:3000/api/checkout", JSON.stringify(requestBody),
            (data) => {
                window.location.href = data.url
            },
            (err) => {

            });
    }

    // Access the form element...
    const form = document.getElementById("myForm");

    // ...and take over its submit event.
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        sendData();
    });
});