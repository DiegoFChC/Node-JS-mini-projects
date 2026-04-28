const loading = document.getElementById('loading')
const taskList = document.getElementById('task-list')
const paginationContainer = document.getElementById('pagination')

let currentPage = getPageFromURL()
const limit = 5
let totalPages = 1

async function fetchTasks() {
  try {
    taskList.innerHTML = 'Loading...'

    const res = await fetch(
      `http://localhost:3001/task?page=${currentPage}&limit=${limit}`,
    )
    const data = await res.json()

    const tasks = data.data
    totalPages = data.totalPages || 1

    renderTasks(tasks)
    renderPagination()
  } catch (error) {
    taskList.innerHTML = 'Error loading tasks'
    console.error(error)
  }
}

function renderTasks(tasks) {
  taskList.innerHTML = ''

  for (const task of tasks) {
    const { title, description } = task

    const li = document.createElement('li')
    li.classList.add('card')

    const h2 = document.createElement('h2')
    const p = document.createElement('p')

    h2.textContent = title
    p.textContent = description

    li.append(h2, p)
    taskList.appendChild(li)
  }
}

function renderPagination() {
  paginationContainer.innerHTML = ''

  const prev = document.createElement('button')
  prev.textContent = '←'
  prev.disabled = currentPage === 1
  prev.onclick = () => {
    currentPage--
    fetchTasks()
    updateURL()
  }

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

    button.addEventListener('click', () => {
      currentPage = i
      updateURL()
      fetchTasks()
    })

    paginationContainer.appendChild(button)
  }

  const next = document.createElement('button')
  next.textContent = '→'
  next.disabled = currentPage === totalPages
  next.onclick = () => {
    currentPage++
    updateURL()
    fetchTasks()
  }

  paginationContainer.appendChild(next)
}

function getPageFromURL() {
  const params = new URLSearchParams(window.location.search)
  return parseInt(params.get('page')) || 1
}

function updateURL() {
  const params = new URLSearchParams(window.location.search)
  params.set('page', currentPage)

  const newURL = `${window.location.pathname}?${params.toString()}`
  window.history.pushState({}, '', newURL)
}

window.addEventListener('popstate', () => {
  currentPage = getPageFromURL()
  fetchTasks()
})

loading.remove()
fetchTasks()
