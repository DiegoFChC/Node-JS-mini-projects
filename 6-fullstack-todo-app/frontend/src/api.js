const API_URL = 'http://localhost:3001'

export async function getTasks(page, limit) {
  const res = await fetch(`${API_URL}/task?page=${page}&limit=${limit}`)

  const data = await res.json()

  return {
    tasks: data.data,
    totalPages: data.totalPages || 1,
  }
}

export async function getTask(id) {
  const res = await fetch(`${API_URL}/task/${id}`)

  const data = await res.json()

  return data
}

export async function createTask(title, description) {
  const res = await fetch(`${API_URL}/task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
    }),
  })

  const data = await res.json()

  return data
}

export async function editTask(id, title, description) {
  const res = await fetch(`${API_URL}/task/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
    }),
  })

  const data = await res.json()

  return data
}

export async function toggleTaskState(id) {
  const res = await fetch(`${API_URL}/task/toggle/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
    }),
  })

  const data = await res.json()

  return data
}

export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/task/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const data = await res.json()

  return data
}
