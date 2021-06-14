let calcBtn = document.querySelector('.todo__calc-btn');

calcBtn.addEventListener('click', () => {
    let flipper = document.querySelector('.flipper');
    flipper.classList.add('flip');
});


let addTaskBtn = document.querySelector('.todo__add-btn');


addTaskBtn.addEventListener('click', () => {
    let todoAddText = document.getElementById('todo_add_text');

    if (todoAddText.value == '') {
        alert('Enter text...');
        return;
    }

    let task = document.createElement('div');
    task.classList.add('todo__task');

    let topBlock = document.createElement('div');
    topBlock.classList.add('todo__top-block');

    let taskDateTime = document.createElement('div');
    taskDateTime.classList.add('todo__date');
    taskDateTime.innerHTML = getCurrentTime();

    let taskBtnBlock = document.createElement('div');
    taskBtnBlock.classList.add('todo__btns');

    let taskBtns = [];

    for (let i = 0; i < 3; i++) {
        taskBtns.push(document.createElement('div'));
    }

    taskBtns[0].classList.add('todo__done-btn');
    taskBtns[1].classList.add('todo__edit-btn');
    taskBtns[2].classList.add('todo__del-btn');
    taskBtns[0].innerHTML = 'Done';
    taskBtns[1].innerHTML = 'Edit';
    taskBtns[2].innerHTML = 'Delete';

    let taskText = document.createElement('div');
    taskText.classList.add('todo__task-text');
    taskText.innerHTML = todoAddText.value;
    todoAddText.value = '';

    taskBtns.forEach(btn => taskBtnBlock.append(btn));
    topBlock.append(taskDateTime);
    topBlock.append(taskBtnBlock);

    task.append(topBlock);

    task.append(taskText);

    let todo = document.querySelector('.todo__tasks');
    todo.prepend(task);


    taskBtns[0].addEventListener('click', doneTask);
    taskBtns[1].addEventListener('click', editTask);
    taskBtns[2].addEventListener('click', deleteTask);

});


function doneTask(event) {
    let task = event.path[3];
    let taskText = task.querySelector('.todo__task-text');

    taskText.classList.add('done-text');

    let doneBtn = event.path[1].querySelector('.todo__done-btn');
    let editBtn = event.path[1].querySelector('.todo__edit-btn');
    let deleteBtn = event.path[1].querySelector('.todo__del-btn');

    doneBtn.textContent = 'Cancel';
    doneBtn.classList.add('cancel');
    doneBtn.removeEventListener('click', doneTask);
    doneBtn.addEventListener('click', cancelDoneTask);

    task.classList.add('done');
    editBtn.classList.add('disable');
    editBtn.removeEventListener('click', editTask);
}

function cancelDoneTask(event) {
    let task = event.path[3];
    task.classList.remove('done');

    let taskText = task.querySelector('.todo__task-text');
    taskText.classList.remove('done-text');

    let doneBtn = event.path[1].querySelector('.todo__done-btn');
    let editBtn = event.path[1].querySelector('.todo__edit-btn');
    let deleteBtn = event.path[1].querySelector('.todo__del-btn');

    doneBtn.textContent = 'Done';
    doneBtn.classList.remove('cancel');
    doneBtn.removeEventListener('click', cancelDoneTask);
    doneBtn.addEventListener('click', doneTask);

    editBtn.classList.remove('disable');
    editBtn.addEventListener('click', editTask);
}

function editTask(event) {
    let task = event.path[3];
    let taskText = task.querySelector('.todo__task-text');

    let doneBtn = task.querySelector('.todo__done-btn');
    let editBtn = task.querySelector('.todo__edit-btn');
    let deleteBtn = task.querySelector('.todo__del-btn');

    doneBtn.classList.add('disable');
    doneBtn.removeEventListener("click", doneTask);

    editBtn.innerHTML = 'Save';
    editBtn.classList.add('cancel');
    editBtn.removeEventListener('click', editBtn);
    editBtn.addEventListener('click', saveTask);

    deleteBtn.classList.add('disable');
    deleteBtn.removeEventListener("click", deleteTask);

    taskText.setAttribute('contenteditable', true);
}

function saveTask(event) {
    let task = event.path[3];
    let taskText = task.querySelector('.todo__task-text');

    let doneBtn = task.querySelector('.todo__done-btn');
    let editBtn = task.querySelector('.todo__edit-btn');
    let deleteBtn = task.querySelector('.todo__del-btn');

    doneBtn.classList.remove('disable');
    doneBtn.addEventListener("click", doneTask);

    editBtn.innerHTML = 'Edit';
    editBtn.classList.remove('cancel');
    editBtn.removeEventListener('click', saveTask);
    editBtn.addEventListener('click', editTask);

    deleteBtn.classList.remove('disable');
    deleteBtn.addEventListener("click", deleteTask);

    taskText.removeAttribute('contenteditable');
}

function deleteTask(event) {
    let task = event.path[3];
    task.remove();
}

function getCurrentTime() {
    let date = new Date();
    let currDate = `${date.getDate()}.${(date.getMonth()<10) ? '0'+(date.getMonth()+1):date.getMonth()+1}.${date.getFullYear()} 
    ${(date.getHours()<10)? (date.getHours() == 0)? '0'+ (date.getHours()): '0' + (date.getHours()-1):(date.getHours()-1)}:${(date.getMinutes()<10)? '0' + date.getMinutes():date.getMinutes()}:${(date.getSeconds()<10) ? '0' + date.getSeconds(): date.getSeconds()}`;
    return currDate;
}