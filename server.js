const express = require("express")
const userRoute = require("./Routes/userRoute")

const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

app.use("/user", userRoute)

app.listen(process.env.PORT || 5000)