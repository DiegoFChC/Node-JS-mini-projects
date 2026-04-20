import { state } from './state.js'
import {
  createTask,
  getTasks,
  getTask,
  editTask,
  deleteTask,
  toggleTaskState,
} from './api.js'
import { renderTasks, renderPagination, showModal, hideModal } from './ui.js'
import { getPageFromURL, updateURL } from './router.js'
import { saveLocalItem, deleteLocalItem, getLocalItem } from './store.js'

const taskListContainer = document.getElementById('task-list')
const paginationContainer = document.getElementById('pagination')
const btnCreateTask = document.getElementById('btn-new-task')
const createTaskModal = document.querySelector('.task-modal.create')
const editTaskModal = document.querySelector('.task-modal.edit')
const btnCloseCreateModal = document.querySelector('.btn-close-modal.create')
const btnCloseEditModal = document.querySelector('.btn-close-modal.edit')
const formCreateTask = document.getElementById('create-task')
const formEditTask = document.getElementById('edit-task')

state.currentPage = getPageFromURL()
btnCreateTask.onclick = () => showModal(createTaskModal)
createTaskModal.addEventListener('click', (e) => {
  if (e.target === createTaskModal) {
    hideModal(createTaskModal)
    formCreateTask.reset()
  }
})
btnCloseCreateModal.onclick = () => {
  hideModal(createTaskModal)
  formCreateTask.reset()
}
editTaskModal.addEventListener('click', (e) => {
  if (e.target === editTaskModal) {
    hideModal(editTaskModal)
    formEditTask.reset()
    deleteLocalItem('taskId')
  }
})
btnCloseEditModal.onclick = () => {
  hideModal(editTaskModal)
  formEditTask.reset()
  deleteLocalItem('taskId')
}
formCreateTask.addEventListener('submit', handleSubmit)
formEditTask.addEventListener('submit', handleEditTask)

async function handleSubmit(e) {
  e.preventDefault()

  try {
    const data = new FormData(e.target)
    const title = data.get('title')
    const description = data.get('description')
    await createTask(title, description)
    state.currentPage = 1
    updateURL(1)
  } catch (error) {
    console.log('error', error)
  } finally {
    console.log('fin')
  }
}

async function handleOpenTask(id) {
  const { id: taskId, title, description } = await getTask(id)

  formEditTask['title'].value = title
  formEditTask['description'].value = description

  showModal(editTaskModal)
  saveLocalItem('taskId', taskId)
}

async function handleEditTask(e) {
  e.preventDefault()

  try {
    const data = new FormData(e.target)
    const title = data.get('title')
    const description = data.get('description')
    const id = getLocalItem('taskId')

    if (!id) throw new Error('Id not found')
    await editTask(id, title, description)
  } catch (error) {
    console.log('error', error)
  } finally {
    console.log('fin')
    deleteLocalItem('taskId')
  }
}

async function handleToggleState(id) {
  try {
    await toggleTaskState(id)
  } catch (error) {
    console.log('error', error)
  } finally {
    console.log('fin')
  }
}

async function handleDeleteTask(id) {
  try {
    await deleteTask(id)
  } catch (error) {
    console.log('error', error)
  } finally {
    console.log('fin')
  }
}

async function loadTasks() {
  taskListContainer.innerHTML = '<li>Loading...</li>'
  paginationContainer.innerHTML = ''

  try {
    const { tasks, totalPages } = await getTasks(state.currentPage, state.limit)

    state.totalPages = totalPages

    renderTasks(
      taskListContainer,
      tasks,
      handleOpenTask,
      handleToggleState,
      handleDeleteTask,
    )
    renderPagination(paginationContainer, state, handlePageChange)
  } catch (error) {
    taskListContainer.innerHTML = '<li>Error loading tasks</li>'
    console.error(error)
  }
}

function handlePageChange(page) {
  state.currentPage = page
  updateURL(page)
  loadTasks()
}

loadTasks()
