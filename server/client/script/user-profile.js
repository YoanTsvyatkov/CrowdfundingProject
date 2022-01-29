
const userID = localStorage.getItem("id");


async function fetchProfileData() {
    try {
        const result = await fetch(
            `http://localhost:3000/api/user/${userID}`,
            {
                method: "GET"
            }
        );

        const user = await result.json();

        return user;

    } catch (err) {
        alert("Error")
    }

}



async function setProfileData() {
    const user = await fetchProfileData();
    const userName = document.getElementById("first-name");
    userName.innerHTML = user.firstName;
    const userLastname = document.getElementById("last-name");
    userLastname.innerHTML = user.lastName;
    const userEmail = document.getElementById("email");
    userEmail.innerHTML = user.email;
    const userPhone = document.getElementById("phone");
    userPhone.innerHTML = user.phoneNumber;
    const userAge = document.getElementById("age");
    userAge.innerHTML = user.age;
    const userOccupation = document.getElementById("occupation");
    userOccupation.innerHTML = user.occupation;
    const userDescription = document.getElementById("description");
    userDescription.innerHTML = user.profileDescription;
    const name = document.getElementById("name");
    name.innerHTML = user.firstName+" " + user.lastName;
}

(
    async () => {
        await setProfileData();
    }

)()