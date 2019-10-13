//ui variables

const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.list-group');
const clearBtn = document.querySelector('.clear-tasks');


//form event listener
form.addEventListener('submit', function(e) {
    //validate input field

    if (taskInput.value === "") {
        alert('Add Task');
    } else {

        //create li element

        const li = document.createElement('li');

        li.className = "list-group-item";

        //create text node
        li.appendChild(document.createTextNode(taskInput.value));

        //create link
        const link = document.createElement('a');

        link.innerHTML = "<span class='close'>&times;</span>";

        link.className = "delete-item";

        //append llink to li
        li.appendChild(link);

        //append li to ul
        taskList.appendChild(li);

        addLocalStorage(taskInput.value);

        taskInput.value = '';
        e.preventDefault();
    }



});

//add to local storage

function addLocalStorage(task) {

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove/ delete li

taskList.addEventListener('click', function(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
    }

});

//delete whole ul using clear task button

clearBtn.addEventListener('click', function() {
    // taskList.innerHTML = ""; //method 1
    // method 2 below. loop hrough each item and delete

    while (taskList.firstElementChild) {
        taskList.removeChild(taskList.firstElementChild); //means if it is  the uls first child then remove from the ul the first child 
    }
});


//filter through a task
filter.addEventListener('keyup', function(e) {
    const filterInput = e.target.value.toLowerCase();// whatever is being entered to filter innput field converted to lowercase
    //loop through each list group item and check if text content of a single list in group matches value entered in th filter input field
    document.querySelectorAll('.list-group-item').forEach(function(listGroupItem) {
        const oneListGroupItem = listGroupItem.firstChild.textContent;
        if (oneListGroupItem.toLowerCase().indexOf(filterInput) != -1) { //-1 means not a match
            listGroupItem.style.display = "block"; //display if their is a match

        } else {

            listGroupItem.style.display = "none";// dont display if no match
        }
    });
});
// //load event listners

// loadAllEventListeners();


// function loadAllEventListeners() {
//     form.addEventListener("submit", addTask);
// }

// //Add task
// //Check if input field is empty
// function addTask(e) {
//     if (taskInput.value === '') {
//         alert("Add a task");
//     }

//     //create li element

//     const li = document.createElement('li');

//     li.className = "collection-item";

//     //create text node
//     li.appendChild(document.createTextNode(taskInput.value));

//     //create link
//     const link = document.createElement('a');

//     // link.innerHTML = "<i class='fa fa-times' aria-hidden='true'></i>";

//     link.className = "list-group-item";

//     //append llink to li
//     li.appendChild(link);

//     //append li to ul
//     taskList.appendChild(li);

//     e.preventDefault();

// }