getData();

const container = document.querySelector("#container");
const descriptionInput = document.querySelector("#description");
const idInput = document.querySelector("#id");
const newDescriptionInput = document.querySelector("#new-description");
const addBtn = document.querySelector("#add-btn");
const updBtn = document.querySelector("#upd-btn");
const delBtn = document.querySelector("#del-btn");
const showAllBtn = document.querySelector("#showall-btn");
const showById = document.querySelector("#showid-btn");



  function getData()
{
    fetch("https://localhost:7020/api/Todos")
    .then((res) => res.json())
    .then(displayData)
    .catch((err) => console.log(err));
    
}


document.addEventListener("DOMContentLoaded", function() {
    addBtn.addEventListener("click", addToDo);
    updBtn.addEventListener("click", updateToDo);
    delBtn.addEventListener("click", deleteToDoById);
    showById.addEventListener('click', getById);
    showAllBtn.addEventListener("click", getData);
  });




function displayData(data)
{
    const container = document.querySelector("#container");
    container.innerHTML = "";

    data.forEach((d) => {

        const element = `<h1>${d.id}, ${d.description}</h1>`;

        container.innerHTML += element;

    });

    descriptionInput.value = '';
}


function getById() {
  clearUiFromTodos();

  const todoId = idInput.value;
  const container = document.querySelector('#container');

  fetch(`https://localhost:7020/api/Todos/${todoId}`)
    .then((res) => res.json())
    .then((data) => {
      container.innerHTML = `<h1>${data.id}, ${data.description}</h1>`;
    });
}

function clearUiFromTodos() {
  const container = document.querySelector('#container');
  container.innerHTML = '';
}


function addToDo(e) {
    const newTodo = {
      description: descriptionInput.value,
    };
  
    fetch("https://localhost:7020/api/Todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((res) => getData())
      .catch((err) => console.log(err));

  }

  function updateToDo() {

    const idToUpdate = idInput.value
    const updatedTodo = {
      description: newDescriptionInput.value,
    };
  
    fetch(`https://localhost:7020/api/Todos/${idToUpdate}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    })
      .then((res) => getData())
      .catch((err) => console.log(err));
  }


  function deleteToDoById(e) {

    const idToDelete = idInput.value
    fetch(`https://localhost:7020/api/Todos/${idToDelete}`, {
      method: "DELETE",
    })
      .then((res) => getData())
      .catch((err) => console.log(err));
      idInput.value = '';
  }


  







  