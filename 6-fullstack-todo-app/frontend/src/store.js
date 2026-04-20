export function saveLocalItem(name, content) {
  return window.localStorage.setItem(name, content)
}

export function deleteLocalItem(name) {
  return window.localStorage.removeItem(name)
}

export function getLocalItem(name) {
  return window.localStorage.getItem(name)
}