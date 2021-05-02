const toDoForm = document.querySelector(".js-toDoForm"), toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    toDoDone = document.querySelector(".js-toDoDone");
    

const TODO_LS = "toDos";

// function filterFn(toDo) {
//     return toDo.id === 1;
// }

let toDos = [];

function saveToDo(){
    localStorage.setItem(TODO_LS, JSON.stringify(toDos));
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
    delBtn.innerText = "𐄂";
    delBtn.addEventListener("click", deleteToDo)
    span.innerText = text;

    toDoList.append(li);
    li.appendChild(doneBtn);
    li.appendChild(span);
    li.appendChild(delBtn);
    
    

    li.id = newId;
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDo();

    function handleDoneClick() {
        if (doneBtn.checked === true) {
            span.classList.add('checked');
            toDoList.appendChild(li);
        }
    }

    doneBtn.addEventListener("click", handleDoneClick);   
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDo(){
    const loadToDo = localStorage.getItem(TODO_LS)
    if(loadToDo !== null) {
        const parsedToDos = JSON.parse(loadToDo);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    }   
}

function init() {
    loadToDo();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();
