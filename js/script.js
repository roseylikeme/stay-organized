"use strict"
// Init Vars Here
const userDropdown = document.getElementById("userDropdown")

window.addEventListener('load', function(){
    console.log("It loaded!")
    populateDropdown(userDropdown);
    userDropdown.onchange = displayTodos;
})

function populateDropdown(dropdown) {
    console.log("This is to populate")
    fetch("http://localhost:8083/api/users")
    .then(res => res.json())
    .then(data => {
        for(let user of data){
            let option = new Option(user["name"], user["id"]);
            dropdown.appendChild(option)
        }
    })

}

function displayTodos() {
    console.log("Displaying Tasks")
}