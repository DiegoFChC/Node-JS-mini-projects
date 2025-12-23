function validUUID(id) {
  const UUID_REGEX =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

  return UUID_REGEX.test(id)
}

function validateFields(fields, allowedFields) {
  const updates = {}

  for (const key of allowedFields) {
    if (fields[key] !== undefined) {
      updates[key] = fields[key]
    }
  }

  if (Object.keys(updates).length === 0) throw new Error('No valid fields provided')

  return updates
}

module.exports = { validUUID, validateFields }
