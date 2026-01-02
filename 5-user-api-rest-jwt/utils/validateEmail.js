function validateEmail (email) {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return EMAIL_REGEX.test(email)
}

module.exports = { validateEmail }