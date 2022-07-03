const path = require('path')
const express = require('express')
const app = express()
const port = 3355

app.use(express.static('surprise-me-lib'))

app.listen(port, () => {
  console.log(`Starting server at http://localhost:${port}`)
})
