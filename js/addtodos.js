"use strict"

// init vars
const taskDescription = document.getElementById("description")
const userDropdown = document.getElementById("listOfUsers")
const categoriesDropdown = document.getElementById("listOfCategories")
const priorityDropdown = document.getElementById("priorityLevels")
const deadline = document.getElementById("deadline")
const addTaskBtn = document.getElementById("addTaskBtn")

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
