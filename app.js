//Define Vars
const form=document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const filter=document.querySelector('#filter');
const clearBtn=document.querySelector('.clear-tasks');
const taskInput=document.querySelector('#task');

//Load all event listeners
loadAllEventListeners();

function loadAllEventListeners(){
    //DOM load event
    document.addEventListener('DOMContentLoaded',getTasks);
    //Add task
    form.addEventListener('submit',addTask);
    //Remove task
    taskList.addEventListener('click',removeTask);
    //Clear task
    clearBtn.addEventListener('click',clearTask);
    //filterTask
    filter.addEventListener('keyup',filterTask);
}

//Get tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
         //Create li element
        const li=document.createElement('li');
        li.className='collection-item';
        li.appendChild(document.createTextNode(task));
        const link=document.createElement('a');
        link.className='delete-item secondary-content';
        link.innerHTML='<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    });
}

//Add Task
function addTask(e){
    if(taskInput.value === '') {
        alert('Add a task');
    }
    //Create li element
    const li=document.createElement('li');
    li.className='collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link=document.createElement('a');
    link.className='delete-item secondary-content';
    link.innerHTML='<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
    //Stor in LS
    storTaskInLocalStorege(taskInput.value);
    //Clear the input
    taskInputv.value='';

    e.preventDefault();
}

//Store Task
function storTaskInLocalStorege(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove();
            //Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Remove from LS{
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(taskItem.textContent===task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
//Clear all task
function clearTask(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    //Clear from LS
    clearTasksFromLocalStorage();
}
//Clear from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}
//Filer task
function filterTask(e){
    const text=e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item=task.firstChild.textContent;
        if(item.toLocaleLowerCase().indexOf(text)!=-1){
            task.style.display='block';
        }
        else{
            task.style.display='none';
        }
    });
}

