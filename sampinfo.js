const query = require("samp-query")

const getInfo = (IP) => {
  return new Promise((resolve, reject) => {
    query(
      {
        host: IP,
      },
      (err, response) => {
        if (err) reject("Samp request error", err)
        resolve(response)
      }
    )
  })
}

module.exports = getInfo
