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

module.exports = { validateFields }