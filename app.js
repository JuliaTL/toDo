const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners
loadEventListeners();

function loadEventListeners() {
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task event
  form.addEventListener('submit', addTask);
  // remove tast event
  taskList.addEventListener('click',removeTask);
  // clear all Tasks
  clearBtn.addEventListener('click', clearTasks);
  // filter tasks event
  filter.addEventListener('keyup',filterTasks);

}

//Add tasks
function addTask(e) {
  if(taskInput.value === ''){
    alert('add a task');
  }
// create li elements
const li = document.createElement('li');
// add class
li.className = 'collection-item';
// create text node and append to li
li.appendChild(document.createTextNode(taskInput.value));
//create new link element
const link = document.createElement('a');
// add class
link.className = 'delete-item secondary-content';
// add icon html
link.innerHTML = '<i class="fa fa-remove"></i>';
// append link to li
li.appendChild(link);
// append li to ul
taskList.appendChild(li);
//clear input
taskInput.value = '';

  e.preventDefault();
}

// store in local storage
storeTaskInLocalStorage(taskInput.value);
// Get tasks from Local localStorage
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task) {
    // create li elements
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append link to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);

  });
}


// Store Task
function storeTaskInLocalStorage() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')){
      if(confirm('Are U sure?')){
        e.target.parentElement.parentElement.remove();

        // Remove from Local storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
      }
  }
}
// Remove from LocalStorage
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
if(taskItem.textContent === task){
    tasks.splice(index, 1);
}
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
//Clear tasks
function clearTasks() {
  // one way to clear all
  //    taskList.innerHTML = '';
  // faster one
    while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
    }
    //cclear Tasks from LocalStorage
  clearTasksFromLocalStorage();
}
// clear tasks from LocalStorage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
    } else {
        task.style.display = 'none';
    }
  });
}
