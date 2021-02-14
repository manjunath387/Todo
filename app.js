//selector
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')
const note = document.getElementById('note')

note.addEventListener('click', warn)
function warn() {
  alert('DELET THE COMPLETED TASK BEFORE LEAVING THE APP')
}
//event listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCkeck)
filterOption.addEventListener('click', filterTodo)
//functions
function addTodo(event) {
  event.preventDefault()

  //todiv
  const todoDiv = document.createElement('div')
  todoDiv.classList.add('todo')
  //create li
  const newTodo = document.createElement('li')
  newTodo.innerText = todoInput.value
  newTodo.classList.add('todo-item')
  todoDiv.appendChild(newTodo)
  //add todo to localstorage
  saveLocalTodos(todoInput.value)
  //complete mark button
  const completedButton = document.createElement('button')
  completedButton.innerHTML = '<i class="fas fa-check"></i>'
  completedButton.classList.add('complete-btn')
  todoDiv.appendChild(completedButton)
  //trash button
  const trashButton = document.createElement('button')
  trashButton.innerHTML = '<i class="fas fa-trash"></i>'
  trashButton.classList.add('trash-btn')
  todoDiv.appendChild(trashButton)
  //addind to todo list
  todoList.appendChild(todoDiv)

  //clear todo input value

  todoInput.value = ''
}

function deleteCkeck(e) {
  const item = e.target
  //delete todo
  if (item.classList[0] == 'trash-btn') {
    const todo = item.parentElement
    todo.classList.add('fall')
    removeLocalTodos(todo)
    todo.addEventListener('transitionend', function () {
      todo.remove()
    })
  }

  if (item.classList[0] == 'complete-btn') {
    const todo = item.parentElement
    todo.classList.toggle('completed')
  }
}

//fiters

function filterTodo(e) {
  const todos = todoList.childNodes
  console.log(todos)
  todos.forEach((todo) => {
    if (todo.classList !== undefined) {
      switch (e.target.value) {
        case 'all':
          todo.style.display = 'flex'
          break
        case 'completed':
          if (todo.classList.contains('completed')) {
            todo.style.display = 'flex'
          } else {
            todo.style.display = 'none'
          }
          break
        case 'uncompleted':
          if (!todo.classList.contains('completed')) {
            todo.style.display = 'flex'
          } else {
            todo.style.display = 'none'
          }
          break

        default:
          break
      }
    }
    return
  })
}

function saveLocalTodos(todo) {
  //check already existed items

  let todos
  if (localStorage.getItem('todos') == null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
  let todos
  if (localStorage.getItem('todos') == null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.forEach(function (todo) {
    //todiv
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    //create li
    const newTodo = document.createElement('li')
    newTodo.innerText = todo
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    //complete mark button
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)
    //trash button
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)
    //addind to todo list
    todoList.appendChild(todoDiv)
  })
}

function removeLocalTodos(todo) {
  let todos
  if (localStorage.getItem('todos') == null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  const todoIndex = todo.children[0].innerText
  todos.splice(todos.indexOf(todoIndex), 1)
  localStorage.setItem('todos', JSON.stringify(todos))
}
