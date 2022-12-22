"use strict"

// Init Vars Here
const userDropdown = document.getElementById("userDropdown")
const userNameField = document.getElementById("userNameField")

let userSelected;

window.addEventListener('load', function(){
    console.log("It loaded!")
    populateDropdown(userDropdown);
    userDropdown.onchange = viewUserTasks;
})

function populateDropdown(dropdown) {
    console.log("This is to populate users names")
    fetch("http://localhost:8083/api/users")
    .then(res => res.json())
    .then(data => {
        for(let user of data){
            let option = new Option(user.name, user.id);
            dropdown.appendChild(option)
        }
    })
}

function viewUserTasks() {
    userSelected = userDropdown.value;
    fetch(`http://localhost:8083/api/todos/byuser/${userSelected}`)
    .then(res => res.json())
    .then(todos => {
        // If user has no todos then...
        if ((todos.length < 1) || todos === null) {
            // TODO: Display no tasks for this user
        } else {
            // TODO: Populate Table
        }
    })
    // Display user selected
    userNameField.innerHTML = $("#userDropdown option:selected").text();
}