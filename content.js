debugger;
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
  

const toDoList = document.querySelector("#toDoList");

window.addEventListener('load', WindowLoad, false);
function WindowLoad() {
    const loggedInUser = getLoggedInUser();
    document.querySelector("#loggedInUser").textContent = `${loggedInUser.username}`;
    for (var i = 0; i < loggedInUser.tasks.length; i++) {
        creatingHTMLForTasks(loggedInUser.tasks[i], false, i);
    }
    for (var i = 0; i < loggedInUser.completedTasks.length; i++) {
        creatingHTMLForTasks(loggedInUser.completedTasks[i], true, i);
    }
}



const btnAddTask = document.querySelector(".material-symbols-outlined");
btnAddTask.addEventListener('click', function(event) {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    if (taskInput.value === "") {
        return;
    }
    addingTaskToListFirstTime(taskInput.value, false);
    taskInput.value = '';
});

function creatingHTMLForTasks(task, isCompleted, index) {
    const UniqueID = `${index}${isCompleted}`;
    const completedTaskBtn = document.createElement("span");
    completedTaskBtn.classList.add("material-symbols-outlined");
    completedTaskBtn.textContent = "done";
    const deleteTaskBtn = document.createElement("span");
    deleteTaskBtn.classList.add("material-symbols-outlined");
    deleteTaskBtn.textContent = "delete";
    let HTML = `<div class="listItem" id=${UniqueID}><p id="${UniqueID}">${task}</p></div>`;
    toDoList.insertAdjacentHTML("beforeend", HTML);
    toDoList.lastChild.appendChild(completedTaskBtn);
    toDoList.lastChild.appendChild(deleteTaskBtn);
    completedTaskBtn.addEventListener("click", function () {
        handleCompletedTask(task, index);
    });
    deleteTaskBtn.addEventListener("click", function () {
        handleDeleteTask(index, isCompleted);
    });
    if (isCompleted) {
        handleCompletedTask(task, index, isCompleted);
    }
}


function addingTaskToListFirstTime(task, isCompleted) {
    addTask(task);
    const index = getLoggedInUser().tasks.length - 1;
    creatingHTMLForTasks(task, isCompleted, index);
}

function handleCompletedTask(task, index, isCompletedAlready) {
    if (isCompletedAlready) {
        document.getElementById(`${index}${isCompletedAlready}`).style.textDecoration = "line-through";
    } else {
        completeTask(task, index);
        document.getElementById(`${index}false`).style.textDecoration = "line-through";
    }
}

function handleDeleteTask(index, isCompleted) {
    console.log(`${index}${isCompleted}`);
    document.getElementById(`${index}${isCompleted}`).remove();
    deleteTask(index, isCompleted);
}

joke();

fetch('https://v2.jokeapi.dev/joke/Any?safe-mode')
    .then((response) => response.json())
    .then((data) => jokeDisplay(data));


function jokeDisplay(joke) {
    let HTML;
    if (joke.type === "twopart") {
        HTML = joke.setup;
        HTML += `<br><b>${joke.delivery}</b>`;
    } else {
        HTML = joke.joke;
    }
    document.querySelector("#jokeText").innerHTML = HTML;
}

function joke() {
    fetch('https://v2.jokeapi.dev/joke/Any?safe-mode')
        .then((response) => response.json())
        .then((data) => jokeDisplay(data));
}

const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const nameOfMonthUS = new Date().toLocaleString(
    'en-US', { month: 'long' }
);
const currentMonth = new Date().getMonth();


const monthFacts = [
    "January is named after Janus, the god of beginnings and transitions in Roman mythology.",
    "Having only 28 days in common years, February is the only month of the year that can pass without a single full moon.",
    "It was named after Mars, the Roman god of war, and an ancestor of the Roman people through his sons Romulus and Remus.",
    "The traditional etymology is from the verb aperire, 'to open', in allusion to its being the season when trees and flowers begin to 'open'.",
    "May was named for the Greek Goddess Maia, who was identified with the Roman era goddess of fertility, Bona Dea, whose festival was held in May.",
    "The month is named after the Roman goddess Juno, the goddess of marriage and the wife of the supreme deity Jupiter.",
    "It is on average the warmest month in most of the Northern Hemisphere, where it is the second month of summer, and the coldest month in much of the Southern Hemisphere, where it is the second month of winter.",
    "In 8 BC, it was renamed in honor of Emperor Augustus. According to a Senatus consultum quoted by Macrobius, he chose this month because it was the time of several of his great triumphs, including the conquest of Egypt.",
    "September comes from the Latin word septem, meaning 'seven', because it was the seventh month of the early Roman calendar.",
    "The name for this month comes from the Roman word for 'eighth' - octavus - as it was the eighth month of the Roman year.",
    "It takes its name from the Latin word for the number nine.",
    "December got its name from the Latin word decem (meaning ten) because it was originally the tenth month of the year in the calendar of Romulus c. 750 BC which began in March."
]

document.querySelector("#monthImg").style.backgroundImage = `url(img/${months[currentMonth]}.jpg)`;
document.querySelector("#monthText").textContent = `${months[currentMonth]}`;
document.querySelector("#monthFact").textContent = `${monthFacts[currentMonth]}`;


function handleLogout() {
    debugger;
    localStorage.setItem("mySiteLoggedInUsersUsername", null)
    location.reload();
}