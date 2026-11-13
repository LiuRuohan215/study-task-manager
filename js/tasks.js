// ===== login part =====
// demo account for this assignment
var correctUsername = "student";
var correctPassword = "study123";

var loginArea = document.getElementById("login-area");
var taskArea = document.getElementById("task-area");
var loginError = document.getElementById("login-error");

document.getElementById("login-btn").addEventListener("click", function () {
    var username = document.getElementById("username").value.trim();
    var password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        loginError.textContent = "Please enter both username and password.";
    } else if (username === correctUsername && password === correctPassword) {
        loginArea.style.display = "none";
        taskArea.style.display = "block";
        renderTasks();
    } else {
        loginError.textContent = "Wrong username or password. Please try again.";
    }
});

// ===== task data =====
// all tasks are kept in this array
var tasks = [];

// -1 means we are adding a new task, otherwise we are editing this index
var editIndex = -1;

var formError = document.getElementById("form-error");
var saveBtn = document.getElementById("save-btn");
var cancelBtn = document.getElementById("cancel-btn");
var formHeading = document.getElementById("form-heading");

// read the form and check the input is valid
function validateForm() {
    var title = document.getElementById("task-title").value.trim();
    var courseCode = document.getElementById("course-code").value.trim();
    var courseName = document.getElementById("course-name").value.trim();
    var dueDate = document.getElementById("due-date").value;
    var description = document.getElementById("task-description").value.trim();

    // required fields must not be empty (notes are optional)
    if (title === "" || courseCode === "" || courseName === "" || dueDate === "" || description === "") {
        return "Please fill in all required fields.";
    }

    // due date cannot be in the past
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var selectedDate = new Date(dueDate + "T00:00:00");
    if (selectedDate < today) {
        return "Due date cannot be in the past. Please choose a valid date.";
    }

    return "";
}

// add button or save button
saveBtn.addEventListener("click", function () {
    var error = validateForm();
    if (error !== "") {
        formError.textContent = error;
        return;
    }
    formError.textContent = "";

    var task = {
        title: document.getElementById("task-title").value.trim(),
        courseCode: document.getElementById("course-code").value.trim(),
        courseName: document.getElementById("course-name").value.trim(),
        dueDate: document.getElementById("due-date").value,
        description: document.getElementById("task-description").value.trim(),
        notes: document.getElementById("task-notes").value.trim()
    };

    if (editIndex === -1) {
        // creating a new task
        tasks.push(task);
    } else {
        // saving changes to an existing task
        tasks[editIndex] = task;
    }

    clearForm();
    renderTasks();
});

// cancel editing and go back to add mode
cancelBtn.addEventListener("click", function () {
    clearForm();
});

// put a task into the form so it can be edited
function startEdit(index) {
    var task = tasks[index];
    document.getElementById("task-title").value = task.title;
    document.getElementById("course-code").value = task.courseCode;
    document.getElementById("course-name").value = task.courseName;
    document.getElementById("due-date").value = task.dueDate;
    document.getElementById("task-description").value = task.description;
    document.getElementById("task-notes").value = task.notes;

    editIndex = index;
    formHeading.textContent = "Edit Task";
    saveBtn.textContent = "Save Changes";
    cancelBtn.style.display = "inline-block";
    formError.textContent = "";
}

// delete a task after asking for confirmation
function deleteTask(index) {
    var confirmed = confirm("Are you sure you want to delete this task?");
    if (confirmed) {
        tasks.splice(index, 1);
        clearForm();
        renderTasks();
    }
}

// empty the form and return to add mode
function clearForm() {
    document.getElementById("task-title").value = "";
    document.getElementById("course-code").value = "";
    document.getElementById("course-name").value = "";
    document.getElementById("due-date").value = "";
    document.getElementById("task-description").value = "";
    document.getElementById("task-notes").value = "";

    editIndex = -1;
    formHeading.textContent = "Add a New Task";
    saveBtn.textContent = "Add Task";
    cancelBtn.style.display = "none";
    formError.textContent = "";
}

// redraw the table from the tasks array
function renderTasks() {
    var taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        var emptyRow = document.createElement("tr");
        var emptyCell = document.createElement("td");
        emptyCell.colSpan = 6;
        emptyCell.textContent = "No tasks yet. Add your first task above.";
        emptyRow.appendChild(emptyCell);
        taskList.appendChild(emptyRow);
        return;
    }

    tasks.forEach(function (task, index) {
        var row = document.createElement("tr");

        var titleCell = document.createElement("td");
        titleCell.textContent = task.title;
        row.appendChild(titleCell);

        var courseCell = document.createElement("td");
        courseCell.textContent = task.courseCode + " " + task.courseName;
        row.appendChild(courseCell);

        var dateCell = document.createElement("td");
        dateCell.textContent = task.dueDate;
        row.appendChild(dateCell);

        var descriptionCell = document.createElement("td");
        descriptionCell.textContent = task.description;
        row.appendChild(descriptionCell);

        var notesCell = document.createElement("td");
        notesCell.textContent = task.notes;
        row.appendChild(notesCell);

        // edit and delete buttons
        var actionCell = document.createElement("td");

        var editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function () {
            startEdit(index);
        });
        actionCell.appendChild(editButton);

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            deleteTask(index);
        });
        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);
        taskList.appendChild(row);
    });
}

// ===== current date and time in the footer =====
function showCurrentTime() {
    var now = new Date();
    document.getElementById("current-time").textContent = "Current date and time: " + now.toLocaleString();
}

showCurrentTime();
setInterval(showCurrentTime, 1000);
