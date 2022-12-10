(()=>{
    const loggedInUser = getLoggedInUser();
    const locationArray = window.location.pathname.split("/");
    switch (locationArray[locationArray.length - 1]) {
        case "signIn.html":
        case "index.html": {
            if (loggedInUser) {
                window.location.replace("content.html");
            }
            break;
        }
        case "content.html": {
            if (!loggedInUser) {
                window.location.replace("index.html");
            }
        }
    }
})(); 

function signIn() {
    const emailInput = document.querySelector("#inputEmailSignIn").value;
    const passwordInput1 = document.querySelector("#inputPassword1").value;
    const passwordInput2 = document.querySelector("#inputPassword2").value;
    const usernameInput = document.querySelector("#inputUsernameSignIn").value;
    const checkbox = document.getElementById("checkTerms");
    if (checkbox.checked === false) {
        document.querySelector(".form-check-label").classList.add("red");
        return;
    }
    if (passwordInput1 != passwordInput2) {
        document.querySelector("#passwordHelp").style.display = "block";
        document.querySelector("#passwordHelp").classList.add("red");
        return;
    }
    if (emailInput === "" || passwordInput1 === "" || passwordInput2 === "" || usernameInput === "") {
        if (usernameInput === "") {
            document.querySelector("#labelUsername").classList.add("red");
        } else if (emailInput === "") {
            document.querySelector("#labelEmail").classList.add("red");
        } else if (passwordInput1 === "") {
            document.querySelector("#labelPassword1").classList.add("red");
        } else if (passwordInput2 === "") {
            document.querySelector("#labelPassword2").classList.add("red");
        }
        return;
    }
    if (users.some((user) => { return user.username === usernameInput })) {
        document.querySelector("#labelUsername").classList.add("red");
        return;
    } else if (users.some((user) => { return user.email === emailInput })) {
        document.querySelector("#labelEmail").classList.add("red");
        return;
    };
    addUser(usernameInput, emailInput, passwordInput1);
    window.location.replace("content.html");
}

function handleLogIn() {
    let passwordInput = document.querySelector("#inputPasswordLogIn").value;
    let usernameInput = document.querySelector("#inputUsernameLogIn").value;
    if (passwordInput === "" && usernameInput === "") {
        document.querySelector("#inputUsernameLogInLabel").classList.add("red");
        document.querySelector("#inputPasswordLogInLabel").classList.add("red");
        return;
    }
    const isUserExisting = checkIfUserExistsByUsernameAndPassword(usernameInput, passwordInput);
    if (!isUserExisting) {
        document.querySelector("#inputUsernameLogInLabel").classList.add("red");
        document.querySelector("#inputPasswordLogInLabel").classList.add("red");
        return;
    }
    logIn(usernameInput);

    window.location.replace("content.html");
}

