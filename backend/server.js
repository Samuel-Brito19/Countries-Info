const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())
const port = 3000
const router = require('./route')
app.use(express.json())
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
