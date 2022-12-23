"use strict"

// Init Vars Here
const userDropdown = document.getElementById("userDropdown")
const userNameField = document.getElementById("userNameField")
const todoTable = document.getElementById("todoTable")
const todoTableBody = document.getElementById("todoTableBody")
const msg = document.getElementById("msg")

let userSelected;

window.addEventListener('load', function () {
    console.log("It loaded!")
    populateDropdown(userDropdown);
    userDropdown.onchange = viewUserTasks;
})

function populateDropdown(dropdown) {
    console.log("This is to populate users names")
    fetch("http://localhost:8083/api/users")
        .then(res => res.json())
        .then(data => {
            for (let user of data) {
                let option = new Option(user.name, user.id);
                dropdown.appendChild(option)
            }
        })
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function viewUserTasks() {
    todoTableBody.innerHTML = "";       // Reset Table
    msg.innerHTML = ""         // Reset MSG
    userSelected = userDropdown.value;

    fetch(`http://localhost:8083/api/todos/byuser/${userSelected}`)
        .then(res => res.json())
        .then(todos => {
            console.log(todos.length)
            // If a user has no todos then...
            if ((todos.length < 1) || todos === null) {
                todoTable.style.display = "none";
                msg.innerHTML = "This user has no tasks to do."
            }
            // If a user contains a todo then display the todos.
            else {
                for (let task of todos) {
                    let row = todoTableBody.insertRow(-1);
                    for (let property in task) {
                        switch (property) {
                            // If one of these properties > add to cell
                            case "description":
                            case "deadline":
                                let cell = row.insertCell(-1);
                                cell.innerHTML = task[property];
                                break;
                        }
                    }
                    let anchorCell = row.insertCell(-1);
                    let anchor = document.createElement("a");
                    anchor.href = `todo_details.html?toDoid=${task.id}`;
                    anchor.text = "See Details";
                    anchorCell.appendChild(anchor);
                }
                todoTable.style.display = "block";
            }
            // Display user selected
            userNameField.innerHTML = $("#userDropdown option:selected").text();
        });
}