var plus = document.querySelector(".button"),
    input = document.querySelector("input"),
    tasks = document.querySelector(".tasks"),
    tasksNumber = document.querySelector(".tasksnumber"),
    deleteAll = document.querySelector(".deleteAll"),
    completeAll = document.querySelector(".completeAll"),
    store = document.querySelector(".store"),
    cands = document.querySelector(".clearstore");

let totalTasks = 0,
    completed = 0;

input.focus();

plus.onclick = function () {
    let string = input.value;

    if (string === "") {
        swal({
            title: "Enter Task",
            text: "Please!",
            icon: "success",
            button: "Aww yiss!",
        });
    } else {
        let notask = document.querySelector(".no-task");

        if (document.body.contains(document.querySelector(".no-task"))) {
            notask.remove();
        }

        let spanContainer = document.createElement("span");
        spanContainer.classList.add("try");

        let toDo = document.createElement("span");

        toDo.innerText = `${string}`;

        toDo.classList.add("text");

        let btn = document.createElement("span");
        btn.innerText = `Delete`;
        btn.classList.add("deleteButton");

        spanContainer.appendChild(toDo);
        spanContainer.appendChild(btn);
        tasks.appendChild(spanContainer);

        input.value = "";

        checkDoubleTasks(string);

        countTasks();

        input.focus();
    }
};

function checkDoubleTasks(string) {
    var texts = Array.from(document.querySelectorAll(".text"));

    if (document.body.contains(document.querySelector(".text"))) {
        var filt = texts.filter((block) => block.innerText === string);

        if (filt.length > 1) {
            filt[1].parentElement.remove();

            swal({
                title: "Don't Enter Same Tasks",
                text: "Please!",
                icon: "success",
                button: "Aww yiss!",
            });
        }
    }
}

document.addEventListener("click", function (e) {
    // Delete Task
    if (e.target.className == "deleteButton") {
        // Remove Current Task
        e.target.parentNode.remove();

        countTasks();

        if (totalTasks == 0) {
            createNoTasks();
        }
    }

    if (e.target.className == "try") {
        e.target.children[0].classList.toggle("finished");

        countTasks();
    }
});

function createNoTasks() {
    let noTaskspan = document.createElement("span");
    noTaskspan.classList.add("no-task");

    let noTaskText = document.createElement("span");
    noTaskText.innerText = `No Tasks To Show`;

    noTaskspan.appendChild(noTaskText);
    tasks.appendChild(noTaskspan);
}

let complete = document.querySelector(".complete");

function countTasks() {
    complete.innerText = document.querySelectorAll(".finished").length;

    tasksNumber.innerText = document.querySelectorAll(".text").length;
}

function deleteTasks() {
    var alltext = Array.from(document.querySelectorAll(".try"));

    if (document.body.contains(document.querySelector(".try"))) {
        alltext.forEach((block) => block.remove());

        createNoTasks();

        countTasks();
    }
}

deleteAll.onclick = deleteTasks;

completeAll.onclick = function () {
    var alltext = Array.from(document.querySelectorAll(".text"));

    if (document.body.contains(document.querySelector(".text"))) {
        alltext.forEach((block) => block.classList.add("finished"));

        countTasks();

        swal({
            title: "You Are Amazing",
            text: "I'm Waiting For You To Complete Another Tasks",
            icon: "success",
            button: "Aww yiss!",
        });
    }
};
var num = 1;

function storeData() {
    let t = document.querySelectorAll(".text");

    if (document.body.contains(document.querySelector(".text"))) {
        t.forEach((element) => {
            localStorage.setItem(`Task${num}`, `${element.innerText}`);
            num++;
        });
    }
}

store.onclick = storeData;

var keysort = [];

function restoreData() {
    // Restore Data
    let notask = document.querySelector(".no-task");

    if (document.body.contains(document.querySelector(".no-task"))) {
        notask.remove();
    }
    for (let i = 0; i < localStorage.length; i++) {
        let spanContainer = document.createElement("span");
        spanContainer.classList.add("try");

        let toDo = document.createElement("span");

        for (let j = 0; j < localStorage.length; j++) {
            keysort[j] = localStorage.key(j);
            keysort.sort();
        }

        toDo.innerText = `${localStorage.getItem(keysort[i])}`;

        toDo.classList.add("text");

        let btn = document.createElement("span");
        btn.innerText = `Delete`;
        btn.classList.add("deleteButton");

        spanContainer.appendChild(toDo);
        spanContainer.appendChild(btn);
        tasks.appendChild(spanContainer);
    }
    countTasks();
}

window.onload = function () {
    if (localStorage.length != 0) {
        restoreData();
    }
};

cands.onclick = function () {
    localStorage.clear();

    deleteTasks();

    input.focus();
};
