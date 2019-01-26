const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners
loadEventListeners();

function loadEventListeners() {

  // add task event
  form.addEventListener('submit', addTask);
  // remove tast event
  taskList.addEventListener('click',removeTask);
  // clear all Tasks
  clearBtn.addEventListener('click', clearTasks);
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
//Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')){
      if(confirm('Are U sure?')){
        e.target.parentElement.parentElement.remove();
      }
  }
}
//Clear tasks
function clearTasks() {
  // one way to clear all
  //    taskList.innerHTML = '';
  // faster one
    while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
    }
}
