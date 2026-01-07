const crypto = require('node:crypto')

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex')

  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
    .toString('hex')

  return `${salt}:${hash}`
}

function comparePassword(storedHash, password) {
  const [salt, originalHash] = storedHash.split(':')

  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
    .toString('hex')

  return hash === originalHash
}
module.exports = { hashPassword, comparePassword }

// encriptación simétrica
// const crypto = require('node:crypto')

// const secretKey = crypto
//   .createHash('sha256')
//   .update(process.env.SECREY_KEY)
//   .digest('hex')
//   .substring(0, 16)

// function hashPassword(password) {
//   const iv = crypto.randomBytes(16)
//   const cipher = crypto.createCipheriv(process.env.ALGORITHM, secretKey, iv)
//   const encrypt = Buffer.concat([
//     cipher.update(password, 'utf8'),
//     cipher.final(),
//   ])

//   return `${iv.toString('hex')}:${encrypt.toString('hex')}`
// }

// function decryptPassword(hash) {
//   const [iv, encryptedPassword] = hash
//     .split(':')
//     .map((part) => Buffer.from(part, 'hex'))

//   const decipher = crypto.createDecipheriv(process.env.ALGORITHM, secretKey, iv)

//   const decrypted = Buffer.concat([
//     decipher.update(encryptedPassword),
//     decipher.final()
//   ])

//   return decrypted.toString('utf8')
// }

// function comparePassword(hash, password) {
//   return decryptPassword(hash) === password
// }

