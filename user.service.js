let users = [];
let usersJSON = localStorage.getItem("mySiteUsers"); // getting users from local storage
if (usersJSON) {
    users = JSON.parse(usersJSON); // storing users in an array
};

let loggedInUser;
function getLoggedInUser() {
    if (loggedInUser !== undefined) {
        return loggedInUser;
    }
    const loggedInUsersUsernameJSON = localStorage.getItem("mySiteLoggedInUsersUsername");
    if (loggedInUsersUsernameJSON) {
        const parsedUsername = loggedInUsersUsernameJSON;
        const user = users.find((user) => {
            return user.username === parsedUsername;
        });
        if (user) {
            loggedInUser = user;
        }
    } else {
        loggedInUser = null;
    }
    return loggedInUser;
}

function checkIfUserExistsByUsernameAndPassword(username, password) {
    return users.some((user) => { return user.username === username && user.password === password })
}

function logIn(username) {
    localStorage.setItem("mySiteLoggedInUsersUsername", username);
}

function addUser(username, email, password) {
    users.push({
        username: username,
        email: email,
        password: password,
        tasks: [],
        completedTasks: []
    });
    localStorage.setItem("mySiteUsers", JSON.stringify(users));
}

function addTask(task) {
    const loggedInUser = getLoggedInUser();
    loggedInUser.tasks.push(task);
    updateLoggedInUser();
}

function updateLoggedInUser() {
    const loggedInUser = getLoggedInUser();
    users.splice(users.findIndex((user) => {
        return user.username === loggedInUser.username;
    }), 1, loggedInUser);
    localStorage.setItem("mySiteUsers", JSON.stringify(users));
}

function deleteTask(index, isCompleted) {
    const loggedInUser = getLoggedInUser();
    if (isCompleted) {
        loggedInUser.completedTasks.splice(index, 1)
    } else {
        loggedInUser.tasks.splice(index, 1);
    }
    updateLoggedInUser();
}

function completeTask(task, index) {
    const loggedInUser = getLoggedInUser();
    loggedInUser.tasks.splice(index, 1);
    loggedInUser.completedTasks.push(task);
    updateLoggedInUser();
}
