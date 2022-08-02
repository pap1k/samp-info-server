const getInfo = require("./sampinfo")
const express = require("express")
const cors = require("cors")

const app = express()
const PORT = 1337
const WAITDELAY = 30_000

let lastresponse = {}
let timestamp = {}

app.use(express.json())
app.use(cors())

app.get("/:ip", (req, res) => {
  const IP = req.params["ip"] || ""
  if (timestamp[IP]) {
    if (timestamp[IP] + WAITDELAY > Date.now()) {
      res.statusCode = 200
      res.json({
        success: true,
        cached: {
          ts: timestamp[IP],
          mustwait: timestamp[IP] + WAITDELAY - Date.now(),
        },
        body: lastresponse[IP],
      })
      return
    }
  }
  getInfo(IP)
    .then((response) => {
      res.statusCode = 200
      res.json({ success: true, body: response })
      timestamp[IP] = Date.now()
      lastresponse[IP] = response
    })
    .catch((msg, error) => {
      res.statusCode = 500
      res.json({ success: false, info: { message: msg, error } })
    })
})

app.listen(process.env.PORT || PORT, function (err) {
  if (err) console.log(err)
  console.log("Server listening on PORT", PORT)
})
