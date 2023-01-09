"use strict"

window.addEventListener('load', function(){
    this.document.getElementById("addUser").onclick = () => {
        const fullName = this.document.getElementById("nameInput").value;
        const username = this.document.getElementById("userInput").value;
        const pw = this.document.getElementById("passInput").value;
        const confpw = this.document.getElementById("confirmPass").value;
        const isEmpty = (!(fullName && username && pw && confpw))
        const msg = this.document.getElementById("msg")
        msg.innerHTML = "";

        if (!isEmpty && (pw === confpw)) {
            console.log("All fields were successfully filled.")
            let newUser = {
                name: fullName,
                username: username,
                password: pw
            }
            fetch("http://localhost:8083/api/users", {
                method: "POST",
                body: JSON.stringify(newUser),
                headers: {
                    "Content-type":
                        "application/json; charset=UTF-8"
                }
            }).then(response => {
                    msg.innerHTML = "New user has been added.";
            })
        } else {
            msg.innerHTML = "Something went wrong... check console."
            if (isEmpty) {
                console.log("Check for blank fields")
            } else if (pw !== confpw){
                console.log("Passwords don't match.")
            }
        }
    }
})