const express = require('express')
const app = express()
const port = 3000
const routeUser = require("./routes/user_route")

app.use(express.json())
app.use(express.urlencoded({
    extended : false
}))
app.use("/",routeUser)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})