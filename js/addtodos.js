"use strict"

// init vars
const taskDescription = document.getElementById("description")
const userDropdown = document.getElementById("listOfUsers")
const categoriesDropdown = document.getElementById("listOfCategories")
const priorityDropdown = document.getElementById("priorityLevels")
const deadlineField = document.getElementById("deadline")
const addTaskBtn = document.getElementById("addTaskBtn")
const msg = document.getElementById("msg")

window.addEventListener('load', function () {
    populateDropdown(userDropdown)
    populateCategoryDropdown(categoriesDropdown);
    addTaskBtn.onclick = createTodo;
})

function populateDropdown(dropdown) {
    fetch("http://localhost:8083/api/users")
        .then(res => res.json())
        .then(data => {
            for (let user of data) {
                let option = new Option(user.name, user.id);
                dropdown.appendChild(option)
            }
        })
}

function populateCategoryDropdown(dropdown) {
    fetch("http://localhost:8083/api/categories")
        .then(res => res.json())
        .then(categories => {
            for (let category of categories) {
                let option = new Option(category.name, category.id);
                dropdown.appendChild(option);
            }
        });
}

function createTodo() {
    const userSelected = userDropdown.value;
    const categorySelected = categoriesDropdown.value;
    const prioritySelected = priorityDropdown.value;
    const newTask = taskDescription.value;
    const deadline = deadlineField.value;

    const isEmpty = (!(userSelected && categorySelected && prioritySelected && newTask && deadlineField))
    msg.innerHTML = ""         // Reset MSG

    if (isEmpty){
        // When there is one or more fields empty then...
        alert("Please fill out all fields.")
    } else {
        // When all fields are filled ...
        let newTodo = {
            userid: userSelected,
            category: categorySelected,
            description: newTask,
            deadline: new Date(deadline),
            priority: prioritySelected
        }
        fetch("http://localhost:8083/api/todos", {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: {
                "Content-type":
                    "application/json; charset=UTF-8"
            }
    
        }).then(response => {
            // TODO: Print todo updated
            msg.innerHTML = "This user's task has been updated"
        });
    }
}