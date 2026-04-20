export function getPageFromURL() {
  const params = new URLSearchParams(window.location.search)
  return parseInt(params.get('page')) || 1
}

export function updateURL(page) {
  const params = new URLSearchParams(window.location.search)
  params.set('page', page)

  const newURL = `${window.location.pathname}?${params.toString()}`
  window.history.pushState({}, '', newURL)
}