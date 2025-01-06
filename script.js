// select element :
const formElement = document.querySelector('form')
const inputElement = document.querySelector('input')
const ulElement = document.querySelector('ul')
const selectElement = document.querySelector('select')
const modal = document.querySelector('#modal')
const backdrop = document.querySelector('#backdrop')
const modalInput = document.querySelector('.modal-input')
const modalX = document.querySelector('.modal-x')
const modalEdit = document.querySelector('.modal-edit')

// todos
let todos = []
let filterValue = ''

// select filter :
selectElement.addEventListener('change', () => {
    filterValue = selectElement.value
    filterTodos()
})

// create todo :
formElement.addEventListener('submit', e => {
    e.preventDefault()
    if (inputElement.value != false) {
        const newTodo = {
            id: new Date().getTime(),
            value: inputElement.value.trim(),
            isCompleted: false,
            date: new Date().toLocaleDateString('fa')
        }
        todos.push(newTodo)
        filterTodos()
        inputElement.value = null
        inputElement.focus()
    }
})

// append todo to DOM :
function addToDOM(todos) {
    ulElement.innerHTML = null
    todos.forEach(todo => {
        const newLi = document.createElement('li')
        newLi.className = 'w-full bg-white mt-5 flex justify-between items-center h-[50px] px-4 rounded-lg'
        newLi.innerHTML = `<span class="text-slate-700 font-semibold text-lg ${todo.isCompleted && 'line-through opacity-50'}">${todo.value}</span>
    <p class="flex gap-3">
    <span class="text-slate-700 font-semibold text-base mt-[2px]">${todo.date}</span>
    <i data-id="${todo.id}" class="todo-edit bi bi-pencil-square text-xl cursor-pointer text-[#6d28d9]"></i>
    <i data-id="${todo.id}" class="todo-check bi bi-check2-circle text-xl cursor-pointer text-[#6d28d9]"></i>
    <i data-id="${todo.id}" class="todo-remove bi bi-trash3 text-xl cursor-pointer text-[#6d28d9]"></i>
    </p>`
        ulElement.append(newLi)
    })
    const removeBtns = document.querySelectorAll('.todo-remove')
    removeBtns.forEach(btn => btn.addEventListener('click', removeTodo))
    const checkBtns = document.querySelectorAll('.todo-check')
    checkBtns.forEach(btn => btn.addEventListener('click', checkTodo))
    const editBtns = document.querySelectorAll('.todo-edit')
    editBtns.forEach(btn => btn.addEventListener('click', showModalEdit))
}

// filter Todo :
function filterTodos() {
    switch (filterValue) {
        case 'all':
            addToDOM(todos)
            break
        case 'completed':
            const completedTodos = todos.filter(todo => todo.isCompleted)
            addToDOM(completedTodos)
            break
        case 'uncompleted':
            const uncompletedTodos = todos.filter(todo => !todo.isCompleted)
            addToDOM(uncompletedTodos)
            break
        default:
            addToDOM(todos)
            break
    }
}

// remove Todo :
function removeTodo(e) {
    todos = todos.filter(todo => todo.id != e.target.dataset.id)
    filterTodos()
}

// check Todo :
function checkTodo(e) {
    const todo = todos.find(todo => todo.id == e.target.dataset.id)
    todo.isCompleted = !todo.isCompleted
    filterTodos()
}

// edit Todo :
function showModalEdit(e) {
    modal.classList.remove('-top-[100%]')
    modal.classList.add('top-[50%]')
    backdrop.classList.remove('hidden')

    let todo = todos.find(todo => todo.id == e.target.dataset.id)
    modalInput.value = todo.value
    modalInput.focus()

    const saveChanges = () => {
        todo.value = modalInput.value.trim()
        modal.classList.add('-top-[100%]')
        modal.classList.remove('top-[50%]')
        backdrop.classList.add('hidden')
        filterTodos()
        modalEdit.removeEventListener('click', saveChanges)
    }
    
    modalEdit.addEventListener('click', saveChanges)
}

// close Modal :
modalX.addEventListener('click', hideModal)
backdrop.addEventListener('click', hideModal)

function hideModal() {
    modal.classList.add('-top-[100%]')
    modal.classList.remove('top-[50%]')
    backdrop.classList.add('hidden')
}