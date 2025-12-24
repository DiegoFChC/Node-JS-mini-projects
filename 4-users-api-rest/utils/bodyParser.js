function bodyParser(req, res) {
  return new Promise((resolve, reject) => {
    let totalData = ''
    req
      .on('data', (chunk) => {
        totalData += chunk.toString()
      })
      .on('end', () => {
        if (totalData.length === 0) {
          return reject(new Error('Data not received'));
        }
        try {
          req.body = JSON.parse(totalData);
          resolve();
        } catch (err) {
          reject(new Error('Invalid JSON format'));
        }
      })
      .on('error', (err) => {
        reject(err)
      })
  })
}

module.exports = { bodyParser }
