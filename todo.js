const toDoForm = document.querySelector(".js-toDoForm"), toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    toDoDone = document.querySelector(".js-toDoDone");
    

const TODO_LS = "toDos";
const DONE_LS = "toDoDone";

function filterFn(toDo) {
    return toDo.id === 1;
}

function filterFn(toDoDone) {
    return toDoDone.id === 1;
}

let toDos = [];

function saveToDo(){
    localStorage.setItem(TODO_LS, JSON.stringify(toDos));
    localStorage.setItem(DONE_LS, JSON.stringify(toDoDone));
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;

    toDoList.removeChild(li);

    const cleanTodos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanTodos;
    saveToDo();
}

    function paintToDo(text) {
    const li = document.createElement("li");
    const doneBtn = document.createElement("input");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    
    doneBtn.setAttribute("type", "checkbox");
    // doneBtn.innerText = "Done";
    delBtn.innerText = "𐄂";
    delBtn.addEventListener("click", deleteToDo)
    span.innerText = text;

    toDoList.appendChild(li);
    li.appendChild(doneBtn);
    li.appendChild(span);
    li.appendChild(delBtn);
    
    
    function handleDoneClick() {
        if (doneBtn.checked === true) {
            span.style.setProperty('text-decoration', 'line-through');
            toDoList.appendChild(li);

        } else {
            span.style.removeProperty('text-decoration', 'line-through');
        }
    }   
    doneBtn.addEventListener("click", handleDoneClick);

    li.id = newId;
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDo();
}

function doneToDo(text) {
    li.id = newIdDone;

    const toDoDoneObj = {
        text: text,
        id: newIdDone
    };

    toDoDone.push(toDoDoneObj);
    saveToDoDone();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDo(){
    const loadToDo = localStorage.getItem(TODO_LS), moveToDo = localStorage.getItem(DONE_LS);
    if(loadToDo !== null) {
        const parsedToDos = JSON.parse(loadToDo);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    } else if (moveToDo !== null) {
        const parsedToDoDones = JSON.parse(moveToDo);
        parsedToDoDones.forEach(function(toDoDone) {
            doneToDo(toDoDone.text);
        });
    }
}

function init() {
    loadToDo();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();