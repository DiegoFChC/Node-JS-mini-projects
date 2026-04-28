const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const editIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" area-label="Edit task" class="blue" id="edit" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"/></svg>'

const deleteIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" area-label="Delete task" class="red" id="delete" width="1em" height="1em" viewBox="0 0 26 26"><path fill="currentColor" d="M11.5-.031c-1.958 0-3.531 1.627-3.531 3.594V4H4c-.551 0-1 .449-1 1v1H2v2h2v15c0 1.645 1.355 3 3 3h12c1.645 0 3-1.355 3-3V8h2V6h-1V5c0-.551-.449-1-1-1h-3.969v-.438c0-1.966-1.573-3.593-3.531-3.593zm0 2.062h3c.804 0 1.469.656 1.469 1.531V4H10.03v-.438c0-.875.665-1.53 1.469-1.53zM6 8h5.125c.124.013.247.031.375.031h3c.128 0 .25-.018.375-.031H20v15c0 .563-.437 1-1 1H7c-.563 0-1-.437-1-1zm2 2v12h2V10zm4 0v12h2V10zm4 0v12h2V10z"/></svg>'

const checkIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" area-label="Change task to complete" class="green" id="check" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M9.995 0C4.475 0 0 4.475 0 9.995s4.475 9.996 9.995 9.996s9.996-4.475 9.996-9.996C19.99 4.475 15.516 0 9.995 0M2 9.995a7.995 7.995 0 1 1 15.99 0a7.995 7.995 0 0 1-15.99 0m12.207-3.202a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.793-3.793a1 1 0 0 1 1.414 0"/></svg>'

const rejectIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" area-label="Change task to in progress" class="red" id="reject" width="1em" height="1em" viewBox="0 0 28 28"><path fill="currentColor" d="M18.28 9.72a.75.75 0 0 1 0 1.06L15.06 14l3.22 3.22a.75.75 0 1 1-1.06 1.06L14 15.06l-3.22 3.22a.75.75 0 1 1-1.06-1.06L12.94 14l-3.22-3.22a.75.75 0 1 1 1.06-1.06L14 12.94l3.22-3.22a.75.75 0 0 1 1.06 0M26 14c0-6.627-5.373-12-12-12S2 7.373 2 14s5.373 12 12 12s12-5.373 12-12M3.5 14C3.5 8.201 8.201 3.5 14 3.5S24.5 8.201 24.5 14S19.799 24.5 14 24.5S3.5 19.799 3.5 14"/></svg>'

function createIconButton(iconHTML, onClick) {
  const button = document.createElement('button')
  button.innerHTML = iconHTML
  button.addEventListener('click', (e) => {
    e.stopPropagation()
    onClick()
  })

  return button
}

function createTaskElement(task, { onEdit, onToggleState, onDelete }) {
  const { title, description, id, isActive } = task

  const li = document.createElement('li')
  li.classList.add('card')

  const h2 = document.createElement('h2')
  h2.textContent = title

  const p = document.createElement('p')
  p.textContent = description

  const span = document.createElement('span')
  span.textContent = isActive ? 'En progreso' : 'Completada'
  span.classList.add(isActive ? 'active' : 'inactive')

  const actions = document.createElement('div')
  actions.classList.add('actions')

  const editBtn = createIconButton(editIcon, () => onEdit(id))
  const toggleBtn = createIconButton(
    isActive ? checkIcon : rejectIcon,
    () => onToggleState(id)
  )
  const deleteBtn = createIconButton(deleteIcon, () => onDelete(id))

  actions.append(editBtn, toggleBtn, deleteBtn)
  li.append(h2, p, span, actions)
  li.addEventListener('click', () => onEdit(id))

  return li
}

export async function renderTasks(
  container,
  tasks,
  onEdit,
  onToggleState,
  onDelete
) {
  container.innerHTML = ''

  for (const task of tasks) {
    const taskElement = createTaskElement(task, {
      onEdit,
      onToggleState,
      onDelete,
    })

    container.appendChild(taskElement)

    await sleep(100)
  }
}

export function renderPagination(paginationContainer, state, onPageChange) {
  const { currentPage, totalPages } = state

  paginationContainer.innerHTML = ''

  const prev = document.createElement('button')
  prev.textContent = '←'
  prev.disabled = currentPage === 1
  prev.onclick = () => onPageChange(state.currentPage - 1)

  paginationContainer.appendChild(prev)

  const maxButtons = 4
  let start = Math.max(1, currentPage - 2)
  let end = Math.min(totalPages, start + maxButtons - 1)

  for (let i = start; i <= end; i++) {
    const button = document.createElement('button')
    button.textContent = i

    if (i === currentPage) {
      button.style.backgroundColor = 'white'
      button.style.fontWeight = 'bold'
      button.style.color = 'black'
    }

    button.addEventListener('click', () => onPageChange(i))

    paginationContainer.appendChild(button)
  }

  const next = document.createElement('button')
  next.textContent = '→'
  next.disabled = currentPage === totalPages
  next.onclick = () => onPageChange(state.currentPage + 1)

  paginationContainer.appendChild(next)
}

export function showModal(modal) {
  modal.classList.add('is-visible')
}

export function hideModal(modal) {
  modal.classList.remove('is-visible')
}
